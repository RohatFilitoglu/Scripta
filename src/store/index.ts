import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { reducer as postReducer } from "./slice/post.slice"; // postStore.reducer -> postReducer

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const rootReducer = combineReducers({
  postStore: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, 
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
