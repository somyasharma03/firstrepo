public with sharing class dynamicObjectList {
    @AuraEnabled(cacheable=true)
    String fieldsToFetch = '';

    public static List<FieldDefinition> getfields(string objectname){
        string query = 'select DeveloperName,QualifiedApiName from FieldDefinition where EntityDefinition.QualifiedApiName = :objectname ORDER BY DeveloperName ASC';
        list<FieldDefinition> lstObject = Database.query(query);
        system.debug('lstObject==> '+lstObject);
        for(Integer i=0;i<lstObject.Size();i++){
            system.debug('lstObject==> '+lstObject[i].QualifiedApiName);
        }
        return lstObject;


    }
    
    @AuraEnabled(cacheable=true)
    public static list<configuration__c> configRecordsData(){
        return [select name, selected_fields__c from configuration__c];
    }
    @AuraEnabled(cacheable=true)
    public static list<string> ComboBoxList(){
        //list<string> listToShow = new list<string>();
        list<string> objects = new list<string>{'Account', 'Lead', 'Opportunity', 'Contact'};
        list<configuration__c> config = [select Name from configuration__c];
        
        For(Integer i=0; i < config.size(); i++)
        {
            for (Integer j=0; j < objects.size(); j++) 
            { 
                string objDoner1 = objects.get(j);
                string objDoner2 = config.get(i).Name;
                if(objDoner1==objDoner2){ 
                    objects.remove(j); 
                }
            }
        }system.debug('objects'+objects);
        return objects;
    }
    
    @AuraEnabled  
   public static void deleteConfigRecord(configuration__c conList){  
     delete conList;  
   }  
//      @AuraEnabled
//      //public static string methodName(){
//         public static list<configuration__c>getSelectedData(string conId){
// return [select id,selected_fields__c,Name from configuration__c where ID=:conId LIMIT 1];


//         }
     }   
