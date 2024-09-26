import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import {cleanInputStringMdFormat} from "./utils/textCleaner";
import { calculateReadingSpeed } from './utils/readingSpeed';

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
			name: 'Change reading speed',
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
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
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

class ChangeReadingSpeedModal extends Modal {
	private currentSpeed: number;
	private onConfirm: (newSpeed: number) => void;

	constructor(app: App, currentSpeed: number, onConfirm: (newSpeed: number) => void) {
		super(app);
		this.currentSpeed = currentSpeed;
		this.onConfirm = onConfirm;
	}

	onOpen() {
		const { contentEl } = this;

		// Set title for the modal
		
		contentEl.createEl('h2', { text: 'Change Reading Speed' });

		const modalAndConfirmContainer = contentEl.createDiv();
		// Use flexbox for layout
        modalAndConfirmContainer.style.display = 'flex';  
		// justify content to space out modal window and confirmation button
        modalAndConfirmContainer.style.justifyContent = 'space-between';

		// Create input field for reading speed which is an element of modalAndConfirm div
		const input = modalAndConfirmContainer.createEl('input', {
			type: 'number',
			value: this.currentSpeed.toString(),
			placeholder: 'New reading speed (WPM)',
		});
		input.setAttribute('min', '1'); // Ensure the minimum is 1

		// Create a confirm button which is an element of modalAndConfirm div
		const confirmButton = modalAndConfirmContainer.createEl('button', { text: 'Confirm' });
		confirmButton.onclick = () => {
			const newSpeed = parseInt(input.value);
			if (newSpeed > 0) {
				this.onConfirm(newSpeed); // Call the confirmation callback
				this.close();
			} else {
				new Notice('Please enter a valid reading speed greater than 0.'); // Alert user for invalid input
			}
		};

		// Append buttons to the modal content
		contentEl.appendChild(modalAndConfirmContainer);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty(); // Clear the modal content on close
	}
}


class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Reading Speed (WPM)')
			.setDesc('Set your preferred reading speed in words per minute.')
			.addText(text => text
				.setPlaceholder('Enter your WPM')
				.setValue(this.plugin.settings.readSpeed.toString())
				.onChange(async (value) => {
					const newSpeed = parseInt(value);
					if (!isNaN(newSpeed) && newSpeed > 0) {
						this.plugin.settings.readSpeed = newSpeed;
						await this.plugin.saveSettings();
					}
					await this.plugin.saveSettings();
				}));
	}
}