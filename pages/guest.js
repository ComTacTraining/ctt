import * as React from 'react'
import { UserContext } from 'components/Auth/UserContext'
import Loading from 'components/Loading'

const Guest = () => {
    const { user }  = React.useContext(UserContext)
    return user ? (
        <p>{user.attributes['email']}</p>
    ) : <Loading />
}

export default Guest