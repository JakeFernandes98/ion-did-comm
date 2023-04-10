import { ProtocolsConfigure } from "fork-of-dwn-sdk-js";

export function generateNonce(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nonce = '';
    for (let i = 0; i < length; i++) {
      nonce += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return nonce;
  }


/**
* Configures DWN based on it's public URL and user did struct
* @param {string} host
  * @param {object} structuredDidKey 
*/
export async function configureDwn(dwn, host, structuredDidKey) {


  let accessibilityDefinition = {
    'labels': {
      'accessibility': {
        'schema': 'neomvp/accessibility'
      },
      'dietary': {
        'schema': 'neomvp/dietary'
      },
      'diving': {
        'schema': 'neomvp/diving'
      },
      'tawazun': {
        'schema': 'neomvp/tawazun'
      }
    },
    'records': {
      'accessibility': {
        'allow': {
          'anyone': {
            'to': [
              'write'
            ]
          }
        }
      },
      'dietary': {
        'allow': {
          'anyone': {
            'to': [
              'write'
            ]
          }
        }
      },
      'diving': {
        'allow': {
          'anyone': {
            'to': [
              'write'
            ]
          }
        }
      },
      'tawazun': {
        'allow': {
          'anyone': {
            'to': [
              'write'
            ]
          }
        }
      }
    }

  }

  let accessibilityMessage = await createProtocolsConfigureFromMessage(dwn, 'neomvp', accessibilityDefinition, structuredDidKey)
  console.log(accessibilityMessage)
  let accessibilityResponse = await dwn.send(host, accessibilityMessage)
  console.log(accessibilityResponse)

}

/**
  * Creates a signed DWN protocolsConfigure Message from a message body
   * @param {string} protocolName 
   * @param {object} protocolDefinition 
   * @param {object} structuredDidKey 
   * @param {DID} targetDid 
  * @returns {Promise<object>} ProtocolsConfigure
  */
 export async function createProtocolsConfigureFromMessage(dwn, protocolName, protocolDefinition, structuredDidKey) {
  const signatureMaterial = dwn.createSignatureInput(structuredDidKey)
  let protocol_config = {
    method: 'ProtocolsConfigure',
    message: {
      protocol: protocolName,
      definition: protocolDefinition
    }
  };

  const opts = {
    target: structuredDidKey.did,
    signatureInput: signatureMaterial,
    ...protocol_config.message
  }

  console.log(opts)

  const protocolsConfigure = await ProtocolsConfigure.create(opts);

  return protocolsConfigure.toJSON();

}