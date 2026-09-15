#!/usr/bin/env python3
"""Verify every raw URL used in the repository points at a file that exists.

Usage
-----
    python3 scripts/check_links.py

Scans markdown, MDX, HTML, CSS, TSX, TS and JSON for
`https://raw.githubusercontent.com/<owner>/<repo>/main/<path>` links and asserts the local path
exists in the worktree. Also reports files that still contain emoji.

Exit code 1 when something is broken, so it can run in CI.
"""

from __future__ import annotations

import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW_PREFIX = "https://raw.githubusercontent.com/"
SUFFIXES = (".md", ".mdc", ".tsx", ".ts", ".json", ".html", ".css", ".astro")
SKIP_DIRS = {".git", "node_modules", ".next", ".cache", ".arena", "dist", "build", "out"}

LINK = re.compile(
    re.escape(RAW_PREFIX)
    + r"Pedro21062014/nova-design/[A-Za-z0-9_.\-]+/([A-Za-z0-9_./\-]+)"
)
LOCAL_MD = re.compile(r"\]\(\./([A-Za-z0-9_./\-]+)\)")
EMOJI_RANGES = (
    (0x1F000, 0x1FAFF),
    (0x2600, 0x27BF),
    (0x2B00, 0x2BFF),
    (0xFE0F, 0xFE0F),
    (0x1F1E6, 0x1F1FF),
)


def walk() -> list[Path]:
    files = []
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix not in SUFFIXES:
            continue
        if any(part in SKIP_DIRS or part.startswith(".") for part in path.relative_to(ROOT).parts):
            continue
        files.append(path)
    return sorted(files)


def check_links(files: list[Path]) -> list[str]:
    problems = []
    checked = 0
    for path in files:
        relative = path.relative_to(ROOT)
        text = path.read_text(encoding="utf-8", errors="ignore")
        for match in LINK.finditer(text):
            checked += 1
            if not (ROOT / match.group(1)).exists():
                problems.append(f"{relative}: raw link points at a missing path ({match.group(1)})")
        for match in LOCAL_MD.finditer(text):
            target = match.group(1).split("#")[0]
            if not target.endswith((".md", ".tsx", ".ts", ".html", ".css", ".json", ".astro")):
                continue
            checked += 1
            if not (path.parent / target).exists():
                problems.append(f"{relative}: relative link points at a missing file ({target})")
    print(f"checked {checked} links in {len(files)} files")
    return problems


def check_emoji(files: list[Path]) -> list[str]:
    problems = []
    for path in files:
        text = path.read_text(encoding="utf-8", errors="ignore")
        for index, char in enumerate(text):
            code = ord(char)
            if any(low <= code <= high for low, high in EMOJI_RANGES):
                name = unicodedata.name(char, "UNKNOWN")
                line = text.count("\n", 0, index) + 1
                problems.append(f"{path.relative_to(ROOT)}:{line}: emoji {name}")
                break
    print(f"emoji scan: {len(problems)} file(s) with emoji")
    return problems


def main() -> int:
    files = walk()
    problems = check_links(files) + check_emoji(files)
    if problems:
        print()
        for item in problems:
            print("  " + item)
        return 1
    print("all links resolve, no emoji found")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
