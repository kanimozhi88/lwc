import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BOARD_OBJECT from '@salesforce/schema/Board__c';
import NAME_FIELD from '@salesforce/schema/Board__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Board__c.Description__c';
import NOOFSECTIONS_FIELD from '@salesforce/schema/Board__c.NoOfSections__c';

export default class Boards extends LightningElement {
    showModalPopup = false;
    objectApiName = BOARD_OBJECT;
    nameField = NAME_FIELD;
    descriptionField = DESCRIPTION_FIELD;
    noOfSectionField = NOOFSECTIONS_FIELD;
    sections = [];

    popupCloseHandler() {
        this.showModalPopup = false;
    }

    newBoardClickHandler() {
        this.showModalPopup = true;
    }

    noOfSectionChangeHandler(event) {
        const noOfSections = event.target.value;
        this.sections = [];
        for (let i = 0; i < noOfSections; i++) {
            this.sections.push({ id: i, sectionLabel: `Section ${i + 1} Title` });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const fields = { ...event.detail.fields };
        let sectionControls = this.template.querySelectorAll('lightning-input');
        let sectionList = [];
        for (let control of sectionControls) {
            sectionList.push({ name: control.value });
        }
        if (this.validateData(fields, sectionList)) {
            return;
        }
        // Handle the form submission logic here
    }

    validateData(fields, sectionList) {
        let sectionCount = parseInt(fields.NoOfSections__c);
        if (!sectionCount || sectionCount < 1 || sectionCount > 10) {
            this.showToast('Please enter a valid number of sections between 1 and 10', 'Error', 'error');
            return false;
        }
        if (sectionList.filter(a => a.name === '').length > 0) {
            this.showToast('Please enter a title for each section', 'Error', 'error');
            return false;
        }
        return true;
    }

    showToast(message, title = 'Success', variant = 'success') {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}
