import { PREFERENCE_CHANGE, PREFERENCE_INIT } from "./types";

export const preferenceChangeSuccess = (key, value) => {
  const payload = {};
  payload[key] = value;
  return {
    type: PREFERENCE_CHANGE,
    payload
  };
};

export const preferenceInitSuccess = () => ({
  type: PREFERENCE_INIT,
  payload: {}
});

export const toggleExpandedMenu = () => (dispatch, getState) => {
  const { preferences } = getState();
  dispatch(preferenceChangeSuccess("expandedMenu", !preferences.expandedMenu));
};
