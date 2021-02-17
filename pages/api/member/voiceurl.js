import crypto from 'crypto';
import { createPresignedURL } from '../../../components/Evolution/Transcribe/aws-signature-v4';
import Amplify, { withSSRContext } from 'aws-amplify';
import config from 'aws-exports';
Amplify.configure({
  config,
  ssr: true
})
const accessId = process.env.AWS_ACCESS_ID
const secretKey = process.env.AWS_SECRET_KEY

export default async (req, res) => {
  if (req.method === "POST") {    
    const { Auth } = withSSRContext({ req })
    const { 
      region,
      languageCode,
      sampleRate
    } = JSON.parse(req.body)
    try {
      const user = await Auth.currentAuthenticatedUser();
      let endpoint = "transcribestreaming." + region + ".amazonaws.com:8443";

        // get a preauthenticated URL that we can use to establish our WebSocket
        let resUrl = createPresignedURL(
            'GET',
            endpoint,
            '/stream-transcription-websocket',
            'transcribe',
            crypto.createHash('sha256').update('', 'utf8').digest('hex'), {
                'key': accessId,
                'secret': secretKey,
                'sessionToken': '',
                'protocol': 'wss',
                'expires': 15,
                'region': region,
                'query': "language-code=" + languageCode + "&media-encoding=pcm&sample-rate=" + sampleRate
            }
        );

      res.status(200).json({
        url: resUrl
      })
    } catch (e) {
      res.status(500).json({ statusCode: 500, message: e.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
};