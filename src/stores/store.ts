import type { Action, ThunkAction } from '@reduxjs/toolkit';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';

import type { GlobalState } from './globalSlice';
import { globalSlice } from './globalSlice';
import storePersist from './storePersist';
import storeSessionPersist from './storeSessionPersist';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
});
const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });
export const PERSIST_KEY = 'moitruongxanh_tp';
export const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfiguredStore();
  }
  const persistSessionConfig = {
    key: `${PERSIST_KEY}sesstion`,
    whitelist: [],
    storage: storeSessionPersist,
    // transforms: [ // tạm thời comment phần mã hoá
    //   encryptTransform({
    //     secretKey: PERSIST_KEY,
    //     onError: function (error) {
    //       console.log('loi ma hoa', error)
    //       // Handle the error.
    //     },
    //   }),
    // ],
  };
  const persistConfig = {
    key: PERSIST_KEY,
    // whitelist: ['global'],
    storage: storePersist,
    // transforms: [ // tạm thời comment phần mã hoá
    //   encryptTransform({
    //     secretKey: PERSIST_KEY,
    //     onError: function (error) {
    //       console.log('loi ma hoa', error)
    //       // Handle the error.
    //     },
    //   }),
    // ],
  };
  const rootClientReducer = combineReducers({
    [globalSlice.name]: persistReducer(persistConfig, globalSlice.reducer),
  });

  // const persistedSesstionReducer: any = persistReducer(persistSessionConfig, rootReducer);

  const persistedReducer: any = persistReducer(
    persistSessionConfig,
    rootClientReducer,
  );

  const store: any = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });

  store.__persistor = persistStore(store);
  return store;
};
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapperStore = createWrapper(makeStore, { debug: false });

// type state redux
export interface RootState {
  [globalSlice.name]: GlobalState;
}
