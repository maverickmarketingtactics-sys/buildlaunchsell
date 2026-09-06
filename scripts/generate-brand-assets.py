#!/usr/bin/env python3
"""Generate BuildLaunchSell mark + wordmark SVG/PNG from brand tokens."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

SIGNAL = (79, 70, 229)  # #4F46E5
HIGHLIGHT = (34, 211, 238)  # #22D3EE
INK = (11, 18, 32)  # #0B1220
PAPER = (247, 244, 239)  # #F7F4EF
WHITE = (255, 255, 255)

SIGNAL_HEX = "#4F46E5"
HIGHLIGHT_HEX = "#22D3EE"
INK_HEX = "#0B1220"

ROOT = Path(__file__).resolve().parents[1]
FONT_PATH = Path("/usr/share/fonts/truetype/macos/Inter-Medium.ttf")
PUBLIC_BRAND = ROOT / "public" / "brand"
APP_DIR = ROOT / "app"

# 48×48 design space. Tallest bar is 36 tall; mid bar is 70% of that.
MARK_VB = 48
PAD = 6
BAR_W = 8
GAP = 4
TALL_H = 36
MID_H = TALL_H * 0.70
SHORT_H = TALL_H * 0.44
BOTTOM = PAD + TALL_H


def mark_rects():
    xs = [PAD, PAD + BAR_W + GAP, PAD + 2 * (BAR_W + GAP)]
    heights = [SHORT_H, MID_H, TALL_H]
    rects = []
    for x, h in zip(xs, heights):
        y = BOTTOM - h
        rects.append((x, y, BAR_W, h))
    return rects


def mark_svg(gradient_id: str = "blsTip", vb: int = MARK_VB) -> str:
    short, mid, tall = mark_rects()
    x, y, w, h = tall
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb} {vb}" fill="none" role="img" aria-label="BuildLaunchSell">
  <defs>
    <linearGradient id="{gradient_id}" x1="{x + w / 2}" y1="{y + h}" x2="{x + w / 2}" y2="{y}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="{SIGNAL_HEX}"/>
      <stop offset="0.7" stop-color="{SIGNAL_HEX}"/>
      <stop offset="0.7" stop-color="{HIGHLIGHT_HEX}"/>
      <stop offset="1" stop-color="{HIGHLIGHT_HEX}"/>
    </linearGradient>
  </defs>
  <rect x="{short[0]}" y="{short[1]}" width="{short[2]}" height="{short[3]}" rx="{BAR_W / 2}" fill="{SIGNAL_HEX}"/>
  <rect x="{mid[0]}" y="{mid[1]}" width="{mid[2]}" height="{mid[3]}" rx="{BAR_W / 2}" fill="{SIGNAL_HEX}"/>
  <rect x="{tall[0]}" y="{tall[1]}" width="{tall[2]}" height="{tall[3]}" rx="{BAR_W / 2}" fill="url(#{gradient_id})"/>
</svg>
"""


def text_path_and_width(text: str, font_size: float, origin_x: float, baseline_y: float):
    font = TTFont(str(FONT_PATH))
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    upem = font["head"].unitsPerEm
    scale = font_size / upem
    commands: list[str] = []
    pen_x = origin_x
    for ch in text:
        gname = cmap[ord(ch)]
        glyph = glyph_set[gname]
        path_pen = SVGPathPen(glyph_set)
        tp = TransformPen(path_pen, (scale, 0, 0, -scale, pen_x, baseline_y))
        glyph.draw(tp)
        cmd = path_pen.getCommands()
        if cmd:
            commands.append(cmd)
        pen_x += glyph.width * scale
    return " ".join(commands), pen_x - origin_x


