import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducers from './reducers'

const initialState = {}

const store = createStore(
	rootReducers,
	initialState,
	applyMiddleware(thunk)
)

export default store;