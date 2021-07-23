import { UserContext } from 'components/Auth/UserContext'
import Loading from 'components/UI/Loading'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import * as React from 'react'

const withGuestAuth = WrappedComponent => {
    const RequiresGuestAuth = props => {
        const router = useRouter()
        const { user, isLoading } = React.useContext(UserContext) 

        React.useEffect(() => {
            if (!isLoading && !user) {
                router.push('/signin')
            }
        }, [user, isLoading])
        return user ? <WrappedComponent {...props} /> : <Loading />
    }
    return RequiresGuestAuth
}
withGuestAuth.propTypes = {
    WrappedComponent: PropTypes.node.isRequired
}

const withMemberAuth = WrappedComponent => {
    const RequiresMemberAuth = props => {
        const router = useRouter()
        const { user, isMember, isAdmin, isLoading } = React.useContext(UserContext) 

        React.useEffect(() => {
            if (!isLoading) {
                if (!user) {
                    router.push('/signin')
                } else if (!isMember && !isAdmin) {
                    router.push('/demo')
                }
            }
        }, [user, isLoading, isMember, isAdmin])
        return user && (isMember || isAdmin) ? <WrappedComponent {...props} /> : <Loading />
    }
    return RequiresMemberAuth
}
withMemberAuth.propTypes = {
    WrappedComponent: PropTypes.node.isRequired
}

const withAdminAuth = WrappedComponent => {
    const RequiresAdminAuth = props => {
        const router = useRouter()
        const { user, isAdmin, isLoading } = React.useContext(UserContext) 

        React.useEffect(() => {
            if (!isLoading && !isAdmin) {
                router.push('/signin')
            }
        }, [user, isLoading, isAdmin])
        return user && isAdmin ? <WrappedComponent {...props} /> : <Loading />
    }
    return RequiresAdminAuth
}
withAdminAuth.propTypes = {
    WrappedComponent: PropTypes.node.isRequired
}

export { withGuestAuth, withMemberAuth, withAdminAuth }
