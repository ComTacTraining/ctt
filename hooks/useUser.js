import useAmplifyAuth from '@/hooks/useAmplifyAuth'
import * as React from 'react'

export const UserContext = React.createContext()

export const UserContextProvider = (props) => {
  const {
    state: { user, isLoading, isMember, isAdmin, errorMessage },
    handleSignOut,
    handleClearError,
    handleSubscription,
    handleUserPreferences
  } = useAmplifyAuth()

  const value = React.useMemo(
    () => ({
      user,
      isLoading,
      isMember,
      isAdmin,
      errorMessage,
      handleSignOut,
      handleClearError,
      handleSubscription,
      handleUserPreferences
    }),
    [
      user,
      isLoading,
      isMember,
      isAdmin,
      errorMessage,
      handleSignOut,
      handleClearError,
      handleSubscription,
      handleUserPreferences
    ]
  )
  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}
