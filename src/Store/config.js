import {combineReducers, createStore} from "redux"
import * as reducers from './reducers'

const  rootReducer = combineReducers({
    //* key và value giống nhau thì bỏ key luôn
    ...reducers,
});

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());