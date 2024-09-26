import { Notice, Plugin } from 'obsidian';
import {cleanInputStringMdFormat} from "./utils/textCleaner";
import { calculateReadingSpeed } from './utils/readingSpeed';
import { ChangeReadingSpeedModal } from './components/modals';
import { ReadSpeedSettingTab } from './components/settings';

// Remember to rename these classes and interfaces!
interface TimeToReadSettings {
	readSpeed: number
}

const DEFAULT_SETTINGS: TimeToReadSettings = {
	readSpeed: 60 // default read speed
}

export default class MyPlugin extends Plugin {
	settings: TimeToReadSettings;

	async onload() {
		const cur_workspace = this.app.workspace;
		const cur_vault = this.app.vault;

		await this.loadSettings();

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarReadTimeEl = this.addStatusBarItem();
		

		// register event of opening a file
		this.registerEvent(
			cur_workspace.on('file-open', async () => {
        
				const active_file = cur_workspace.getActiveFile();
				// read the file when it is open
				if (active_file){
					let file_content = await cur_vault.read(active_file)
					// clear the file from links, and any other rubbish like images
					file_content = cleanInputStringMdFormat(file_content);
					// calculate the read time
					const timeToRead = calculateReadingSpeed(this.settings.readSpeed, file_content);
					// update text in status bar
					statusBarReadTimeEl.setText(`${timeToRead.minutes} minutes and ${timeToRead.seconds} seconds`); 
				}
			})
		);

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
}
