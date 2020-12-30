import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {}

const store = createStore(
    combineReducers({
        locale(state = {}, { type }) {
            return state;
        }
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
