# Image Compressor

**Image Compressor** is a [webxdc](https://webxdc.org) app that runs inside **Delta Chat**, shrinking images right on your device before you share them:

- 🖼️ **Image** — pick any image from your device and get a compressed copy.
- 🎚️ **Quality** — fine-tune the compression quality from 5% to 100%.
- 📦 **Size Limit** — target a maximum file size (from 50KB up to 5MB, default 300KB).
- 🎨 **Format** — output as WEBP (recommended), JPEG or PNG.

## Screenshot

![screenshot](./git-assets/screenshot.webp)

## Features

- **Client-side compression** - Images never leave your device; everything runs in your browser with no server
- **Size-targeted compression** - The app squeezes the image down to your chosen size limit automatically
- **Live preview & stats** - See the compressed image with original size, compressed size and compression ratio
- **Progress indicator** - Shows compression progress while processing
- **Send to a chat** - The compressed image is sent as a webxdc update, with an optional accompanying message

## Development

The app is plain HTML/CSS/JS with no build step. Open `index.html` directly in a browser to develop — outside Delta Chat the "Send to a chat" button is disabled and shows "You aren't in WEBXDC", since `webxdc.js` is injected by the Delta Chat runtime.

To test real chat integration, package the folder as a `.zip` file, rename it to `.xdc` and share it in a DeltaChat chat. For convenience, run `temp/make-xdc.sh` to produce a ready-to-share `temp/app.xdc`.
