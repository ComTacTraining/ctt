import Evolution from 'components/Evolution'
import { useRouter } from 'next/router'
import { withMemberAuth } from 'components/Auth/HOC'

const EvolutionPage = () => {
  const router = useRouter()
  const { category, construction, id } = router.query
  return (
    <Evolution category={category} construction={construction} id={id} />
  )
}

export default withMemberAuth(EvolutionPage)