import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducers from './reducers/auth';
import medicinesReducers from './reducers/medicines';
import ordersReducers from './reducers/orders';
import createReduxSagaMiddleware from 'redux-saga';
import { rootAuthSaga, rootMedicineSaga, rootOrdersSaga } from './sagas';

const sagaMiddleware = createReduxSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducers,
  medicines: medicinesReducers,
  orders: ordersReducers
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootAuthSaga);
sagaMiddleware.run(rootMedicineSaga);
sagaMiddleware.run(rootOrdersSaga);

export default store;