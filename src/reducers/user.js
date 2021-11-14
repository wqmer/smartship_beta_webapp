
import {reducer as order} from './order'
import {reducer as saveOrder} from './saveOrder'
import {combineReducers} from 'redux'


const user = combineReducers({
    order,
    saveOrder
});

export default user
