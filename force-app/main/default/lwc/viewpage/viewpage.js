import { LightningElement, wire, track} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import Rating_FIELD from '@salesforce/schema/Account.Rating';
import { createRecord } from 'lightning/uiRecordApi';



export default class RadioGroupInHorizontal extends LightningElement {
   
    accname;
    accphone;
    accnumber;
    accdescription;
    accfax;
    acctype;
    accrating;
    @track selectedStep = 'Step1';
 
    handleNext() {
        var getselectedStep = this.selectedStep;
        if(getselectedStep === 'Step1'){
            this.selectedStep = 'Step2';
        }
        
    
    }
 
    handlePrev() {
        var getselectedStep = this.selectedStep;
        if(getselectedStep === 'Step2'){
            this.selectedStep = 'Step1';
        }
    

    }
      
    handleFinish() {
        alert('Finished...');
        this.selectedStep = 'Step1';
    }
      
    selectStep1() {
        this.selectedStep = 'Step1';
    }
 
   
    selectStep2() {
        this.selectedStep = 'Step2';
    }
 
    get isSelectStep2() {
        return this.selectedStep === "Step2";

    }
    accnamechangehandler(event){
        this.accname=event.target.value;

    }
    accphonechangehandler(event){
        this.accphone=event.target.value;
    }
    accnumberchangehandler(event){
        this.accnumber=event.target.value;
    }
    accdeschangehandler(event){
        this.accdescription=event.target.value;
    }
    acctypechangehandler(event){
        this.acctype=event.target.value;

    }
    accratingchangehandler(event){
        this.accrating=event.target.value;

    }
    accfaxchangehandler(event){
        this.accfax=event.target.value;

    }

    saverecord()
    {
     if(!this.accname)   {
alert('account name required');
return;
     } 
     var fields = {
         'sobjectType':'Account',
         'Name':this.accname,
         'Phone':this.accphone,
         'AccountNumber':this.accnumber,
         'Description':this.accdescription,
         'Type':this.accfax,
         'Rating':this.acctype,
         'Fax':this.accrating,
         
     }
     console.log('fields'+fields)
     var objectaccount ={'apiName':'Account',fields};
     createRecord(objectaccount)

     .then(Response =>{
       alert('account created' +Response.id);  
     })
     
     .catch(error =>{
         alert('error', JSON.stringify(error));
     });
    }

    

    

}