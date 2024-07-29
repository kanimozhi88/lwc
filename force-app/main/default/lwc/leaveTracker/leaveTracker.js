import { LightningElement, wire, track } from 'lwc';
import getLeaveRequests from '@salesforce/apex/LeaveRequestController.getLeaveRequests';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';

export default class LeaveTracker  extends LightningElement {
    @track leavesRequest = [];
    @track columns = [
        { label: 'Name', fieldName: 'Name', type: 'text',
          cellAttributes: { class: { fieldName: 'cellClass' } } },
        { label: 'From Date', fieldName: 'From_Date__c', type: 'date', cellAttributes: { class: { fieldName: 'cellClass' } } },
        { label: 'To Date', fieldName: 'To_Date__c', type: 'date', cellAttributes: { class: { fieldName: 'cellClass' } } },
        { label: 'Reason', fieldName: 'Reason__c', type: 'text', cellAttributes: { class: { fieldName: 'cellClass' } } },
        { label: 'Status', fieldName: 'Status__c', type: 'text' , cellAttributes: { class: { fieldName: 'cellClass' } } },
        { label: 'Manager Comment', fieldName: 'Manager_Comment__c', type: 'text', cellAttributes: { class: { fieldName: 'cellClass' } } },
        { type: 'button', 
          typeAttributes: {
              label: 'Edit',
              name: 'Edit',
              title: 'Edit',
              value: 'edit',
              variant: 'brand',
              disabled: { fieldName: 'isEditDisabled' } 
          }
        }
    ];

    @track showModalPopup = false;
    @track objectApiName = 'LeaveRequest__c';
    @track recordId = '';
    currentUserId=Id;

    @wire(getLeaveRequests)
    wiredLeaves(result) {
        if (result.data) {
            this.leavesRequest = result.data.map(a => ({
                ...a,
                cellClass: a.Status__c === 'Approved' ? 'slds-theme_success' : a.Status__c === 'Rejected' ? 'slds-theme_warning' : '',
                isEditDisabled: a.Status__c !== 'Pending'
            }));
        } else if (result.error) {
            console.error('Error:', result.error);
        }
    }

    get noRecordsFound() {
          return Array.isArray(this.leavesRequest) && this.leavesRequest.length === 0;
    }

    popUpCloseHandler() {
        this.showModalPopup = false;
    }

    successHandler(event) {
        this.showModalPopup = false;   
        this.showToast('Data saved successfully');
        refreshApex(this.leavesRequest.myLeavesWireResult)
    }

    showToast(message, title = 'Success', variant = 'success') {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }

    rowActionHandler(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if (actionName === 'Edit') {
            this.showModalPopup = true;
            thi.recordId = row.Id;
        }
    }

    newRequestClickHandler() {
        this.showModalPopup = true;
        this.recordId = '';
    }
}