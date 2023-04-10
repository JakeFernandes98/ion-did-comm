import { v4 as uuidv4 } from "uuid";

export class AckMessage {


    constructor(){
    }

    generate(did, messageBody){
        return {
            "type": "https://didcomm.org/notification/1.0/ack",
            "id": uuidv4().toString(),
            "status": "OK",
            "~thread": {
                "thid": messageBody['id'],
                "sender_order": 1,
                "received_orders": {did: did}
            }
            
        }
    }
}