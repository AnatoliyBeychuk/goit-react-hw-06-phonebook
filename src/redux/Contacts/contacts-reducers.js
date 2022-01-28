import { combineReducers, createReducer } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  changeFilter,
} from "../Contacts/contacts-actions";

const items = createReducer([], {
  [addContact]: (state, { payload }) => [...state, payload],
  [deleteContact]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer("", {
  [changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});
