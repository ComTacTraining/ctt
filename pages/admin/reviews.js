import Reviews from 'components/Admin/Reviews'
import { withAdminAuth } from 'components/Auth/HOC'

const ReviewsPage = () => <Reviews />

export default withAdminAuth(ReviewsPage)
