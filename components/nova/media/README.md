# Media components

Images, video, audio, avatars, logos and frames.

16 components. Every file is a self-contained React + TypeScript + Tailwind
component that renders no purple, reserves its own layout box and ships motion. Icons come
from `lucide-react` only.

```bash
# from the repository root
cp -r components/nova/ <your-app>/components/nova/
cp -r lib/ <your-app>/lib/
```

Then import the theme once, before any component renders:

```css
@import "tailwindcss";
@import "../theme/nova-theme.css";
```

## Components

| Name | Kind | What it does | File |
| --- | --- | --- | --- |
| `image-card` | `media` | Image with caption, hairline frame and lightbox. | [ImageCard](./image-card.tsx) |
| `gallery-grid` | `media` | Responsive media grid with selection. | [GalleryGrid](./gallery-grid.tsx) |
| `lightbox-thumbs` | `media` | Thumbnail strip synced with a viewer. | [LightboxThumbs](./lightbox-thumbs.tsx) |
| `video-player` | `media` | Glass chrome, poster veil and captions. | [VideoPlayer](./video-player.tsx) |
| `audio-waveform` | `media` | Waveform player with speed control. | [AudioWaveform](./audio-waveform.tsx) |
| `avatar` | `media` | Avatar with initials fallback on a calm gradient. | [Avatar](./avatar.tsx) |
| `avatar-group` | `media` | Overlapping avatars with an overflow chip. | [AvatarGroup](./avatar-group.tsx) |
| `avatar-upload` | `media` | Upload with crop framing and remove. | [AvatarUpload](./avatar-upload.tsx) |
| `logo-tile` | `media` | Monochrome logo tile that saturates on hover. | [LogoTile](./logo-tile.tsx) |
| `favicon-chip` | `media` | Domain chip with favicon and title. | [FaviconChip](./favicon-chip.tsx) |
| `icon-tile` | `media` | Feature icon inside a 40px glass tile. | [IconTile](./icon-tile.tsx) |
| `illustration-frame` | `media` | Glass plate framing an illustration. | [IllustrationFrame](./illustration-frame.tsx) |
| `device-frame` | `media` | Laptop or phone frame for screenshots. | [DeviceFrame](./device-frame.tsx) |
| `screenshot-frame` | `media` | Browser chrome frame for product shots. | [ScreenshotFrame](./screenshot-frame.tsx) |
| `before-after` | `media` | Comparison of two states with a divider. | [BeforeAfter](./before-after.tsx) |
| `file-preview` | `media` | Preview sheet for a document or image file. | [FilePreview](./file-preview.tsx) |

## Data shape

`asset: { id, kind, src, poster?, width, height, durationMs? }`.

## Motion contract

Every component in this folder animates, and it animates the same way:

- Poster fades to video over 240ms after metadata; hover raises the controls without moving the frame.

Full ladder, easing and reduced-motion rules: spec sections 3.11, 6.10 in
[`nova-design.md`](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md).

## Colors

Import `theme/nova-theme.css` first. It remaps the shadcn semantic variables, so `bg-primary`
is indigo `#7c8cff`, not the default purple, and `bg-accent` is a warm neutral instead of a
fifth accent. Never hardcode `violet`, `purple`, `fuchsia`, `indigo-500` or `oklch(0.6 0.25 ...)`.

## Anti-patterns

- Auto-playing video with sound.
- Media without a reserved box, causing layout shift.
- Controls hidden on touch devices.

## Related

- [Category index](../README.md)
- [Frontend templates](../../templates/README.md)
- [Full spec](https://raw.githubusercontent.com/Pedro21062014/nova-design/main/nova-design.md)
