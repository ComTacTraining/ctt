import Evolution from 'components/Evolution'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  const { category, construction, id } = router.query
  return (
    <Evolution category={category} construction={construction} id={id} />
  )
}

export default Page