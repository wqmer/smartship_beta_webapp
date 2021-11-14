
import merge from 'lodash/merge'
import { combineReducers } from 'redux'
const initialState = {
    tracking_result: undefined
}


export const actionTypes = {
    GET_TRACKING: "GET_TRACKING",
    SET_RESULT: "SET_RESULT",
    RESET_TRACKING_RESULT: "RESET_TRACKING_RESULT"
};

export const actions = {
    get_tracking: function (data) {
        return {
            type: actionTypes.GET_TRACKING,
            data
        }
    },
    reset_tracking_result: function () {
        return {
            type: actionTypes.RESET_TRACKING_RESULT,
        }
    },
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_RESULT:
            return merge({}, state, action.data)
        case actionTypes.RESET_TRACKING_RESULT:
            return  {
                ...state,
                tracking_result : undefined
            }
        default:
            return state;
    }
}

export default reducer
