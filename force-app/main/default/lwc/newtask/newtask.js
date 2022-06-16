import { LightningElement, wire } from 'lwc';

import findContacts from '@salesforce/apex/ContactController.findContacts';

export default class Searchcont extends LightningElement {


   
    searchKey = '';

    @wire(findContacts, { searchKey: '$searchKey' })
    contacts;

    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        });
    }

}
