import { PluginSettingTab, Setting, App } from 'obsidian';
import MyPlugin from '../main';

export class ReadSpeedSettingTab extends PluginSettingTab {
    plugin: MyPlugin;

    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

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
                }));

        new Setting(containerEl)
            .setName('Status Bar Time Format')
            .setDesc('Select how reading time should be displayed.')
            .addDropdown(dropdown => dropdown
                .addOption('long', 'Long (2 minutes and 30 seconds)')
                .addOption('short', 'Short (5m 30s)')
                .addOption('compact', 'Compact (5:30)')
                .setValue(this.plugin.settings.timeFormat)
                .onChange(async (value) => {
                    this.plugin.settings.timeFormat = value;
                    await this.plugin.saveSettings();
                }));
    }
}