import { LightningElement, track, wire,  api } from 'lwc';

export default class Multirecord extends LightningElement {

    handleAccountId(event){
        let accountId = event.detail.value[0];
        if(accountId !== undefined){
            this.selectedAccount = accountId;
            this.contactDataWrp = [];
           contactRecords({accId : accountId}).then(result => {
                this.contactDataWrp = result;
                this.index = result.length;
            }).catch(error => {
                console.log(error);
            })
        }else{
           this.blankRow = []; 
           this.index = 0;
           this.contactDataWrp = [];
        }
    }
}