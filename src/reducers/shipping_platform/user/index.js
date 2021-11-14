import {combineReducers} from 'redux'
import {reducer as order} from './order'
import {reducer as service} from './service'
const initialState = {
    user_info: {}
};

export const actionsTypes = {
    USER_LOGIN: "USER_LOGIN",
    USER_LOGOUT: "USER_LOGOUT",
    USER_REGISTER: "USER_REGISTER",
    RESPONSE_USER_INFO: "RESPONSE_USER_INFO",
    USER_AUTH: "USER_AUTH"
};

export const actions = {
    get_login: function (data) {
        return {
            type: actionsTypes.USER_LOGIN,
            data
        }
    },
    get_logout: function () {
        return {
            type: actionsTypes.USER_LOGOUT,
        }
    },
    get_register: function (data) {
        return {
            type: actionsTypes.USER_REGISTER,
            data
        }
    },
    user_auth: function () {
        return {
            type: actionsTypes.USER_AUTH,
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.RESPONSE_USER_INFO:
            return {
                ...state, user_info: action.data
            };
        default:
            return state
    }
}



const user =  combineReducers({
    account: reducer,
    order,
    service,
})


export default user