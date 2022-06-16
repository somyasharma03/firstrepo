import { LightningElement, wire, track} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import Rating_FIELD from '@salesforce/schema/Account.Rating';
import getAccountList from '@salesforce/apex/picklistrecord.getAccountList';

export default class RadioGroupInHorizontal extends LightningElement {
    @track selectedValue;
    @track options = [];
    @track accData;
      @track errorData;

    @wire(getAccountList)
    dataRecord({data, error}){
      if(data){
          this.accData = data;
      }
      else if(error){
          this.errorData = error;
      }
    }

    // object info using wire service
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    // Getting Account Rating Picklist values using wire service
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Rating_FIELD})
    ratingPicklistValues({error, data}) {
        if(data) {
            window.console.log('result ===> '+JSON.stringify(data.values));
            this.options = data.values;
        }
        else if(error) {
            window.console.log('error ===> '+JSON.stringify(error));
        }
    }

    // handle the selected value
    handleSelected(event) {

     //  window.console.log('selected value ===> '+event.target.value);
       this.recordlistofpiclistvalue = event.target.value;
    }

    recordlistofpiclistvalue(listtype){
        fetchhotrecords({ listtype :recordlistfetch })
        .then( (data) => 
        {
            console.log('data' , JSON.stringify(data))
            if(data)
            {
                for(const list of data)
                {
                    console.log
                }
            }
        })
    }

}

    
