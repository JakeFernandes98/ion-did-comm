import { v4 as uuidv4 } from "uuid";
import { generateNonce } from "../utils/util.js";

export class QuestionAnswerMessage {


    constructor(){
    }

    ask(questionText, questionDetail, validResponses, thid=undefined){
        console.log(validResponses)
        let msg = {
            "type": "https://didcomm.org/questionanswer/1.0/question",
            "id": uuidv4().toString(),
            "body":{
                'question_text': questionText,
                'question_detail': questionDetail,
                'nonce': generateNonce(24),
                'signature_required': false,
                'valid_responses': validResponses,
                'expires_time': Date.now()+1000000
                // 'permissions_request_object_id'
            }
            
        }
        if(thid !== undefined) msg['thid']=thid
        else msg['thid'] = uuidv4().toString()
        return msg
    }

    getOptions(question){
        return question['body']['valid_responses']
    }


    //expects response in form
    //{"text": "Yes, it's me"}
    answer(question, decision, thid=undefined){
        if(this.getOptions(question).indexOf(decision) != -1){
            let msg = {
                "type": "https://didcomm.org/questionanswer/1.0/answer",
                "id": uuidv4().toString(),
                "thid": question["id"],
                "created_time": Date.now(),
                "body": {
                    'response' : decision['text']
                }
            }
            if(thid !== undefined) msg['thid']=thid
            else msg['thid'] = uuidv4().toString()
            return msg
        }

    }
}