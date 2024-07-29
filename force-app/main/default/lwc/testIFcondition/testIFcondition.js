import { LightningElement } from 'lwc';

export default class TestIFcondition extends LightningElement {
    isShopping = false;
    isReading = false;

    handleShoppingChange(event) {
        this.isShopping = event.target.checked;
        this.isReading = false;
        this.template.querySelector(".readCheck").checked = false;
        console.log(`Shopping: ${this.isShopping}`);
    }

    handleReadingChange(event) {
        this.isReading = event.target.checked;
        this.isShopping = false;
        this.template.querySelector(".shopCheck").checked = false;
        console.log(`Reading: ${this.isReading}`);
    }
}