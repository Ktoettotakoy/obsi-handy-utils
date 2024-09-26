import { App, Modal, Notice } from 'obsidian';

export class ChangeReadingSpeedModal extends Modal {
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

        // Create a div for a modal and a button
        const modalAndConfirmContainer = contentEl.createDiv('modal-confirm-container');

        // Create input field for reading speed which is an element of modalAndConfirm div
        const input = modalAndConfirmContainer.createEl('input', {
            type: 'number',
            value: this.currentSpeed.toString(),
            placeholder: 'New reading speed (WPM)',
        });
        // Ensure the minimum is 1
        input.setAttribute('min', '1'); 

        // Create a confirm button which is an element of modalAndConfirm div
        const confirmButton = modalAndConfirmContainer.createEl('button', { text: 'Confirm' });
        confirmButton.onclick = () => {
            const newSpeed = parseInt(input.value);
            if (newSpeed > 0) {
                // Call the confirmation callback
                this.onConfirm(newSpeed); 
                this.close();
            } else {
                new Notice('Please enter a valid reading speed greater than 0.');
            }
        };

        // Append the modalAndConfirmContainer to the modal content
        contentEl.appendChild(modalAndConfirmContainer);
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty(); // Clear the modal content on close
    }
}
