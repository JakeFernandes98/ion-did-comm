import { MessagingRouter, RequestWithAgentRouter } from "@veramo/remote-server";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import {initAgent} from "../utils/agent.js"

dotenv.config();


export class Service {
    servicename
    identifier
    keys
    agent
    host = 'http://vpdwn.heapdydcevavazht.westeurope.azurecontainer.io:3000'

    constructor(_servicename){
        this.servicename = _servicename
        
    }

    async init(port,  _dwn, _fn){
       const {identifier, agent, decodedKeys} = await initAgent(this.servicename, port, _fn);
       this.identifier = identifier
       this.agent = agent
       this.keys = decodedKeys
       this.dwn = _dwn
    }

    
    getHost(){
        return this.host
    }

    getDWN(){
        return this.dwn
    }

    getDID(){
        return this.identifier.did
    }

    getAgent(){
        return this.agent
    }

    getKeys(){
        console.log('getting keys')
        return this.keys
    }

    getServiceName(){
        return this.servicename
    }

    async dwnSend(to, message){
        // let host = await this.dwn.getDwnEndpoint(to)
        try{
            let res = await this.dwn.send(this.host, message)
            return res
        }catch(e){
            console.log(e)
            return {status:{code: 500}}
        }
        
    }
    
    
    async initReceiver(app) {
        app.get('/'+this.servicename+'/did', async (req,res) => {
            res.send(this.getKeys())
        })

        app.use(
            '/'+this.servicename+"/messaging",
        
            RequestWithAgentRouter({'agent':this.agent}),
        
            MessagingRouter({
                metaData: { type: "DIDComm", value: "integration test" },
            })
        );
        //set up a listener for events of type DIDCommV2Message-received
    }
    
    async send(_to, _body){
        console.log(_body)
        try{
            const id = uuidv4().toString();
            const packedMessage = await this.agent.packDIDCommMessage({
              packing: "anoncrypt",
              message: {
                to: _to,
                from: this.identifier.did,
                id,
                ..._body,
              },
            });
          
            const sendMessage = await this.agent.sendDIDCommMessage({
              messageId: id,
              packedMessage,
              recipientDidUrl: _to,
            });
          
            console.log("Message sent", sendMessage);
            return sendMessage
        }catch(e){
            console.log(e)
        }
    }

    async initTrigger(app, triggerName, _to, _body){
        await app.get('/'+this.servicename+"/"+triggerName, async (req,res) => {
            console.log(_to)
            let response = await this.send(_to,_body)
            res.send(response)
        })

    }

}

