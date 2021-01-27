import { UserContext } from 'components/Auth/UserContext'
import Demo from 'components/Demo'
import Loading from 'components/Loading'
import { useRouter } from 'next/router'
import * as React from 'react'

const DemoPage = () => {
  const router = useRouter()
  const { user, isLoading }  = React.useContext(UserContext)
  
  if (!isLoading && !user) {
    router.push('/signup')
  }

  return isLoading ? <Loading /> : (
    <Demo />
  )
}

export default DemoPage