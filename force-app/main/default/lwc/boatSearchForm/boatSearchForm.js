// imports
import { LightningElement, wire } from 'lwc';
// import getBoatTypes from the BoatDataService => getBoatTypes method';
import getBoatTypes from "@salesforce/apex/BoatDataService.getBoatTypes";

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    
    // Private
    error = undefined;
    
    searchOptions;
    
    // Wire a custom Apex method
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
      if (data) {
        console.log('boat types: ' + JSON.stringify(data));
        this.searchOptions = data.map(type => {
          // TODO: complete the logic
          return { label: type.Name, value: type.Id }
        });
        this.searchOptions.unshift({ label: 'All Types', value: '' });
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
        console.error(error);
      }
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
      this.selectedBoatTypeId = event.detail.value;
      // Create the const searchEvent
      const searchEvent = new CustomEvent('search', { detail: {
        boatTypeId: this.selectedBoatTypeId
      }});
      // searchEvent must be the new custom event search
      this.dispatchEvent(searchEvent);
    }
  }
  