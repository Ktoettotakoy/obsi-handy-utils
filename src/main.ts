import { Notice, Plugin } from 'obsidian';
import {cleanInputStringMdFormat} from "./utils/textCleaner";
import { calculateReadingSpeed } from './utils/readingSpeed';
import { ChangeReadingSpeedModal } from './components/modals';
import { ReadSpeedSettingTab } from './components/settings';
import { formatReadingTime, setNullReadingTime } from './utils/formatReadingTimeStatusBar';

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

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		this.statusBarReadTimeEl = this.addStatusBarItem();

		// run onload once
		this.updateReadingTimeInStatusBar();

		// register event of opening a file and perform function call
		this.registerEvent(this.app.workspace.on('active-leaf-change', this.updateReadingTimeInStatusBar));
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
					
					// Save the updated settings
					await this.saveSettings(); 
					
					// Notify the user
					new Notice(`Reading speed updated to ${newSpeed} WPM`);
				}).open(); // Open the modal
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
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
        const active_file = this.app.workspace.getActiveFile();
        if (active_file) {
            let file_content = await this.app.vault.read(active_file);
            file_content = cleanInputStringMdFormat(file_content);
            
            const timeToRead = calculateReadingSpeed(this.settings.readSpeed, file_content);
            const formatString = formatReadingTime(timeToRead, this.settings.timeFormat);

            // Update the status bar text
            this.statusBarReadTimeEl.setText(formatString);
        }
    }
}
