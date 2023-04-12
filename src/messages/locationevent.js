import { v4 as uuidv4 } from "uuid";

export class LocationEventMessage {

    types = [
        'arrived',
        'arriving',
        'leaving'
    ]

    constructor(){
        
    }

    create(place, type, time, thid=undefined){
        if(this.types.indexOf(type) == -1) return null //proper error needed

        let msg = {
            "type": "https://neom.com/1.0/location",
            "id": uuidv4().toString(),
            "body": {
                    "place": place,
                    "type": type,
                    "time": time
            }
        }
        if(thid !== undefined) msg['thid']=thid
        else msg['thid'] = uuidv4().toString()
        return msg
    }
}