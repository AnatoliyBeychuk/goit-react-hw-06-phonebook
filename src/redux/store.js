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
  blacklist: ["filter"],
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
  devTools: true, //Чтобы тулзы работали на GhPages //process.env.NODE_ENV === "development"
});

const persistor = persistStore(store);

export { store, persistor };
