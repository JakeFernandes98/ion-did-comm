import { v4 as uuidv4 } from "uuid";

export class BasicMessage {


    constructor(){
    }

    generate(content){
        return {
            "type": "https://didcomm.org/basicmessage/2.0/message",
            "id": uuidv4().toString(),
            "lang": "en",
            "created_time": Date.now(),
            "body":{
                'content': content
            }
            
        }
    }
}