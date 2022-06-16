public with sharing class ContactController {
   // public ContactController() {

        
            @AuraEnabled(cacheable=true)
               public static List<Contact> findContacts(String searchKey) {
                   String key = '%' + searchKey + '%';
                   return [
                       SELECT Id, Name 
                       FROM Contact WHERE Name LIKE:key 
                   ];
                   system.debug('Hello');
               }
           
           
        
    
        
        