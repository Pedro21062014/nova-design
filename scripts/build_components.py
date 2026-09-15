#!/usr/bin/env python3
"""Build the Nova Vitral component library and the frontend templates.

Usage
-----
    python3 scripts/build_components.py            # write components/ and templates/
    python3 scripts/build_components.py --check    # verify the tree is up to date

Outputs
-------
    components/nova/<category>/<name>.tsx   500 components
    components/nova/<category>/README.md    26 category guides
    components/README.md                    index, install, ten rules
    components/INDEX.md                     flat list of all 500 with paths
    components/index.json                   machine-readable registry
    lib/utils.ts, lib/format.ts, lib/motion.ts
    templates/                              five full React + Tailwind pages
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

from lib_catalog import ANTI_PATTERNS, MOTION, USES  # noqa: E402
from lib_core_files import CORE_FILES  # noqa: E402
from lib_data import CATEGORIES, DATA  # noqa: E402
from lib_emit import (  # noqa: E402
    HANDWRITTEN,
    RAW,
    pascal,
    render_category_readme,
    render_component,
    render_root_readme,
)
from lib_templates import TEMPLATE_FILES  # noqa: E402

BANNED = ("purple", "violet", "fuchsia", "magenta", "oklch(", "#8b5cf6", "#a855f7", "#7c3aed")
MOTION_MARKERS = ("nv-fade-up", "nv-lift", "nv-caret-blink", "nv-scale-in", "nv-reveal", "nv-pulse", "transition-")


def write(path: Path, text: str, check: bool, changed: list[str]) -> None:
    relative = path.relative_to(ROOT).as_posix()
    if check:
        if not path.exists() or path.read_text(encoding="utf-8") != text:
            changed.append(relative)
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def main() -> int:
    check = "--check" in sys.argv
    changed: list[str] = []
    written = 0
    per_category: list[tuple[str, str, int]] = []
    registry = {"name": "nova-vitral-components", "version": "1.1.0", "total": 0, "categories": []}
    index_rows: list[str] = []

    for category, description in CATEGORIES:
        entries = DATA[category]
        per_category.append((category, description, len(entries)))
        registry["categories"].append(
            {
                "name": category,
                "scope": description,
                "path": f"components/nova/{category}/",
                "count": len(entries),
                "spec": USES[category],
                "components": [],
            }
        )

        for index, (kind, name, blurb) in enumerate(entries):
            target = f"components/nova/{category}/{name}.tsx"

            if (category, name) in HANDWRITTEN:
                owner, export = HANDWRITTEN[(category, name)]
                if owner not in CORE_FILES:
                    raise SystemExit(f"handwritten owner missing for {category}/{name}: {owner}")
                motion = MOTION.get(kind, "")
            else:
                siblings = [(other, other_blurb) for _, other, other_blurb in entries if other != name][:3]
                text = render_component(category, kind, name, blurb, index, siblings)
                write(ROOT / target, text, check, changed)
                written += 1
                motion = MOTION[kind]

                # The doc comment explains the color rule, so it is allowed to name the
                # banned hues. Everything below it must be clean.
                code = re.sub(r"^/\*\*.*?\*/\n", "", text, count=1, flags=re.DOTALL)
                lowered = code.lower()
                hits = [token for token in BANNED if token in lowered]
                if hits:
                    raise SystemExit(f"banned color token in {target}: {hits}")
                if not any(marker in text for marker in MOTION_MARKERS):
                    raise SystemExit(f"zero-animation component: {target}")
                if "lucide-react" not in text:
                    raise SystemExit(f"missing lucide icons: {target}")

            registry["categories"][-1]["components"].append(
                {"name": name, "component": pascal(name), "kind": kind, "path": target, "motion": motion}
            )
            index_rows.append(f"| `{name}` | {category} | `{kind}` | `{target}` |")

    # Hand-authored core layer (lib + the files the categories depend on).
    for relative, text in CORE_FILES.items():
        write(ROOT / relative, text, check, changed)
        written += 1

    # Category READMEs, root README, flat index, machine-readable registry.
    for category, description, _count in per_category:
        text = render_category_readme(category, description, DATA[category])
        write(ROOT / f"components/nova/{category}/README.md", text, check, changed)
        written += 1

    root_readme = render_root_readme(per_category)
    write(ROOT / "components/README.md", root_readme, check, changed)
    written += 1

    total = sum(count for _, _, count in per_category)
    registry["total"] = total
    flat = [
        "# Component index",
        "",
        f"{total} components. Generated by `scripts/build_components.py`. Do not edit by hand.",
        "",
        "| Component | Category | Kind | Path |",
        "| --- | --- | --- | --- |",
        *index_rows,
        "",
        f"Machine-readable version: [`index.json`](./index.json). Spec: {RAW}/design.md",
        "",
    ]
    write(ROOT / "components/INDEX.md", "\n".join(flat), check, changed)
    written += 1

    write(
        ROOT / "components/index.json",
        json.dumps(registry, indent=2, ensure_ascii=True) + "\n",
        check,
        changed,
    )
    written += 1

    # Templates.
    for relative, text in TEMPLATE_FILES.items():
        write(ROOT / relative, text, check, changed)
        written += 1

    if check:
        if changed:
            print(f"{len(changed)} file(s) out of date:")
            for item in changed[:40]:
                print(f"  {item}")
            return 1
        print("components/ and templates/ are up to date")
        return 0

    print(f"wrote {written} files")
    print(f"  components: {total} components in {len(per_category)} categories")
    print(f"  templates:  {len(TEMPLATE_FILES)} files")
    print(f"  lib:        {len([k for k in CORE_FILES if k.startswith('lib/')])} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
