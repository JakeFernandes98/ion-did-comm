import { v4 as uuidv4 } from "uuid";

export class AckMessage {


    constructor(){
    }

    generate(thid){
        return {
            "type": "https://didcomm.org/notification/1.0/ack",
            "id": uuidv4().toString(),
            "thid": thid,
            "~thread": {
                "status": "OK",
                "sender_order": 1,
                "received_orders": {did: 0}
            }
            
        }
    }
}