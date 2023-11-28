import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import updateBoatList from '@salesforce/apex/BoatDataService.updateBoatList';

const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT     = 'Ship it!';
const SUCCESS_VARIANT     = 'success';
const ERROR_TITLE   = 'Error';
const ERROR_VARIANT = 'error';

// const COLUMNS = [
//     { label: 'Name', fieldName: 'Name', type: 'text' },
//     { label: 'Lenght', fieldName: 'Length__c', type: 'number' },
//     { label: 'Price', fieldName: 'Price__c', type: 'currency' },
//     { label: 'Description', fieldName: 'Description__c', type: 'text' },
// ]
export default class BoatSearchResults extends LightningElement {
  selectedBoatId;
  columns = [
    { label: 'Name', fieldName: 'Name', type: 'text', editable: true },
    { label: 'Lenght', fieldName: 'Length__c', type: 'number', editable: true },
    { label: 'Price', fieldName: 'Price__c', type: 'currency', editable: true },
    { label: 'Description', fieldName: 'Description__c', type: 'text', editable: true }
  ];
  boatTypeId = '';
  boats;
  isLoading = false;
  
  // wired message context
  messageContext;
  // wired getBoats method
  @wire(getBoats, { boatTypeId: "$boatTypeId" })
  wiredBoats(result) {
    this.boats = result;
  }
  
  // public function that updates the existing boatTypeId property
  // uses notifyLoading
  searchBoats(boatTypeId) { }
  
  // this public function must refresh the boats asynchronously
  // uses notifyLoading
  async refresh() { 
    await refreshApex(this.boats);
    this.isLoading(false);
  }
  
  // this function must update selectedBoatId and call sendMessageService
  updateSelectedTile(event) {
    this.selectedBoatId = event.detail.boatId;
  }
  
  // Publishes the selected boat Id on the BoatMC.
  sendMessageService(boatId) { 
    // explicitly pass boatId to the parameter recordId
  }
  
  // The handleSave method must save the changes in the Boat Editor
  // passing the updated fields from draftValues to the 
  // Apex method updateBoatList(Object data).
  // Show a toast message with the title
  // clear lightning-datatable draft values
  handleSave(event) {
    // notify loading
    this.isLoading(true);
    const updatedFields = event.detail.draftValues;
    // Update the records via Apex
    updateBoatList({data: updatedFields})
    .then(() => {
        this.refresh();
        this.showToast(SUCCESS_TITLE, MESSAGE_SHIP_IT);
    })
    .catch(error => { this.showToast(ERROR_TITLE, ERROR_VARIANT); })
    .finally(() => {});
  }
  // Check the current value of isLoading before dispatching the doneloading or loading custom event
  notifyLoading(isLoading) { 
    this.isLoading = isLoading;
  }

  showToast(title, message) {
    const toastEvent = new ShowToastEvent({
        title: title,
        message: message
    });
    this.dispatchEvent(toastEvent);
  }
}