def wordmark_svg() -> str:
    mark_size = 26
    gap = 11
    font_size = 21
    vb_h = 40
    baseline = 31
    mark_y = baseline - mark_size * (TALL_H / MARK_VB)
    mark_x = 2
    text_x = mark_x + mark_size + gap
    path, text_w = text_path_and_width("BuildLaunchSell", font_size, text_x, baseline)
    vb_w = text_x + text_w + 4
    scale = mark_size / MARK_VB
    short, mid, tall = mark_rects()

    def t(x: float, y: float) -> tuple[float, float]:
        return (mark_x + x * scale, mark_y + y * scale)

    def dim(v: float) -> float:
        return v * scale

    sx, sy = t(short[0], short[1])
    mx, my = t(mid[0], mid[1])
    tx, ty = t(tall[0], tall[1])
    tw, th = dim(tall[2]), dim(tall[3])
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w:.2f} {vb_h}" fill="none" role="img" aria-label="BuildLaunchSell">
  <defs>
    <linearGradient id="blsLogoTip" x1="{tx + tw / 2:.3f}" y1="{ty + th:.3f}" x2="{tx + tw / 2:.3f}" y2="{ty:.3f}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="{SIGNAL_HEX}"/>
      <stop offset="0.7" stop-color="{SIGNAL_HEX}"/>
      <stop offset="0.7" stop-color="{HIGHLIGHT_HEX}"/>
      <stop offset="1" stop-color="{HIGHLIGHT_HEX}"/>
    </linearGradient>
  </defs>
  <rect x="{sx:.3f}" y="{sy:.3f}" width="{dim(short[2]):.3f}" height="{dim(short[3]):.3f}" rx="{dim(BAR_W / 2):.3f}" fill="{SIGNAL_HEX}"/>
  <rect x="{mx:.3f}" y="{my:.3f}" width="{dim(mid[2]):.3f}" height="{dim(mid[3]):.3f}" rx="{dim(BAR_W / 2):.3f}" fill="{SIGNAL_HEX}"/>
  <rect x="{tx:.3f}" y="{ty:.3f}" width="{tw:.3f}" height="{th:.3f}" rx="{dim(BAR_W / 2):.3f}" fill="url(#blsLogoTip)"/>
  <path d="{path}" fill="{INK_HEX}"/>
</svg>
"""


def draw_mark_raster(size: int, background: tuple[int, int, int] | None) -> Image.Image:
    img = Image.new("RGBA", (size, size), (*background, 255) if background else (0, 0, 0, 0))
    overlay = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    scale = size / MARK_VB
    short, mid, tall = mark_rects()
    r = (BAR_W / 2) * scale

    def box(rect):
        x, y, w, h = rect
        return [x * scale, y * scale, (x + w) * scale, (y + h) * scale]

    draw.rounded_rectangle(box(short), radius=r, fill=SIGNAL + (255,))
    draw.rounded_rectangle(box(mid), radius=r, fill=SIGNAL + (255,))
    # Tall bar: indigo body + cyan tip with a sharp horizontal split at 70% from the bottom.
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(box(tall), radius=r, fill=255)
    bar = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bar_draw = ImageDraw.Draw(bar)
    x0, y0, x1, y1 = box(tall)
    split = y1 - (y1 - y0) * 0.70
    bar_draw.rectangle([x0, split, x1, y1], fill=SIGNAL + (255,))
    bar_draw.rectangle([x0, y0, x1, split], fill=HIGHLIGHT + (255,))
    overlay.paste(bar, (0, 0), mask)
    img = Image.alpha_composite(img, overlay)
    return img


def draw_wordmark_raster(scale: int = 4, background: tuple[int, int, int] | None = None) -> Image.Image:
    mark_size = 26 * scale
    gap = 11 * scale
    font_size = 21 * scale
    pad_x = 2 * scale
    height = 40 * scale
    baseline = 31 * scale
    font = ImageFont.truetype(str(FONT_PATH), font_size)
    text = "BuildLaunchSell"
    bbox = font.getbbox(text)
    text_w = bbox[2] - bbox[0]
    width = pad_x + mark_size + gap + text_w + 4 * scale
    img = Image.new("RGBA", (int(width), height), (*background, 255) if background else (0, 0, 0, 0))
    mark = draw_mark_raster(mark_size, background=None)
    mark_y = int(baseline - mark_size * (TALL_H / MARK_VB))
    img.alpha_composite(mark, (pad_x, mark_y))
    draw = ImageDraw.Draw(img)
    text_x = pad_x + mark_size + gap
    draw.text((text_x, baseline), text, font=font, fill=INK + (255,), anchor="ls")
    return img


def write(path: Path, content: str | bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if isinstance(content, str):
        path.write_text(content, encoding="utf-8")
    else:
        path.write_bytes(content)
    print(f"wrote {path.relative_to(ROOT)}")


def main() -> None:
    mark = mark_svg()
    logo = wordmark_svg()
    write(PUBLIC_BRAND / "bls-mark.svg", mark)
    write(PUBLIC_BRAND / "bls-logo.svg", logo)
    write(APP_DIR / "icon.svg", mark_svg(gradient_id="iconTip"))

    draw_mark_raster(512, WHITE).save(PUBLIC_BRAND / "bls-mark.png", "PNG")
    print("wrote public/brand/bls-mark.png")
    draw_wordmark_raster(4, PAPER).save(PUBLIC_BRAND / "bls-logo.png", "PNG")
    print("wrote public/brand/bls-logo.png")
    draw_mark_raster(180, WHITE).save(APP_DIR / "apple-icon.png", "PNG")
    print("wrote app/apple-icon.png")


if __name__ == "__main__":
    main()
