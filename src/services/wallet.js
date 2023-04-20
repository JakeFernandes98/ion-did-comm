import { BasicMessage } from "../messages/basicmessage.js"
import { LocationEventMessage } from "../messages/locationevent.js"
import { QuestionAnswerMessage } from "../messages/questionanswer.js"
import { AckMessage } from "../messages/ackmessage.js"
import { Service } from "./service.js"
import { configureDwn } from "../utils/util.js"
import fetch from 'node-fetch';
import dotenv from "dotenv";
dotenv.config();

export class Wallet {

    SERVICE_IP = process.env.SERVICE_IP
    agent
    user_did
    gtpDID = 'did:ion:EiBYCzJhdb0kHX43TiZ8HZBUgpSZfFOXVoupo5Zjf9nwlA:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkaWRjb21tIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoicGRseDJyMGRrWkRzck9MN1o2anBqQkhBcnlvS3JFM2Z3S3U1LUtpM2M0QSJ9LCJwdXJwb3NlcyI6WyJrZXlBZ3JlZW1lbnQiLCJhdXRoZW50aWNhdGlvbiIsImFzc2VydGlvbk1ldGhvZCJdLCJ0eXBlIjoiRWQyNTUxOSJ9XSwic2VydmljZXMiOlt7ImlkIjoiZGlkY29tbSIsInNlcnZpY2VFbmRwb2ludCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9ncm91bmQtdHJhdmVsLXBhc3MvbWVzc2FnaW5nIiwidHlwZSI6IkRJRENvbW1NZXNzYWdpbmcifV19fV0sInVwZGF0ZUNvbW1pdG1lbnQiOiJFaUNTU0RGWDRzWFowN3BOc0FOeC0xT1VpQnRqN1dXWWw0RjB0YXZFazN2UXV3In0sInN1ZmZpeERhdGEiOnsiZGVsdGFIYXNoIjoiRWlERjhud2s1X1Q4N2ZFNnRqQ3d4Z18yYTRLQllXVERrQThESkM1T3VQdlpVQSIsInJlY292ZXJ5Q29tbWl0bWVudCI6IkVpQTNfMWZ1SlF3N1B4WjFPbHVSV2Zid2UzUU93MEswMEFQc3FUNkY2UW5xREEifX0'
    divingDID = 'did:ion:EiDiwC-KPpTXp2hovn99wT0J7JNY8PHui4yp40fjkw6Vug:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkaWRjb21tIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiLS1NMVZCTG95MDlDNGN0YUphRVVLWU9OR0p6UjZwbGRvYzNVZ2dnU0tvbyJ9LCJwdXJwb3NlcyI6WyJrZXlBZ3JlZW1lbnQiLCJhdXRoZW50aWNhdGlvbiIsImFzc2VydGlvbk1ldGhvZCJdLCJ0eXBlIjoiRWQyNTUxOSJ9XSwic2VydmljZXMiOlt7ImlkIjoiZGlkY29tbSIsInNlcnZpY2VFbmRwb2ludCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9kaXZpbmcvbWVzc2FnaW5nIiwidHlwZSI6IkRJRENvbW1NZXNzYWdpbmcifV19fV0sInVwZGF0ZUNvbW1pdG1lbnQiOiJFaURjdzF3ZnI1QWhMQWN6UkgzM2xDbnZhQWN3UHEwQXJVQXJkNFJXamlZcDVRIn0sInN1ZmZpeERhdGEiOnsiZGVsdGFIYXNoIjoiRWlCckJ4SVhac1V2X0xhMl9ZMnBSMl91NVlCaUZ6cTl0N1NZdWo3enNKWFo5USIsInJlY292ZXJ5Q29tbWl0bWVudCI6IkVpQ1RHeFZqSGhKRXpOeWNIaURaZkVBZjRoUGxsZkZDZ1FKdUVVZk9md1ZRa1EifX0'
    hotelDID = 'did:ion:EiD6XBS656ZWGnP_FmnQDOH3IX209t6c3vZ3-a_Ig4Csyg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkaWRjb21tIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiR3IyaTBDQzFQY1djMmJ5bUd3RWY2UkFIMFA3bm5zYTdQOWltRW83VDNsWSJ9LCJwdXJwb3NlcyI6WyJrZXlBZ3JlZW1lbnQiLCJhdXRoZW50aWNhdGlvbiIsImFzc2VydGlvbk1ldGhvZCJdLCJ0eXBlIjoiRWQyNTUxOSJ9XSwic2VydmljZXMiOlt7ImlkIjoiZGlkY29tbSIsInNlcnZpY2VFbmRwb2ludCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9ob3RlbC9tZXNzYWdpbmciLCJ0eXBlIjoiRElEQ29tbU1lc3NhZ2luZyJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpQS1FZTQ0YXZXa0pYcG95OExRT0NyWG84N2k3VXZvYm1WSDZrWGFCZTBJTlEifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUQ1MHVBbEFKZGE5UFlBRDhUa1N6Z0xObkFaYWtiZmFJZVE0WTB3b0ZrR2dnIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlERHRicnd1aHhHanZYMEJnaTAtbzh6QmFzSW1uSUY3Q2UzWWNCOUk2Nnp5ZyJ9fQ'
    airportDID = 'did:ion:EiCN_PtmVyK4EMNc0VJGiLUNt00_fYHk-y_40UQG0irmKA:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkaWRjb21tIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoibmhzRGNjQmlfZXUzT0FobUxOQzI1cHRxa3JLS3FSWTBnamphMEx4enY1RSJ9LCJwdXJwb3NlcyI6WyJrZXlBZ3JlZW1lbnQiLCJhdXRoZW50aWNhdGlvbiIsImFzc2VydGlvbk1ldGhvZCJdLCJ0eXBlIjoiRWQyNTUxOSJ9XSwic2VydmljZXMiOlt7ImlkIjoiZGlkY29tbSIsInNlcnZpY2VFbmRwb2ludCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9haXJwb3J0L21lc3NhZ2luZyIsInR5cGUiOiJESURDb21tTWVzc2FnaW5nIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBQXhfRnVlNTBVdW1tYXJzNmJYVGdyMjFuNFdneWtXVkw3UnU3bVd2cVY0QSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQVVSZzRzYVF5cEJyMjNwTGhPSHZ1bVlCU1l2dnFPVUFxaEhqZlFVb3RXMXciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaURNNk1NLWkxNk5wNWZ3OXZxX2ZCUTNUcHBvaUVCLTc2dFFfTWNtd1RsN2VBIn19'
    
