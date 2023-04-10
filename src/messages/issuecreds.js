import { v4 as uuidv4 } from "uuid";

export class IssueCredentialsMessage {

    constructor(){
        
    }

    issue(){
        return {
                "@type": "https://didcomm.org/issue-credential/2.0/issue-credential",
                "@id": uuidv4().toString(),
                "goal_code": "<goal-code>",
                "replacement_id": "<issuer unique id>",
                "comment": "<some comment>",
                "more_available": "<count>",
                "formats" : [
                    {
                        "attach_id" : "<attachment identifier>",
                        "format" : "<format-and-version>",
                    }
                ],
                "credentials~attach": [
                    {
                        "@id": "<attachment identifier>",
                        "mime-type": "application/json",
                        "data": {
                            "base64": "<bytes for base64>"
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
}