import { v4 as uuidv4 } from "uuid";

export class LocationEventMessage {

    types = [
        'arrived',
        'arriving',
        'leaving'
    ]

    constructor(){
        
    }

    create(place, type, time){
        if(this.types.indexOf(type) == -1) return null //proper error needed

        return {
            "type": "https://neom.com/1.0/location",
            "id": uuidv4().toString(),
            "body": {
                    "place": place,
                    "type": type,
                    "time": time
            }
        }
    }
}