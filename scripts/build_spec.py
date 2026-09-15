#!/usr/bin/env python3
"""
Nova Vitral - spec builder.

Assembles design.md from the modular files in spec/, then:
  1. injects stable HTML anchors (<a id="s-3-1"></a>) into every heading
  2. resolves @@S:x.y@@ tokens into real line ranges
  3. regenerates the index table (<<<INDEX>>>) with section, title, line range and anchor

The line numbers shift whenever any part changes, so the script iterates until the
document reaches a fixed point where every reported range is accurate.

Usage:
    python3 scripts/build_spec.py            # writes design.md
    python3 scripts/build_spec.py --check    # exits 1 if the file is out of date
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SPEC_DIR = ROOT / "spec"
OUTPUT = ROOT / "design.md"

# Order matters: this is the reading order of the final document.
PART_ORDER = [
    "00-intro.md",
    "01-foundations.md",
    "02-tokens.md",
    "03a-components.md",
    "03b-components.md",
    "03c-components.md",
    "04a-chat.md",
    "04b-chat.md",
    "05-pages.md",
    "06-motion.md",
    "07-recipes.md",
    "08-references.md",
    "09-quality.md",
    "10-workflow.md",
    "11-appendix.md",
]

HEADING_RE = re.compile(r"^(#{2,3})\s+(\d+(?:\.\d+)?)\b\s*(.*)$")
TOKEN_RE = re.compile(r"@@S:(\d+(?:\.\d+)?)(?:-(\d+(?:\.\d+)?))?@@")
ANCHOR_SUFFIX_RE = re.compile(r"\s*<a id=\"s-[0-9-]+\"></a>\s*$")


def load_parts() -> list[str]:
    missing = [p for p in PART_ORDER if not (SPEC_DIR / p).exists()]
    if missing:
        sys.exit(f"Missing spec parts: {', '.join(missing)}")
    return [(SPEC_DIR / p).read_text(encoding="utf-8").rstrip("\n") for p in PART_ORDER]


def anchor_for(key: str) -> str:
    return "s-" + key.replace(".", "-")


def inject_anchors(text: str) -> str:
    out: list[str] = []
    for line in text.split("\n"):
        m = HEADING_RE.match(line)
        if m and "<a id=" not in line:
            hashes, key, rest = m.group(1), m.group(2), m.group(3)
            rest = ANCHOR_SUFFIX_RE.sub("", rest).rstrip()
            line = f"{hashes} {key} {rest} <a id=\"{anchor_for(key)}\"></a>"
        out.append(line)
    return "\n".join(out)


def heading_map(lines: list[str]) -> dict[str, dict]:
    """key -> {line, title, level, end} using 1-based line numbers."""
    entries: list[dict] = []
    for i, line in enumerate(lines, start=1):
        m = HEADING_RE.match(line)
        if not m:
            continue
        level, key, rest = len(m.group(1)), m.group(2), m.group(3)
        title = ANCHOR_SUFFIX_RE.sub("", rest).strip().lstrip(". ").strip()
        entries.append({"key": key, "title": title, "level": level, "line": i, "end": len(lines)})

    for idx, entry in enumerate(entries):
        for later in entries[idx + 1 :]:
            if later["level"] <= entry["level"]:
                entry["end"] = later["line"] - 1
                break

    return {e["key"]: e for e in entries}


def resolve_tokens(text: str, mapping: dict[str, dict]) -> str:
    def repl(m: re.Match[str]) -> str:
        entry = mapping.get(m.group(1))
        if not entry:
            return m.group(0)
        start = entry["line"]
        end = mapping[m.group(2)]["end"] if m.group(2) and m.group(2) in mapping else entry["end"]
        return f"lines {start}-{end}" if end > start else f"line {start}"

    return TOKEN_RE.sub(repl, text)


def build_index(mapping: dict[str, dict]) -> str:
    rows = ["| Section | Title | Lines | Anchor |", "|---|---|---|---|"]
    for key, e in mapping.items():
        if e["level"] < 2:
            continue
        indent = "" if e["level"] == 2 else "&nbsp;&nbsp;"
        span = f"{e['line']}-{e['end']}" if e["end"] > e["line"] else str(e["line"])
        rows.append(
            f"| {indent}{key} | {indent}{e['title']} | `{span}` | [jump](#{anchor_for(key)}) |"
        )
    return "\n".join(rows)


def make_document() -> tuple[str, dict[str, dict]]:
    text = inject_anchors("\n\n".join(load_parts()))
    mapping: dict[str, dict] = {}

    # fixed-point iteration: index length changes line numbers, which changes the index length
    for _ in range(12):
        lines = text.split("\n")
        mapping = heading_map(lines)
        updated = resolve_tokens(text, mapping).replace("<<<INDEX>>>", build_index(mapping))
        if updated == text:
            break
        text = updated

    mapping = heading_map(text.split("\n"))
    return text, mapping


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="verify the output is current")
    args = parser.parse_args()

    document, mapping = make_document()
    if not document.endswith("\n"):
        document += "\n"

    if args.check:
        current = OUTPUT.read_text(encoding="utf-8") if OUTPUT.exists() else ""
        if current != document:
            sys.exit("design.md is out of date. Run: python3 scripts/build_spec.py")
        print("design.md is up to date.")
        return

    OUTPUT.write_text(document, encoding="utf-8")
    lines = document.count("\n") + 1
    sections = len(mapping)
    print(f"Wrote {OUTPUT.relative_to(ROOT)} ({lines} lines, {sections} indexed sections).")


if __name__ == "__main__":
    main()
