import { Auth, Hub } from 'aws-amplify'
import { useEffect, useReducer, useState } from 'react'

const amplifyAuthReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_USER_DATA_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'FETCH_USER_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: action.payload.user,
        isMember: action.payload.isMember,
        isAdmin: action.payload.isAdmin
      }
    case 'UPDATE_TO_MEMBER':
      return {
        ...state,
        isMember: true
      }
    case 'FETCH_USER_DATA_FAILURE':
      return { ...state, isLoading: false, isError: true }
    case 'RESET_USER_DATA':
      return { ...state, user: null }
    case 'ERROR_MESSAGE':
      return {
        ...state,
        isError: true,
        errorMessage: action.payload.errorMessage
      }
    case 'CLEAR_ERROR_MESSAGE':
      return { ...state, isError: false, errorMessage: '' }
    default:
      throw new Error()
  }
}

const useAmplifyAuth = () => {
  const initialState = {
    isLoading: true,
    isError: false,
    isMember: false,
    isAdmin: false,
    user: null,
    errorMessage: ''
  }
  const [state, dispatch] = useReducer(amplifyAuthReducer, initialState)
  const [triggerFetch, setTriggerFetch] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchUserData = async () => {
      if (isMounted) {
        dispatch({ type: 'FETCH_USER_DATA_INIT' })
      }
      try {
        if (isMounted) {
          const data = await Auth.currentAuthenticatedUser()
          if (data) {
            dispatch({
              type: 'FETCH_USER_DATA_SUCCESS',
              payload: {
                user: data,
                isMember:
                  data.attributes['custom:expired'] &&
                  data.attributes['custom:expired'] === '0'
                    ? true
                    : false,
                isAdmin:
                  data.signInUserSession.idToken.payload['cognito:groups'] &&
                  data.signInUserSession.idToken.payload[
                    'cognito:groups'
                  ].includes('Admin')
                    ? true
                    : false
              }
            })
          }
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: 'FETCH_USER_DATA_FAILURE' })
        }
      }
    }

    const HubListener = () => {
      Hub.listen('auth', (data) => {
        const { payload } = data
        onAuthEvent(payload)
      })
    }

    const onAuthEvent = (payload) => {
      // console.log(`auth event: ${payload.event} with data: ${payload.data.message}`)
      switch (payload.event) {
        case 'signIn':
          if (isMounted) {
            setTriggerFetch(true)
          }
          break
        case 'signUp_failure':
          dispatch({
            type: 'ERROR_MESSAGE',
            payload: { errorMessage: payload.data.message }
          })
          break
        case 'signIn_failure':
          dispatch({
            type: 'ERROR_MESSAGE',
            payload: { errorMessage: payload.data.message }
          })
          break
        default:
          return
      }
    }

    HubListener()
    fetchUserData()

    return () => {
      Hub.remove('auth', null)
      isMounted = false
    }
  }, [triggerFetch])

  const handleSignOut = async () => {
    try {
      await Auth.signOut()
      setTriggerFetch(false)
      dispatch({ type: 'RESET_USER_DATA' })
    } catch (error) {
      console.error('Error signing out user ', error)
    }
  }

  const handleClearError = () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
  }

  const handleSubscription = async ({ customerId, subscriptionId }) => {
    if (state.user) {
      try {
        await Auth.updateUserAttributes(state.user, {
          'custom:stripecustomerid': customerId,
          'custom:stripesubscriptionid': subscriptionId,
          'custom:expired': '0'
        })
        dispatch({ type: 'UPGRADE_TO_MEMBER' })
      } catch (error) {
        console.error()
      }
    } else {
      console.error(
        `Error establishing a user to save customerId: ${customerId} and subscription id: ${subscriptionId}`
      )
    }
  }

  return { state, handleSignOut, handleClearError, handleSubscription }
}

export default useAmplifyAuth
