 import { LightningElement, wire, track} from 'lwc';
 import accountclass from '@salesforce/apex/accountclass.accountclass';
// import { getPicklistValues } from 'lightning/uiObjectInfoApi';
// import { getObjectInfo } from 'lightning/uiObjectInfoApi';
// import ACCOUNT_OBJECT from '@salesforce/schema/Account';
// import Rating_FIELD from '@salesforce/schema/Account.Rating';
// import { createRecord } from 'lightning/uiRecordApi';

 export default class RadioGroupInHorizontal extends LightningElement {


  @track accounts;
   @track error;
   @wire(accountclass) accounts;

//     firstName= '';
//     @track selectedValue;
//     @track options = [];
//     accname;
//     accphone;
//     accnumber;
//     accdescription;
//     accfax;
//     acctype;
//     accrating;

    // object info using wire service
    // @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    // objectInfo;

    // Getting Account Rating Picklist values using wire service
    // @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Rating_FIELD})
    // ratingPicklistValues({error, data}) {
    //     if(data) {
    //         window.console.log('result ===> '+JSON.stringify(data.values));
    //         this.options = data.values;
    //     }
    //     else if(error) {
    //         window.console.log('error ===> '+JSON.stringify(error));
    //     }
    // }

    // handle the selected value
    // handleSelected(event) {
    //    window.console.log('selected value ===> '+event.target.value);
    //    this.selectedValue = event.target.value;
    // }
  //for header and footer
    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    // @track isModalOpen = true;
    // openModal() {
    //     // to open modal set isModalOpen tarck value as true
    //     this.isModalOpen = true;
    // }
    // closeModal() {
        // to close modal set isModalOpen tarck value as false
    //     this.isModalOpen = false;
    // // }
    // submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
//         this.isModalOpen = false;
//     }
//     @track selectedStep = 'Step1';
 
//     handleNext() {
//         var getselectedStep = this.selectedStep;
//         if(getselectedStep === 'Step1'){
//             this.selectedStep = 'Step2';
//         }
        
    
//     }
 
//     handlePrev() {
//         var getselectedStep = this.selectedStep;
//         if(getselectedStep === 'Step2'){
//             this.selectedStep = 'Step1';
//         }
    

//     }
      
//     handleFinish() {
//         alert('Finished...');
//         this.selectedStep = 'Step1';
//     }
      
//     selectStep1() {
//         this.selectedStep = 'Step1';
//     }
 
   
//     selectStep2() {
//         this.selectedStep = 'Step2';
//     }
 
//     get isSelectStep2() {
//         return this.selectedStep === "Step2";

//     }
//     accnamechangehandler(event){
//         this.accname=event.target.value;

//     }
//     accphonechangehandler(event){
//         this.accphone=event.target.value;
//     }
//     accnumberchangehandler(event){
//         this.accnumber=event.target.value;
//     }
//     accdeschangehandler(event){
//         this.accdescription=event.target.value;
//     }
//     acctypechangehandler(event){
//         this.acctype=event.target.value;

//     }
//     accratingchangehandler(event){
//         this.accrating=event.target.value;

//     }
//     accfaxchangehandler(event){
//         this.accfax=event.target.value;

//     }

//     saverecord()
//     {
//      if(!this.accname)   {
// alert('account name required');
// return;
//      } 
//      var fields = {
//          'sobjectType':'Account',
//          'Name':this.accname,
//          'Phone':this.accphone,
//          'AccountNumber':this.accnumber,
//          'Description':this.accdescription,
//          'Type':this.accfax,
//          'Rating':this.acctype,
//          'Fax':this.accrating,
         
//      }
//      var objectaccount ={'apiName':'Account',fields};
//      createRecord(objectaccount).then(Response =>{
//        alert('account created' +Response.id);  
//      }).catch(error =>{
//          alert('error', JSON.stringify(error));
//      })
//     }



 }