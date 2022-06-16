import { LightningElement,api,track,wire} from 'lwc';
//import fetchlibrary from '@salesforce/apex/searchbook.fetchlibrary';

import bookget from '@salesforce/apex/searchbook.getBook';
import library from '@salesforce/apex/searchbook.fetchlibrary';


   /*const columns = [
       {
           label : 'book name',
           fieldname: 'Name'
       },
       {
           label: ' librarysearch',
           fieldname: 'librarysearch__c'
       }
    ]; */


    export default class Librarycomp extends LightningElement {

    @track lii;
    @track bok;
        message;
        ///msg;
        
        connectedCallback(){
            library()  //parent method call
        .then(result => {
        this.lii = result;
        
        console.log(JSON.stringify(result));
        console.log("result",this.lii);
        })
        
        }
        
        
        bookOne(event){
        this.message = event.target.value;
        console.log('book Id-->'+this.message);
        bookget({librarysearch: this.message})
        
        .then(result => {
        this.bok = result;
        
        console.log(JSON.stringify(result));
        console.log("result1",this.bok);
        })
        .catch(error =>{
        this.error = error;
        
        })
        
        }}
    
    
