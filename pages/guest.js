import * as React from 'react'
import { UserContext } from 'components/Auth/UserContext'
import Loading from 'components/Loading'
import { P } from 'mui/Typography'

const Guest = () => {
    const { user }  = React.useContext(UserContext)
    return user ? (
        <>
            {user.attributes['email'] && <P>Email: {user.attributes['email']}</P>}
            {user.attributes['custom:referral'] && <P>Referral: {user.attributes['custom:referral']}</P>}
            {user.attributes['custom:stripecustomerid'] && <P>Customer ID: {user.attributes['custom:stripecustomerid']}</P>}
            {user.attributes['custom:stripesubscriptionid'] && <P>Subscription ID: {user.attributes['custom:stripesubscriptionid']}</P>}
            {user.attributes['custom:expired'] && user.attributes['custom:expired'] === '1' ? <P>Expired: true</P> : <P>Expired: false</P>}
        </>
    ) : <Loading />
}

export default Guest