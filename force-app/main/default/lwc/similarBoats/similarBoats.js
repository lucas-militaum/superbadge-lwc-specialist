// imports
import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
// import getSimilarBoats
import getSimilarBoats from "@salesforce/apex/BoatDataService.getSimilarBoats";

export default class SimilarBoats extends NavigationMixin(LightningElement) {
    // Private
    relatedBoats;
    boatId;
    error;

    // public
    get recordId() {
        // returns the boatId
    }
    set recordId(value) {
        // sets the boatId value
        // sets the boatId attribute
    }

    // public
    @api similarBy;

    // Wire custom Apex call, using the import named getSimilarBoats
    // Populates the relatedBoats list
    @wire(getSimilarBoats, { boatId: '$boatId', similarBy: '$similarBy' })
    similarBoats({ error, data }) {
        if (data) {
            this.relatedBoats = data;
        }

        if (error) {
            console.error(error);
        }
    }
    get getTitle() {
        return 'Similar boats by ' + this.similarBy;
    }
    get noBoats() {
        return !(this.relatedBoats && this.relatedBoats.length > 0);
    }

    // Navigate to record page
    openBoatDetailPage(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.boatId,
                actionName: 'view'
            }
        });
    }
}
