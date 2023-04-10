import { BasicMessage } from "./basicmessage"
import { LocationEventMessage } from "./locationevent"
import { PresentProofMessage } from "./presentproof"
import { QuestionAnswerMessage } from "./questionanswer"

export class Message {

    handler

    constructor(url){
        switch(url){
            case 'https://didcomm.org/questionanswer/1.0/question'              : return new QuestionAnswerMessage()
            case 'https://didcomm.org/questionanswer/1.0/answer'                : return new QuestionAnswerMessage()
            case "https://didcomm.org/basicmessage/2.0/message"                 : return new BasicMessage()
            case "https://didcomm.org/present-proof/2.0/request-presentation"   : return new PresentProofMessage(url)
            case "https://didcomm.org/present-proof/2.0/presentation"           : return new PresentProofMessage(url)
            case "https://didcomm.org/notification/1.0/ack"                     : return new PresentProofMessage(url)
            case "https://neom.com/1.0/location"                                : return new LocationEventMessage()

        }
    }

}