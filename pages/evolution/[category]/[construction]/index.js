import Evolution from 'components/Evolution'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  const { category, construction } = router.query
  return (
    <Evolution category={category} construction={construction} />
  )
}

export default Page