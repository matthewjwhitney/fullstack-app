/* eslint-disable import/prefer-default-export */
import { PREFERENCE_CHANGE, PREFERENCE_INIT } from "../actions/types";

const defaultPreferences = {
  expandedMenu: false
};

export const preferences = (state = defaultPreferences, action) => {
  switch (action.type) {
    case PREFERENCE_INIT:
      return { ...defaultPreferences };
    case PREFERENCE_CHANGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
