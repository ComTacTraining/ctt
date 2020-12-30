import Evolution from 'components/Evolution'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  const { category } = router.query
  return (
    <Evolution category={category} />
  )
}

export default Page