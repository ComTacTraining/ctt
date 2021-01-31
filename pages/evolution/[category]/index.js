import Evolution from 'components/Evolution'
import { useRouter } from 'next/router'
import { withMemberAuth } from 'components/Auth/HOC'

const EvolutionPage = () => {
  const router = useRouter()
  const { category } = router.query
  return (
    <Evolution category={category} />
  )
}

export default withMemberAuth(EvolutionPage)