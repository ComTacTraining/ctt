import Amplify, { withSSRContext } from 'aws-amplify'
import config from 'aws-exports'
import axios from 'axios'
import * as React from 'react'

Amplify.configure({ ...config, ssr: true })

const Test = ({ pk, testUser }) => {
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    const a = async () => {
      const b = await axios.get('/api/member/test')
      setUser(b)
    }
    a()
  }, [])

  return (
    <div>
      <p key='1'>pk: {pk}</p>
      {user && <p>{JSON.stringify(user)}</p>}
      {testUser}
    </div>
  )
}

export const getServerSideProps = async (req) => {
  const { Auth } = withSSRContext({ req })
  const testUser = await Auth.currentAuthenticatedUser()
  return {
    props: {
      pk: process.env.TRANSCRIBE_ACCESS_ID,
      testUser
    }
  }
}

export default Test
