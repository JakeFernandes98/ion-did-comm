import { v4 as uuidv4 } from "uuid";

export class PresentProofMessage {

    State = {
        "https://didcomm.org/present-proof/2.0/request-presentation": 'RequestPresentation',
        "https://didcomm.org/present-proof/2.0/presentation" : 'Presentation',
        "https://didcomm.org/notification/1.0/ack" : "Ack"
    }

    StateMachine = ['RequestPresentation', 'Presentation', 'Ack']

    currentState

    constructor(url=null){
        if(url == null) this.currentStat = null
        else this.currentState = State[url]
    }

    handleState(message=null){
        let nextState
        if(message == null) nextState = 0
        else {
            let state = message["@type"]
            nextState = this.StateMachine.indexOf(state) + 1
        }
        if (nextState >= this.StateMachine.length) return null //Message is ACK
        return this.StateMachine[nextState]
    
    }

    //https://github.com/hyperledger/aries-rfcs/blob/main/features/0510-dif-pres-exch-attach/README.md#propose-presentation-attachment-format
    generatePresentationRequest(){
        vpId = uuidv4().toString()
        return {
            "@type": "https://didcomm.org/present-proof/2.0/request-presentation",
            "@id": uuidv4().toString(),
            "will_confirm": true,
            "present_multiple": false,
            "formats" : [
                {
                    "attach_id" : vpId,
                    "format" : "dif/presentation-exchange/definitions@v1.0",
                }
            ],
            "request_presentations~attach": [
                {
                    "@id": vpId,
                    "mime-type": "application/json",
                    "data":  {
                        "json": {
                            "options": {
                                "challenge": "23516943-1d79-4ebd-8981-623f036365ef",
                                "domain": "us.gov/DriversLicense"
                            },
                            "presentation_definition": {
                                "input_descriptors": [{
                                    "id": "citizenship_input",
                                    "name": "US Passport",
                                    "group": ["A"],
                                    "schema": [{
                                        "uri": "hub://did:foo:123/Collections/schema.us.gov/passport.json"
                                    }],
                                    "constraints": {
                                        "fields": [{
                                            "path": ["$.credentialSubject.birth_date", "$.birth_date"],
                                            "filter": {
                                                "type": "date",
                                                "minimum": "1999-5-16"
                                            }
                                        }]
                                    }
                                }],
                                "format": {
                                    "ldp_vp": {
                                        "proof_type": ["Ed25519Signature2018"]
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        }
    }

    //https://github.com/hyperledger/aries-rfcs/blob/main/features/0510-dif-pres-exch-attach/README.md#presentation-attachment-format
    generatePresentation(message){

        let vpId = uuidv4().toString()

        return {
            "@type": "https://didcomm.org/present-proof/2.0/presentation",
            "@id": uuidv4().toString(),
            "goal_code": "<goal-code>",
            "comment": "some comment",
            "last_presentation": true,
            "formats" : [
                {
                    "attach_id" : vpId,
                    "format" : "<format-and-version>",
                }
            ],
            "presentations~attach": [
                {
                    "@id": vpId,
                    "mime-type": "application/json",
                    "data": {
                        "sha256": "f8dca1d901d18c802e6a8ce1956d4b0d17f03d9dc5e4e1f618b6a022153ef373",
                        "links": ["https://ibb.co/TtgKkZY"]
                    }
                }
            ],
            "supplements": [
                {
                    "type": "hashlink-data",
                    "ref": "<attachment identifier>",
                    "attrs": [{
                        "key": "field",
                        "value": "<fieldname>"
                    }]
                },
                {
                    "type": "issuer-credential",
                    "ref": "<attachment identifier>",
                }
            ],
            "~attach" : [] //attachments referred to in supplements   
        }

    }

    verifyPresentation(message){

        //do some verification

        return {
            "@type": "https://didcomm.org/notification/1.0/ack",
            "@id": uuidv4().toString(),
            "status": "OK",
            "~thread": {
              "thid": message["@id"],
              "sender_order": 4,
              "received_orders": {"did:sov:abcxyz": 3}
            }
          }

    }





    
}