import { LightningElement, api, track, wire} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import {getRecord} from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import Account_CUSTOMER_PAYMENT_METHOD from '@salesforce/schema/Account.Phone';

const FIELDS = [
    Account_Phone
];


export default class NotificationOnField extends LightningElement {
    @api recordId; //opp Id
    @api Phone;
    wiredAccResult; //stores the wired result and allows the refreshApex() to work correctly
    @track record;
    @track error;

@wire(getRecord, {recordId: '$recordId', fields: FIELDS})
getAccRecord(result){
        this.wiredAccResult = result;
        let data = result.data;
        let error = result.error;
        if(data){
        if(this.Phone.field.value == 'null'){
                    this.showToastSuccess();
     }

  }


}



}