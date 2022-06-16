import { LightningElement , track,wire,api} from 'lwc';
import getfields from "@salesforce/apex/FetchingFields.getfields";
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BID from '@salesforce/schema/Object__c.Parent__c.Id';
import PROD from '@salesforce/schema/Object__c.Name';
import DATE from '@salesforce/schema/Object__c.Date';
import TIME from '@salesforce/schema/Object__c.Time';
import QUANTITY from '@salesforce/schema/Object__c.Quantity';
import EMAIL from '@salesforce/schema/Object__c.Email';
import PRODUCTID from '@salesforce/schema/Object__c.Product';
import getInitialRecords from '@salesforce/apex/Controller.initialRecords';
import dosearchRecords from '@salesforce/apex/Controller.searchRecords';
import docreation from '@salesforce/apex/Controller.createRecords';
import requiredRecords from '@salesforce/apex/Controller.linkedRecords';

const FIELDS = ['Object__c.Name',
'Object__c.Parent__c.Id',
'Object__c.Date',
'Object__c.Time',
'Object__c.Quantity',
'Object__c.Email',
'Object__c.Product'];
export default class Multiselectedlist extends LightningElement {


  _selected = [];
  selectedoptions = [];
  search = false;

  prodid = 'xxxxxxxxxxxxxxxxx';

  @wire(getRecord, { recordId: '$prodid', fields: FIELDS })
  product;

  get productname() {
      return getFieldValue(this.product.data, PROD);
  }

  get prodlinkedid() {
      return getFieldValue(this.product.data, PRODUCTID)
  }

  get bookid() {
      return getFieldValue(this.product.data, BID)
  }

  get productdate() {
      return getFieldValue(this.product.data, DATE);
  }

  get producttime() {
      return getFieldValue(this.product.data, TIME);
  }

  get productquantity() {
      return getFieldValue(this.product.data, QUANTITY);
  }

  get custemail() {
      return getFieldValue(this.product.data, EMAIL);
  }

  requiredRecord = [];
  reqValue = new Set([]);
  @wire(requiredRecords, { productname: '$productname', producttime: '$producttime', productdate: '$productdate', bid: '$bookid' })
  requireddata({data,error}) {
      data && (this.requiredRecords = data.map(record => ({value: record.Record__c, label: record.Full__c})));
      data && (this.reqValue = data.map(record => record.Record__c));
  }

  inputFN = null;
  inputLN = null;
  inputDOB = null;

  handleFNInput(event) {
      this.inputFN = event.detail.value;
  }

  handleLNInput(event) {
      this.inputLN = event.detail.value;
  }

  handleDOBInput(event) {
      this.inputDOB = event.detail.value;
  }

  intoptions = [];
  @wire(getInitialRecords, { email: '$custemail' })
  recordsresult({data,error}) {
      data && (this.intoptions = data.map(record => ({value: record.Id, label: record.Full__c})));
  }

  searchoptions = [];

  combined = [];
  finalset = [];
  get options() {
      if(this.search == true) {
          this.combined = [].concat(this.searchoptions,this.requiredRecord,this.selectedvals);
          this.finalset = [...new Set(this.combined)];
          return this.finalset;
      }
      else{
          this.combined = [].concat(this.intoptions,this.requiredRecord);
          this.finalset = [...new Set(this.combined)];
          return this.finalset;
      }
  }

  handleChange(e) {
      this._selected = e.detail.value;
  }

  selectedvals = [];
  handleSearch() {
      if(this.inputFN != null && this.inputLN != null && this.inputDOB != null) {
          for(i=0;i<this._selected.length;i++) {
              for(x=0;x<this.options.length;x++) {
                  if(this._selected[i] == this.options[x].value) {
                      this.selectedvals.push({
                          value: this.options[x].value,
                          label: this.options[x].label,
                      })
                  }
              }
          }
          dosearchRecords({firstName: this.inputFN, lastName: this.inputLN, dob: this.inputDOB}).then((result) => {
                  result && (this.searchoptions = result.map(record => ({value: record.Id, label: record.Full__c})));
              }).catch((error) => {
                  this.error = error;
              })
          this.search = true;
      }
      else {
          this.dispatchEvent(new ShowToastEvent({
              title: 'Unable to search for Records',
              message: 'Please fill in all fields',
              variant: 'error'
          }),);
      }
  }

}