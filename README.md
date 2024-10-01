# Obsidian Reading Time Plugin

This Obsidian plugin calculates the estimated time it takes to read the current file based on a user-configured reading speed (WPM - Words Per Minute). It also allows users to adjust their reading speed via the plugin settings or a simple command.

## Features

- Automatically calculates and displays the estimated reading time for the currently opened file in the status bar (right bottom corner).
- Allows the user to adjust the default reading speed (in WPM) via a settings panel or using a command to quickly change the reading speed using a modal window.
- Clear the content from markdown-specific items like links or image placeholders to ensure an accurate word count.

## Commands
- `Read Time: change reading speed` pops up a window that allows user to set the reading speed (WPM)

## Settings
- **Reading Speed (WPM)**: Set your preferred reading speed in words per minute. This affects how the reading time is calculated for any open file.
- **Status Bar Time Format**: Choose how the reading time is displayed in the status bar:
  - `Long`: Displays reading time as "2 minutes and 30 seconds."
  - `Short`: Displays reading time as "2m 30s."
  - `Compact`: Displays reading time as "2:30."

## Installation
I'll make the plugin accessible for anybody later. In order to start it locally you have to:
1. Download the plugin and unzip the files or simply git clone it.
2. Move the folder to your Obsidian plugins directory: `your-vault/.obsidian/plugins/`
3. Open terminal in that folder and run ```npm run dev```. It should create a main.js file (that's the way to check if it's compiled).
4. In Obsidian, go to `Settings > Community plugins`, and make sure `Safe mode` is off.
5. Click on `Browse`, search for this plugin (Read-time), and enable it unless it's already in your library.
