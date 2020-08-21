export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const IS_MEMBER = 'IS_MEMBER';
export const UPDATE_USER_PREFERENCES = 'UPDATE_USER_PREFERENCES';
export const TOGGLE_TIPS = 'TOGGLE_TIPS';

export const isAuthenticated = () => {
  return { type: IS_AUTHENTICATED };
};

export const isMember = () => {
  return { type: IS_MEMBER };
};

export const toggleTips = () => {
  return { type: TOGGLE_TIPS };
};

export const updateUserPreferences = (data) => {
  return {
    type: UPDATE_USER_PREFERENCES,
    payload: {
      dispatchCenter: data.dispatchCenter,
      firstOnScene: data.payload.firstOnScene,
      incomingCommandOfficer: data.payload.incomingCommandOfficer,
      alarm1: data.payload.alarm1,
      alarm2: data.payload.alarm2,
      alarm3: data.payload.alarm3,
      showTips: data.payload.showTips,
    },
  };
};
