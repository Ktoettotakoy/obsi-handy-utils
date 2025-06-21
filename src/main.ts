import { Notice, Plugin } from 'obsidian';
import {cleanInputStringMdFormat} from "./utils/textCleaner";
import { calculateReadingSpeed } from './utils/readingSpeed';
import { ChangeReadingSpeedModal } from './components/modals';
import { ReadSpeedSettingTab } from './components/settings';
import { formatReadingTime, setNullReadingTime } from './utils/formatReadingTimeStatusBar';
import { findContentsLine, findAllHeadingsInOrder } from './utils/contentGeneration/contentParser';

// Remember to rename these classes and interfaces!
interface TimeToReadSettings {
	readSpeed: number
	timeFormat: string
}

const DEFAULT_SETTINGS: TimeToReadSettings = {
	readSpeed: 60, // default read speed
	timeFormat: "long"
}

export default class MyPlugin extends Plugin {
	settings: TimeToReadSettings;
	statusBarReadTimeEl: HTMLElement;

	async onload() {
		// load settings
		await this.loadSettings();

		// This adds a status bar item to the bottom of the app
		this.statusBarReadTimeEl = this.addStatusBarItem();

		// Bind `this` to ensure context is maintained for event handlers
		this.updateReadingTimeInStatusBar = this.updateReadingTimeInStatusBar.bind(this);

		// run onload once
		this.updateReadingTimeInStatusBar();

		// register event of opening a file and perform function call
		this.registerEvent(this.app.workspace.on('file-open', this.updateReadingTimeInStatusBar));
		// register event of saving a file and perform function call
		this.registerEvent(this.app.vault.on('modify', this.updateReadingTimeInStatusBar));

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'change-reading-speed',
			name: 'change reading speed',
			callback: async () => {
				const currentSpeed = this.settings.readSpeed;
				new ChangeReadingSpeedModal(this.app, currentSpeed, async (newSpeed) => {
					// Update settings with new speed
					this.settings.readSpeed = newSpeed;

					// update ui
					this.updateReadingTimeInStatusBar();

					// Save the updated settings
					await this.saveSettings();

					// Notify the user
					new Notice(`Reading speed updated to ${newSpeed} WPM`);
				}).open(); // Open the modal
			}
		});

		this.addCommand({
			id: 'generate-table-of-contents',
			name: 'generate table of contents',
			callback: async () => {
				const activeFile = this.app.workspace.getActiveFile();
				if (activeFile){
					let fileContent = await this.app.vault.read(activeFile);
					console.log(findContentsLine(fileContent));
					console.log(findAllHeadingsInOrder(fileContent))
				}
				console.log("Done");
			}
		})

		// Adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ReadSpeedSettingTab(this.app, this));

	}

	onunload() {
		// do nothing, everything should be unloaded automatically
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// Function to handle reading time calculation and status bar update
    async updateReadingTimeInStatusBar() {
        const activeFile = this.app.workspace.getActiveFile();
        if (activeFile) {
            let fileContent = await this.app.vault.read(activeFile);
            fileContent = cleanInputStringMdFormat(fileContent);

            const timeToRead = calculateReadingSpeed(this.settings.readSpeed, fileContent);
            const formatString = formatReadingTime(timeToRead, this.settings.timeFormat);

            // Update the status bar text
            this.statusBarReadTimeEl.setText(formatString);
        } else {
			this.statusBarReadTimeEl.setText(setNullReadingTime(this.settings.timeFormat))
		}
    }
}
