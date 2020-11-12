// Update this section with your ServiceNow credentials
const options = {
  url: 'https://dev79907.service-now.com/',
  username: 'admin',
  password: 'iwYJl1rQB3Ja',
  serviceNowTable: 'change_request'
};
// Import built-in Node.js package path.
const path = require('path');

  

/**
 * Import the ServiceNowConnector class from local Node.js module connector.js.
 *   and assign it to constant ServiceNowConnector.
 * When importing local modules, IAP requires an absolute file reference.
 * Built-in module path's join method constructs the absolute filename.
 */
const ServiceNowConnector = require(path.join(__dirname, './connector.js'));

/**
 * @function mainOnObject
 * @description Instantiates an object from the imported ServiceNowConnector class
 *   and tests the object's get and post methods.
 */
 function  hasBody(response){
         return response.includes('body');
     }
function mainOnObject() {
  // Instantiate an object from class ServiceNowConnector.
  const connector = new ServiceNowConnector(options);
  // Test the object's get and post methods.
  // You must write the arguments for get and post.


  connector.get( (results, error) => {
    if (error) {
      console.error(`\nError returned from GET request:\n${JSON.stringify(error)}`);
    }
    let jsonData =[];
         try {
                let tempData = JSON.parse(JSON.parse(JSON.stringify(results)).body).result;
                //console.log(tempData);
                tempData.forEach(element =>{
                    if(element.hasOwnProperty('number') ){
                        jsonData.push({'change_ticket_number':element.number});
                    }
                     if(element.hasOwnProperty('sys_id') ){
                              jsonData.push({'change_ticket_key':element.sys_id});
                   } if(element.hasOwnProperty('active')){
                         jsonData.push({'active':element.active});
                    }
                     if(element.hasOwnProperty('priority')){
                         jsonData.push({'prority':element.priority});
                    }
                     if(element.hasOwnProperty('description')){
                         jsonData.push({'description':element.description});
                    }
                     if(element.hasOwnProperty('work_start')){
                         jsonData.push({'work_start':element.work_start});
                    }
                     if(element.hasOwnProperty('work_end')){
                         jsonData.push({'work_end':element.work_end});
                    }
                });
                } catch (err) {
                console.log(err);
                }
                console.log(jsonData);
  });
  
    connector.post({ serviceNowTable: 'change_request' }, (results, error) => {
          if(error){
              return callback(results, error);
          }  let jsonData ={};
     
            try {
                let element = JSON.parse(JSON.parse(JSON.stringify(results)).body).result;
               
                    if(element.hasOwnProperty('number') ){
                        jsonData['change_ticket_number']=element.number;
                    }
                     if(element.hasOwnProperty('sys_id') ){
                              jsonData['change_ticket_key']=element.sys_id;
                   } if(element.hasOwnProperty('active')){
                         jsonData['active']=element.active;
                    }
                     if(element.hasOwnProperty('priority')){
                         jsonData['prority']=element.priority;
                    }
                     if(element.hasOwnProperty('description')){
                         jsonData['description']=element.description
                    }
                     if(element.hasOwnProperty('work_start')){
                         jsonData['work_start']=element.work_start;
                    }
                     if(element.hasOwnProperty('work_end')){
                         jsonData['work_end']=element.work_end;
                    }
       
                } catch (err) {
                console.log(err);
                }
                let sendData={
                    'change_ticket_number':jsonData.change_ticket_number,
                     'active':jsonData.active,
                      'prority':jsonData.prority,
                       'description':jsonData.description,
                        'work_start':jsonData.work_start,
                         'work_end':jsonData.work_end,
                          'change_ticket_key':jsonData.change_ticket_key,
                }
   console.log(sendData);
      });
}

// Call mainOnObject to run it.
mainOnObject();