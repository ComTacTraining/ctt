import Evolution from 'components/Evolution'
import { withMemberAuth } from 'components/Auth/HOC'

const EvolutionPage = () => {
  return (
    <Evolution />
  )
}

export default withMemberAuth(EvolutionPage)