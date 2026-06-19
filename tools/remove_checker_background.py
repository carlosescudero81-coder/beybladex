"""Remove baked-in light/checker backgrounds from PNG assets.

The script never edits source files. By default it reads PNGs from
avatares/, peonzas/ and Taller/ and writes transparent copies to
imagenes_limpias/ while preserving the original folder structure.
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path

import cv2
import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE_DIRS = ("avatares", "peonzas", "Taller")
DEFAULT_OUT_DIR = "imagenes_limpias"


@dataclass(frozen=True)
class Result:
    src: Path
    dst: Path
    size: tuple[int, int]
    transparent_pixels: int
    partial_pixels: int
    opaque_pixels: int


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create transparent copies of PNGs with light/checker backgrounds."
    )
    parser.add_argument("--root", type=Path, default=ROOT, help="Project root.")
    parser.add_argument(
        "--sources",
        nargs="+",
        default=list(DEFAULT_SOURCE_DIRS),
        help="Source directories relative to --root.",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=Path(DEFAULT_OUT_DIR),
        help="Output directory, relative to --root unless absolute.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Analyze and print target paths without writing files.",
    )
    parser.add_argument(
        "--no-soft-edge",
        action="store_true",
        help="Disable the small alpha feather used to reduce light halos.",
    )
    return parser.parse_args()


def quantized_border_palette(rgb: np.ndarray) -> np.ndarray:
    height, width, _channels = rgb.shape
    step_x = max(1, width // 80)
    step_y = max(1, height // 80)

    samples = np.concatenate(
        [
            rgb[0, ::step_x],
            rgb[-1, ::step_x],
            rgb[::step_y, 0],
            rgb[::step_y, -1],
        ],
        axis=0,
    )
    quantized = (np.rint(samples.astype(np.float32) / 8.0) * 8).clip(0, 255)
    colors, counts = np.unique(quantized.astype(np.uint8), axis=0, return_counts=True)
    order = np.argsort(counts)[::-1][:10]
    return colors[order].astype(np.int16)


def close_to_palette(rgb: np.ndarray, palette: np.ndarray, max_distance: int) -> np.ndarray:
    if palette.size == 0:
        return np.zeros(rgb.shape[:2], dtype=bool)

    rgb_i = rgb.astype(np.int16)
    best = np.full(rgb.shape[:2], 9999, dtype=np.int16)
    for color in palette:
        distance = np.abs(rgb_i - color).sum(axis=2)
        best = np.minimum(best, distance)
    return best <= max_distance


def connected_border_background(candidate: np.ndarray) -> np.ndarray:
    labels_count, labels = cv2.connectedComponents(candidate.astype(np.uint8), 4)
    if labels_count <= 1:
        return np.zeros(candidate.shape, dtype=bool)

    border = np.concatenate(
        [labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]],
        axis=0,
    )
    border_labels = np.unique(border[border > 0])
    if border_labels.size == 0:
        return np.zeros(candidate.shape, dtype=bool)
    keep = np.zeros(labels_count, dtype=bool)
    keep[border_labels] = True
    return keep[labels]


def build_alpha(rgba: np.ndarray, soften_edge: bool) -> np.ndarray:
    rgb = rgba[:, :, :3]
    original_alpha = rgba[:, :, 3]

    max_channel = rgb.max(axis=2)
    min_channel = rgb.min(axis=2)
    spread = max_channel - min_channel

    palette = quantized_border_palette(rgb)
    palette_like = close_to_palette(rgb, palette, max_distance=66)

    # The generated sources use white/light-gray fake transparency. Keep this
    # conservative and rely on edge connectivity so white details inside assets
    # are preserved.
    light_neutral = (min_channel >= 222) & (spread <= 46)
    pale_gray = (min_channel >= 205) & (spread <= 24)
    already_transparent = original_alpha < 245
    candidate = already_transparent | light_neutral | pale_gray | palette_like

    background = connected_border_background(candidate)

    alpha = original_alpha.copy()
    alpha[background] = 0

    if soften_edge:
        hard = (background.astype(np.uint8) * 255)
        dilated = cv2.dilate(hard, np.ones((3, 3), dtype=np.uint8), iterations=1) > 0
        rim = dilated & ~background
        spill_like = rim & (
            ((min_channel >= 188) & (spread <= 70))
            | close_to_palette(rgb, palette, max_distance=105)
        )
        blurred = cv2.GaussianBlur(hard, (0, 0), 0.85)
        softened_alpha = np.clip(255 - blurred, 0, 255).astype(np.uint8)
        alpha[spill_like] = np.minimum(alpha[spill_like], softened_alpha[spill_like])

    return alpha


def output_path(root: Path, out_root: Path, src: Path) -> Path:
    return out_root / src.relative_to(root)


def process_file(src: Path, dst: Path, dry_run: bool, soften_edge: bool) -> Result:
    image = Image.open(src).convert("RGBA")
    rgba = np.array(image)
    alpha = build_alpha(rgba, soften_edge=soften_edge)

    transparent_pixels = int((alpha == 0).sum())
    partial_pixels = int(((alpha > 0) & (alpha < 255)).sum())
    opaque_pixels = int((alpha == 255).sum())

    if not dry_run:
        rgba[:, :, 3] = alpha
        rgba[alpha == 0, :3] = 0
        dst.parent.mkdir(parents=True, exist_ok=True)
        Image.fromarray(rgba, "RGBA").save(dst, "PNG", optimize=True)

    return Result(
        src=src,
        dst=dst,
        size=image.size,
        transparent_pixels=transparent_pixels,
        partial_pixels=partial_pixels,
        opaque_pixels=opaque_pixels,
    )


def iter_pngs(root: Path, source_dirs: list[str]) -> list[Path]:
    paths: list[Path] = []
    for source_dir in source_dirs:
        base = root / source_dir
        if base.exists():
            paths.extend(sorted(base.rglob("*.png")))
    return paths


def main() -> None:
    args = parse_args()
    root = args.root.resolve()
    out_root = args.out if args.out.is_absolute() else root / args.out
    out_root = out_root.resolve()

    results: list[Result] = []
    for src in iter_pngs(root, args.sources):
        dst = output_path(root, out_root, src)
        results.append(
            process_file(
                src=src,
                dst=dst,
                dry_run=args.dry_run,
                soften_edge=not args.no_soft_edge,
            )
        )

    action = "would_process" if args.dry_run else "processed"
    print(f"{action}={len(results)} out={out_root}")
    for result in results:
        total = result.size[0] * result.size[1]
        pct = result.transparent_pixels / total * 100
        rel_src = result.src.relative_to(root)
        rel_dst = result.dst.relative_to(root)
        print(
            f"{rel_src} -> {rel_dst} "
            f"transparent={result.transparent_pixels} ({pct:.1f}%) "
            f"partial={result.partial_pixels}"
        )


if __name__ == "__main__":
    main()
