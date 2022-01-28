import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  FLUSH,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "./Contacts/contacts-reducers";

const persistConfig = {
  key: "contacts",
  storage,
};

const store = configureStore({
  reducer: {
    contacts: persistReducer(persistConfig, contactsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // devTools: process.env.NODE_ENV === "development", //Чтобы тулзы работали на GhPages
});

const persistor = persistStore(store);

export { store, persistor };
