import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    displayMessage = true;

    // Function to toggle the value of displayMessage
    toggleMessage() {
        this.displayMessage = !this.displayMessage;
    }
}