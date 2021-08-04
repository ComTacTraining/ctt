import { createPresignedURL } from '@/components/Evolution/Transcribe/aws-signature-v4'
import crypto from 'crypto'

const accessId = process.env.TRANSCRIBE_ACCESS_ID
const secretKey = process.env.TRANSCRIBE_SECRET_KEY

export default async (req, res) => {
  if (req.method === 'POST') {
    // const { Auth } = withSSRContext({ req })
    const { region, languageCode, sampleRate } = JSON.parse(req.body)
    try {
      let endpoint = 'transcribestreaming.' + region + '.amazonaws.com:8443'

      // get a preauthenticated URL that we can use to establish our WebSocket
      let resUrl = createPresignedURL(
        'GET',
        endpoint,
        '/stream-transcription-websocket',
        'transcribe',
        crypto.createHash('sha256').update('', 'utf8').digest('hex'),
        {
          key: accessId,
          secret: secretKey,
          sessionToken: '',
          protocol: 'wss',
          expires: 15,
          region: region,
          query:
            'language-code=' +
            languageCode +
            '&media-encoding=pcm&sample-rate=' +
            sampleRate
        }
      )

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
}
