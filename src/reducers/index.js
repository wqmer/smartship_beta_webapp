
import {combineReducers} from 'redux'
import {reducer as file} from './handleFile'
import user from './user'
import shipping_platform_user from './shipping_platform/user'
import shipping_platform_single_order from './shipping_platform/single_order_form'
import shipping_platform_tool from './shipping_platform/tool'


const initialState = {
    isFetching: true,
    isLoading: false,
    status_code: 0,
    message : '',
};

export const actionsTypes = {   
    FETCH_START: "FETCH_START",
    FETCH_END: "FETCH_END",
    LOAD_START: "LOAD_START",
    LOAD_END: "LOAD_END",
    SET_MESSAGE:"SET_MESSAGE",
};

export const actions = {
    set_message: function () {
        return {
            type: actionsTypes.SET_MESSAGE,
            messageContent :''
        }
    },
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.FETCH_START:
            return {
                ...state, isFetching: true
            };
        case actionsTypes.FETCH_END:
            return {
                ...state, isFetching: false
            };
        case actionsTypes.LOAD_START:
            return {
                ...state, isLoading: true
            };
        case actionsTypes.LOAD_END:
            return {
                ...state, isLoading: false
            };

        case actionsTypes.SET_MESSAGE:
            return {
                ...state,
                message: action.messageContent,
                status_code: action.status_code
            };

        default:
            return state
    }
}


export default combineReducers({
       globalState: reducer,
    //    file,
    //    user,
       shipping_platform_user,
       shipping_platform_single_order,
       shipping_platform_tool
})
