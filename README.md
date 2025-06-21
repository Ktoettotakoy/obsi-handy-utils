# My Handy Utils – Obsidian Plugin

**My Handy Utils** is a lightweight Obsidian plugin that bundles tools I would love to have improve your note-taking experience

---

## Features

### Reading Time
- Displays the estimated reading time for the current note in the status bar (bottom right).
- Ignores markdown syntax such as links and images to ensure accurate word counts.
- Customize your reading speed (Words Per Minute) via plugin settings or command palette.

### Generate Table of Contents
- Automatically generates a clean, markdown-friendly table of contents based on the note's headings.
- Indents list items based on heading levels.
- Inserts the ToC in a dedicated section between `## Content` and the next `---`, replacing any previous ToC.

---

## Commands

### `Read Time: Change Reading Speed`
- Opens a modal where you can input your preferred reading speed (WPM).

### `Generate Table of Contents`
- Scans your document and builds a hierarchical ToC based on the heading structure.
- Ensures only one ToC exists by replacing any existing content between `## Content` and the next `---`.

---

## Settings

### Reading Time
- **Reading Speed (WPM)**: Set your average reading speed for more personalized time estimates.
- **Status Bar Time Format**:
  - `Long`: e.g., `2 minutes and 30 seconds`
  - `Short`: e.g., `2m 30s`
  - `Compact`: e.g., `2:30`

> You can access these settings under `Settings → Plugin Options → My Handy Utils`.

---

## 🚧 More Features Coming Soon
This plugin is actively developed and will include more utilities to improve your workflow. Stay tuned for updates!

---


## Installation
I'll make the plugin accessible for anybody later. In order to start it locally you have to:
1. Download the plugin and unzip the files or simply git clone it.
2. Move the folder to your Obsidian plugins directory: `your-vault/.obsidian/plugins/`
3. Open terminal in that folder and run ```npm run dev```. It should create a main.js file (that's the way to check if it's compiled).
4. In Obsidian, go to `Settings > Community plugins`, and make sure `Safe mode` is off.
5. Click on `Browse`, search for this plugin (Read-time), and enable it unless it's already in your library.
