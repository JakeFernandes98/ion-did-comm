import { v4 as uuidv4 } from "uuid";

export class DwnMessage {


    constructor(){
    }

    generate(content, thid=undefined){
        let msg = {
            "type": "https://neom.com/1.0/dwnpermission",
            "id": uuidv4().toString(),
            "lang": "en",
            "created_time": Date.now(),
            "body":{
                'objectId': content
            },            
        }

        if(thid !== undefined) msg['thid'] = thid
        else msg['thid'] = uuidv4().toString()
        return msg
    }
}