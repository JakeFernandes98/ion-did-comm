import { v4 as uuidv4 } from "uuid";

export class DwnMessage {


    constructor(){
    }

    generate(content){
        return {
            "type": "https://neom.com/1.0/dwnpermission",
            "id": uuidv4().toString(),
            "lang": "en",
            "created_time": Date.now(),
            "body":{
                'objectId': content
            }
            
        }
    }
}