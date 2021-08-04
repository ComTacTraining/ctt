import { withAdminAuth } from '@/components/Auth/HOC'
import Reviews from '@/components/Pages/Admin/Reviews'

const ReviewsPage = () => <Reviews />

export default withAdminAuth(ReviewsPage)