    // Receives a location event from wallet ->
    // Sends a question/answer to wallet (do you want a taxi) ->
    // Sends a basicmessage to wallet (taxi is arriving)
    // Sends a location event to wallet
    // Sends a location even to wallet
    constructor(){
        this.agent = new Service('wallet')
       
    }

    async init(app, dwn, PORT){


        let response = await fetch(SERVICE_IP+'/ground-travel-pass/did')
        let data = await response.json()
        this.gtpDID = data.did

        response = await fetch(SERVICE_IP+'/airport/did')
        data = await response.json()
        this.airportDID = data.did

        response = await fetch(SERVICE_IP+'/hotel/did')
        data = await response.json()
        this.hotelDID = data.did

        response = await fetch(SERVICE_IP+'/diving/did')
        data = await response.json()
        this.divingDID = data.did



        await this.agent.init(PORT, dwn, this.didCommHandler.bind(this))
        await this.agent.initReceiver(app)

        await configureDwn(this.agent.getDWN(),this.agent.getHost(),this.agent.getKeys())
        app.get('/wallet/did', async (req,res) => {
            res.send(this.agent.getKeys())
        })

        app.post('/wallet/send', async(req,res) => {
            let message = req.body.message
            let to = req.body.to
            switch(to){
                
            }
            let response = await this.agent.send(to, message)
            res.send(response)
        })

        
    }

    
    // Receives a location event from wallet ->
    // Sends a question/answer to wallet (do you want a taxi) ->
    async didCommHandler(event, context){
        let thid = event.data.message.thid
        let type = event.data.message.type
        let messageBody = event.data.message.body
        let from = event.data.message.from
        console.log("------------------")        
        console.log(" THIS IS THE body ", messageBody)
        console.log(" THIS IS THE from ", from)
        if (type == "https://neom.com/1.0/dwnpermission") {
            await this.grantPermission(messageBody, from, thid)
        }else if (type == "https://neom.com/1.0/location") {
            this.handleLocation(messageBody, thid)
        }


    }

    async handleLocation(messageBody, thid){

        console.log('rerouting message', messageBody)

        let location = new LocationEventMessage()
        let locationMsg = location.create(messageBody['place'],messageBody['type'],messageBody['time'],thid)
        
        if(messageBody['place'] == 'hotel' && messageBody['type'] == 'arriving'){
            await this.agent.send(this.hotelDID, locationMsg)
        }else if(messageBody['place'] == 'hotel' && messageBody['type'] == 'arrived'){
            await this.agent.send(this.divingDID, locationMsg)
        }else if(messageBody['place'] == 'airport' && messageBody['type'] == 'arriving'){
            await this.agent.send(this.airportDID, locationMsg)
        }else if(messageBody['place'] == 'airport' && messageBody['type'] == 'arrived'){
            await this.agent.send(this.airportDID, locationMsg)
        }
    }

    async grantPermission(messageBody, from){
        let filter = {
            'objectId': messageBody['objectId']
        }
        let findPerm = await this.agent.getDWN().createPermissionsRead(this.agent.getKeys(),this.agent.getDID(),filter)
        console.log('find perm message', findPerm)
        let response = await this.agent.dwnSend(from, findPerm)
        console.log('looking for responses', response)
        if (response.status.code == 200 & response.entries.length > 0){
            let grantPerm = await this.agent.getDWN().processPermission(response.entries[0], this.agent.getKeys())
            console.log('perm grant message ', grantPerm)
            let response2 = await this.agent.dwnSend(from, grantPerm)
            console.log('granted permissions', response2)
        }

        let ackMessage = new AckMessage()
        let ack = ackMessage.generate(from, messageBody)
        await this.agent.send(from, ack)


        
    }


}