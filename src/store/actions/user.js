export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const SET_LOGGED_IN_USER = "SET_LOGGED_IN_USER";
export const IS_MEMBER = "IS_MEMBER";
export const UPDATE_USER_PREFERENCES = "UPDATE_USER_PREFERENCES";
export const TOGGLE_TIPS = "TOGGLE_TIPS";
export const MICROPHONE_ACCESS_GRANTED = "MICROPHONE_ACCESS_GRANTED";
export const TOGGLE_FULLSCREEN = "TOGGLE_FULLSCREEN";

export const isAuthenticated = () => {
  return { type: IS_AUTHENTICATED };
};

export const setLoggedInUser = data => {
  return {
    type: SET_LOGGED_IN_USER,
    payload: {
      username: data.username,
      email: data.email
    }
  };
};

export const isMember = () => {
  return { type: IS_MEMBER };
};

export const toggleTips = () => {
  return { type: TOGGLE_TIPS };
};

export const updateUserPreferences = data => {
  return {
    type: UPDATE_USER_PREFERENCES,
    payload: {
      dispatchCenter: data.dispatchCenter,
      firstOnScene: data.firstOnScene,
      incomingCommandOfficer: data.incomingCommandOfficer,
      alarm1: data.alarm1,
      alarm2: data.alarm2,
      alarm3: data.alarm3,
      showTips: data.showTips
    }
  };
};

export const microphoneAccessGranted = () => {
  return { type: MICROPHONE_ACCESS_GRANTED };
};

export const toggleFullscreen = () => {
  return { type: TOGGLE_FULLSCREEN };
};
