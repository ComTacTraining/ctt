import { useState, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { UserContext } from '../components/Auth/UserContext';
import { updateUserPreferences } from '../store/actions/user'

const LoadUserPreferences = () => {
    const { user, isMember, isAdmin, handleUserPreferences, isLoading } = useContext(UserContext);
    const dispatch = useDispatch()

    
    useEffect(() => {
        if(!isLoading && user) {
            let initialUserState = {
            dispatchCenter: user.attributes['custom:dispatch'] ? user.attributes['custom:dispatch'] : 'Dispatch',
            firstOnScene: user.attributes['custom:firstOnScene'] ? user.attributes['custom:firstOnScene'] : 'Engine 1',
            incomingCommandOfficer: user.attributes['custom:inCommandOfficer'] ? user.attributes['custom:inCommandOfficer'] : 'Battalion 1',
            alarm1: user.attributes['custom:alarm1'] ? user.attributes['custom:alarm1'].split(",") : [
                'Engine 1',
                'Engine 2',
                'Engine 3',
                'Truck 1',
                'Truck 2',
                'Battalion 1'
            ],
            alarm2: user.attributes['custom:alarm2'] ? user.attributes['custom:alarm2'].split(",") : [
                'Engine 21',
                'Engine 22',
                'Engine 23',
                'Truck 21',
                'Truck 22',
                'Battalion 2'
            ],
            alarm3: user.attributes['custom:alarm3'] ? user.attributes['custom:alarm3'].split(",") : [
                'Engine 31',
                'Engine 32',
                'Engine 33',
                'Truck 31',
                'Truck 32',
                'Battalion 3'
            ],
            showTips: user.attributes['custom:tips'] ? user.attributes['custom:tips'] === 'true' : true
            }

            dispatch(updateUserPreferences(initialUserState));
        }
        
    }, [isLoading]);
    return (
        <></>
    );
};

export default LoadUserPreferences;

