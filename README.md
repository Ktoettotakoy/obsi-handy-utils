# My Handy Utils – Obsidian Plugin

**My Handy Utils** is an Obsidian plugin that bundles several frequently-used utilities to enhance your note-taking workflow. Currently, it includes:

- Reading Time: Estimate how long it will take to read your notes.
- Generate Table of Contents: Quickly insert a structured table of contents for better navigation.

---

## Features

### Reading Time
- Automatically calculates and displays the estimated reading time for the current file in the status bar (bottom right).
- Strips away markdown-specific syntax like links and images to ensure accurate word counts.
- Customize the reading speed (Words Per Minute) via plugin settings or a quick-access command.

### Generate Table of Contents
- Generate a markdown-friendly table of contents based on headings in your file.
- Quickly insert the ToC at the current cursor position or as a command.

---

## Commands

- `Read Time: Change Reading Speed`
  Opens a modal to update your preferred reading speed (WPM).

- `Generate Table of Contents`
  Automatically inserts a table of contents based on the document structure.

---

## Settings

### Reading Time
- **Reading Speed (WPM)**: Set how fast you read (in words per minute) for more accurate time estimates.
- **Status Bar Time Format**:
  - `Long`: "2 minutes and 30 seconds"
  - `Short`: "2m 30s"
  - `Compact`: "2:30"

### Table of Contents
- (Optional) Settings can be added here if the ToC feature becomes more customizable.

---

## More Features Coming Soon
My Handy Utils is actively being developed to include even more time-saving tools. Stay tuned!


## Installation
I'll make the plugin accessible for anybody later. In order to start it locally you have to:
1. Download the plugin and unzip the files or simply git clone it.
2. Move the folder to your Obsidian plugins directory: `your-vault/.obsidian/plugins/`
3. Open terminal in that folder and run ```npm run dev```. It should create a main.js file (that's the way to check if it's compiled).
4. In Obsidian, go to `Settings > Community plugins`, and make sure `Safe mode` is off.
5. Click on `Browse`, search for this plugin (Read-time), and enable it unless it's already in your library.
