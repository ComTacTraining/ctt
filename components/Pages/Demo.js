import Simulation from '@/components/Simulation/Simulation'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useSelector } from 'react-redux'

const Demo = () => {
  const router = useRouter()
  const { transferOfCommandCompleted } = useSelector((state) => state.ai)

  React.useEffect(() => {
    if (transferOfCommandCompleted) {
      router.push('/membership')
    }
  }, [transferOfCommandCompleted])

  return <Simulation />
}

export default Demo
