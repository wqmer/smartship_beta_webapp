const initialState = {
      Name:'',
      Product:'',
      _id:''
}

export const actionTypes = {
    // PLACE_ONE_ORDER:"PLACE_ONE_ORDER",
    SAVE_ONE_ORDER: "SAVE_ONE_ORDER",
    DELETE_ONE_ORDER: "DELETE_ONE_ORDER",

};

export const actions = {
    // place_one_order: function (data) {
    //     return {
    //         type: actionTypes.PLACE_ONE_ORDER,
    //         data
    //     }
    // } ,
    save_one_order: function (data) {
        return {
            type: actionTypes.SAVE_ONE_ORDER,
            data
        }
    } ,

    delete_one_order: function (_id) {
        return {
            type: actionTypes.DELETE_ONE_ORDER,
            _id
        }
    }  ,
};


export function reducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}