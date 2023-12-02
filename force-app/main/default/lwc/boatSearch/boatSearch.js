// imports
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

 export default class BoatSearch extends NavigationMixin(LightningElement) {
    isLoading = false;
    boatTypeId = '';
    
    // Handles loading event
    handleLoading() { }
    
    // Handles done loading event
    handleDoneLoading() { }
    
    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event) { 
      this.boatTypeId = event.detail.boatTypeId;
    }
    
    createNewBoat() { }
  }
  