import { H6, P } from '@/mui/Typography'
import Box from '@material-ui/core/Box'

const Combine = ({ step, intro, outro }) => {
  return (
    <Box
      border={1}
      borderRadius={8}
      marginTop={4}
      marginBottom={4}
      bgcolor='#efefef'
      padding={4}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'>
      <H6>Step {step}: Combine Intro with Response</H6>
      {intro && (
        <P>
          Intro: <strong style={{ color: '#a5a5a5' }}>{intro}</strong>
        </P>
      )}
      {outro && (
        <P>
          Response: <strong style={{ color: '#a5a5a5' }}>{outro}</strong>
        </P>
      )}
      {intro && outro && (
        <P>
          Finished Response:{' '}
          <strong style={{ color: '#333' }}>{`${intro} ${outro}`}</strong>
        </P>
      )}
    </Box>
  )
}

export default Combine
