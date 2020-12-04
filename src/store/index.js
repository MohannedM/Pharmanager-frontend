import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducers from './reducers/auth';
import medicinesReducers from './reducers/medicines';
import ordersReducers from './reducers/orders'
import cartReducers from './reducers/cart';
import createReduxSagaMiddleware from 'redux-saga';
import { rootAuthSaga, rootMedicineSaga, rootOrdersSaga, rootCartSaga } from './sagas';

const sagaMiddleware = createReduxSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducers,
  medicines: medicinesReducers,
  orders: ordersReducers,
  cart: cartReducers
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootAuthSaga);
sagaMiddleware.run(rootMedicineSaga);
sagaMiddleware.run(rootOrdersSaga);
sagaMiddleware.run(rootCartSaga);

export default store;