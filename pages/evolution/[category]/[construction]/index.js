import Evolution from 'components/Evolution'
import { useRouter } from 'next/router'
import { withMemberAuth } from 'components/Auth/HOC'

const EvolutionPage = () => {
  const router = useRouter()
  const { category, construction } = router.query
  return (
    <Evolution category={category} construction={construction} />
  )
}

export default withMemberAuth(EvolutionPage)