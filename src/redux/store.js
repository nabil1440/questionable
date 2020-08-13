import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

//Reducers
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
	user: userReducer,
	ui: uiReducer,
	data: dataReducer
});

const store = createStore(
	reducers,
	initialState,
	compose(
		applyMiddleware(...middleware)
	)
);

export default store;
