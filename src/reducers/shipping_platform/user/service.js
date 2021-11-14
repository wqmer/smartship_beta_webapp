const initialState = [

]


export const actionTypes = {
    GET_SERVICE: "GET_SERVICE",
    RESET_SERVICE: "RESET_SERVICE",
    SET_SERVICE: "SET_SERVICE",

};

export const actions = {
    get_service: function (data) {
        return {
            type: actionTypes.GET_SERVICE,
            data
        }
    },
    reset_service: function () {
        return {
            type: actionTypes.RESET_SERVICE,
        }
    },
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_SERVICE:
            return action.data;
        case actionTypes.RESET_SERVICE:
            return initialState;
        default:
            return state;
    }
}
