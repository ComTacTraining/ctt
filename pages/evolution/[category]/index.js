import { withMemberAuth } from '@/components/Auth/HOC'
import Evolution from '@/components/Pages/Evolution'
import { useRouter } from 'next/router'

const EvolutionPage = () => {
  const router = useRouter()
  const { category } = router.query
  return <Evolution category={category} />
}

export default withMemberAuth(EvolutionPage)
