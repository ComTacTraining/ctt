import { UserContext } from 'components/Auth/UserContext'
import * as React from 'react'

export const ADMIN_ROLE = 'ADMIN_ROLE'
export const MEMBER_ROLE = 'MEMBER_ROLE'
export const GUEST_ROLE = 'GUEST_ROLE'
export const VISITOR_ROLE = 'VISITOR_ROLE'

export const useRouteAuth = ({ minRole = VISITOR_ROLE }) => {
    const { user, isMember, isAdmin, isLoading: isUserLoading }  = React.useContext(UserContext)
    const [isAuthorized, setIsAuthorized] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        const checkAuthorization = () => {
            if (minRole === ADMIN_ROLE && isAdmin || (minRole === MEMBER_ROLE && (isMember || isAdmin)) || minRole === GUEST_ROLE && user || minRole === VISITOR_ROLE) {
                setIsAuthorized(true)
                setIsLoading(false)
            } else {
                setIsAuthorized(false)
                setIsLoading(false)
            }
        }
        
        if (!isUserLoading) {
            checkAuthorization()
        }
    }, [isUserLoading])
    
    
    return { isAuthorized, isLoading }
}

