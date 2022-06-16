import { LightningElement, api, wire, track} from 'lwc';
import getIconName from '@salesforce/apex/DynamicRelatedRecordsList.getIconName';
import getObjectLabel from '@salesforce/apex/DynamicRelatedRecordsList.getObjectLabel';
import getFieldSet from '@salesforce/apex/DynamicRelatedRecordsList.getFieldSet';

export default class Checkedcomponent extends LightningElement {
    @api recordId;
    @api objectName = '';
    @api relatedField = '';
    @api fieldList = '';
    @api recordsToDisplay = 0;
    @track iconName = '';
    @track objectLabel = '';
    @track data = [];
    @track columns = [];

    @wire(getIconName, { objectName: '$objectName' })
     wiredIcon({ error, data}) {
         if(data) {
            this.iconName = data;
         } else if (error) {
            this.error = error;
            this.iconName = undefined;
         }
     }

    @wire(getObjectLabel, { sobjectApiName: '$objectName' })
    wiredLabel({ error, data}) {
        if(data) {
            this.objectLabel = data;
        } else if (error) {
            this.error = error;
            this.objectLabel = undefined;
        }
    }
    
    @wire(getFieldSet, {
        sObjectName: '$objectName',
        listOfFields: 'fieldList',
        recordId: '$recordId',
        relationshipField: '$relatedField',
        recordsToDisplay: '$recordsToDisplay'
    }) wiredResults({error, data}) {
        if (data) {
            this.data = data.listData;
            this.columns = data.columns;
        } else if (error) {
            this.error = error;
            this.data = undefined;
            this.columns = undefined;
        }
    }

    constructor() {
        super();
        console.log('Object Name: ' + this.fieldList);
    }

}
 
