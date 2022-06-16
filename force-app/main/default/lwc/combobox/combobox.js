import { LightningElement, wire, api, track } from "lwc";

import getfields from "@salesforce/apex/dynamicObjectList.getfields";
import getRecordsData from "@salesforce/apex/dynamicObjectList.configRecordsData";
import getComboList from "@salesforce/apex/dynamicObjectList.ComboBoxList";
// import getSelectedData from "@salesforce/apex/dynamicObjectList.getSelectedData"
import deleteConfigRecord from "@salesforce/apex/dynamicObjectList.deleteConfigRecord";
import { createRecord } from 'lightning/uiRecordApi';  //calling create record method from LDS
import OBJECT_NAME from '@salesforce/schema/configuration__c';
import SELECTED_OBJECT from '@salesforce/schema/configuration__c.name';
import SELECTED_FIELD from '@salesforce/schema/configuration__c.selected_fields__c';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// row actions
const actions = [ 
  { label: 'Edit', name: 'edit'}, 
  { label: 'Delete', name: 'delete'}
];


const columns =[{label : 'Object', fieldName : "Name"},
                {label : 'Fields', fieldName : "selected_fields__c"},
                {
                  type: 'action',
                  typeAttributes: {
                  rowActions: actions,
                  menuAlignment: 'right'
                  }
              }];

export default class Combobox extends LightningElement {
  @track showCard = true;
  @track showDualBox = false;
  @track showNextButton = true;
  recordId; 
  refreshTable;
  
  openCardHandle(){
    this.showCard = false;
    this.showDualBox = true;
  }


  @track showLoadingSpinner = false;
  @track columns = columns;
  @track recordData = [];
  @track data1 = [];
  @track selected = [];
  @api value = "";
  @api fieldsValue = [];
  @track configurationId;
 // @track fieldsInString;
 //@track fieldsValueStr = [];
@track selectedValue = '';
@track reportOptions = [];

    get options() {
        // return [
        //     {label: 'Account', value: 'Account'},
        //     {label: 'Contact', value: 'Contact'},
        //     {label: 'Lead', value: 'Lead'},
        //     {label: 'Opportunity', value: 'Opportunity'},
        // ];
        return this.reportOptions;
    }
    connectedCallback() {
      getComboList()
          .then(result => {
              let arr = [];
              for (var i = 0; i < result.length; i++) {
                  arr.push({label: result[i], value: result[i]});
                  
              }
              this.reportOptions = arr;
              
          })
          .catch(error => {
              alert(JSON.stringify(error));
          });
  }
    handleChange(event) {
        this.value = event.detail.value;
        console.log('selectedValue'+this.value);
    }

 get selectFields() {
    return this.data1;
    console.log('data1:'+this.data1);
  }
//   get selectedObject() {
//     return this.selected.length ? this.selected : "none";
//   }		

		 @wire(getfields,{
		 objectname: '$value'})
     
  wiredClass({ data, error }) {
    if (data) {
     let Testdata = JSON.parse(JSON.stringify(data));
        let lstOption = [];
      for (var i = 0;i < Testdata.length;i++) {
          lstOption.push({value: Testdata[i].QualifiedApiName,label: Testdata[i].DeveloperName
          });
        }
        this.data1 = lstOption;
        this.showLoadingSpinner = false;
    } else if (error) {
      this.error = error;
    }
  }
  // @wire(getSelectedData, {conId})check;
  
   handleSelectFields(event) {
     
    // this.selected = event.detail.value;
    // console.log('selected'+this.selected);
    this.fieldsValue = event.detail.value;
  
    console.log('fieldsValue='+this.fieldsValue);
    // if(this.fieldsValue.length < 5 ){
    //   this.disableGetRecords = false;
    // }else{
    //   this.disableGetRecords = true;
    // }
    
  }

  clickedButtonLabel;
  //slected = this.fieldsValue.length;
  //console.log('slected==='+slected);
  
  handleSave(event) {
    this.clickedButtonLabel = event.target.label;
    if(this.fieldsValue.length <= 5){
      console.log('clickedButtonLabel'+this.clickedButtonLabel);
      this.selectedValue = JSON.stringify(this.fieldsValue);
      //this.selectedValue = this.selectedValue.split(',');
      console.log('selectedValue=='+this.selectedValue);
    //   let removeComma= () => {
    //     let arr = JSON.stringify(this.fieldsValue);
    //     document.write (arr.join(' '));
    //   }
    
    // removeComma();

    // console.log(arr) 


      // Creating mapping of fields of configuration__c with values
      var fields = {[SELECTED_OBJECT.fieldApiName] : this.value, 
                   [SELECTED_FIELD.fieldApiName ] : this.selectedValue};
 
      // Record details to pass to create method with api name of Object.
      var objectRecordInput = { apiName : OBJECT_NAME.objectApiName, fields};

      // LDS method to create record.
      createRecord(objectRecordInput).then(response => {
          alert('Account Record created with Id: ' +response.id);
          this.showDualBox = false;
          this.showCard = true;
          console.log('response=='+JSON.stringify(response));
          console.log('objectRecordInput=='+objectRecordInput);
          console.log('JSON.stringify(this.fieldsValue)=='+JSON.stringify(this.fieldsValue).length);
          return refreshApex(this.refreshTable);
          
          // this.configurationId = response.id;
          //window.location.reload();
       })
       .catch(error => {
          alert('Error: ' +JSON.stringify(error));
      });

    } else{
      alert('you cant select more than 5 fields');
    }
    //return refreshApex(this.recordData);
  }
   //fetching records in dataTable
   
    @wire(getRecordsData)
    wiredRecord(result){
      this.refreshTable = result;
        if(result.data){
            this.recordData = result.data;  
            console.log('this.recordData.length=='+this.recordData.length);
            if(this.recordData.length=4){
              this.showNextButton = false;
            }else{
              this.showNextButton = true;
            }  
        }
        else if(result.error){
            console.log('error occured');
        }
    }

    //handling row actions to delete and edit record
    handleRowActions(event) {
      const actionName = event.detail.action.name;
      const row = event.detail.row;
      this.recordId = row.Id;
      console.log('fetched record is=='+this.recordId);
      switch (actionName) {
        case 'edit' :
          this.value = row.name;
          this.showDualBox = true;

          //delete a record
        case 'delete':
          this.delRecord(row);
          break;
        }
    }

    delRecord(currentRow) {
      this.showLoadingSpinner = true;
      deleteConfigRecord({ conList: currentRow }).then(result => {
        this.showLoadingSpinner = false;
        this.dispatchEvent(new ShowToastEvent({
          title: 'Success!!',
          message: currentRow.Name + ' account deleted.',
          variant: 'success'
          
      }));
      //refresh the table
      return refreshApex(this.refreshTable);
      }).catch(error => {
        console.log('error occured');
      });
    }

   
}


