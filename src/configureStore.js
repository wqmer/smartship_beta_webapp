import { createStore, applyMiddleware ,compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'
import rootSaga from './saga'

// const middleware = routerMiddleware(browserHistory)
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState = {}) {
      const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
      sagaMiddleware.run(rootSaga)
      return store
}
