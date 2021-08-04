import { useUser } from '@/hooks/useUser'
import { updateUserPreferences } from '@/store/actions/user'
import * as React from 'react'
import { useDispatch } from 'react-redux'

const LoadUserPreferences = () => {
  const { user, isLoading } = useUser()
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (!isLoading && user) {
      const initialUserState = {
        dispatchCenter: user.attributes['custom:dispatch']
          ? user.attributes['custom:dispatch']
          : 'Dispatch',
        firstOnScene: user.attributes['custom:firstOnScene']
          ? user.attributes['custom:firstOnScene']
          : 'Engine 1',
        incomingCommandOfficer: user.attributes['custom:inCommandOfficer']
          ? user.attributes['custom:inCommandOfficer']
          : 'Battalion 1',
        alarm1: user.attributes['custom:alarm1']
          ? JSON.parse(user.attributes['custom:alarm1'])
          : [
              'Engine 1',
              'Engine 2',
              'Engine 3',
              'Truck 1',
              'Truck 2',
              'Battalion 1'
            ],
        alarm2: user.attributes['custom:alarm2']
          ? JSON.parse(user.attributes['custom:alarm2'])
          : [
              'Engine 21',
              'Engine 22',
              'Engine 23',
              'Truck 21',
              'Truck 22',
              'Battalion 2'
            ],
        alarm3: user.attributes['custom:alarm3']
          ? JSON.parse(user.attributes['custom:alarm3'])
          : [
              'Engine 31',
              'Engine 32',
              'Engine 33',
              'Truck 31',
              'Truck 32',
              'Battalion 3'
            ],
        showTips:
          user.attributes['custom:tips'] &&
          user.attributes['custom:tips'] === 'true'
            ? true
            : false
      }

      dispatch(updateUserPreferences(initialUserState))
    }
  }, [isLoading])
  return <></>
}

export default LoadUserPreferences
