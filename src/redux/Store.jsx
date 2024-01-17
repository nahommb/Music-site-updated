import { configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import songReducer from "./songState";
import rootSaga from './saga/RootSaga';

const saga = createSagaMiddleware();
export const store = configureStore({
    reducer:{
     songs:songReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(saga)
  });

  saga.run(rootSaga);