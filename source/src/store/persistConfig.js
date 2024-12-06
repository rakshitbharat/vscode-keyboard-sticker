import storage from "redux-persist/lib/storage";

export const persistConfig = {
  key: "root",
  storage,
  whitelist: ["selectedOS", "selectedConfig"], // Persist specific state fields
};
