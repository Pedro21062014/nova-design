"""Merged template registry consumed by scripts/build_components.py."""

from lib_templates_a import FILES_A
from lib_templates_b import FILES_B
from lib_templates_c import FILES_C

TEMPLATE_FILES: dict[str, str] = {**FILES_A, **FILES_B, **FILES_C}
