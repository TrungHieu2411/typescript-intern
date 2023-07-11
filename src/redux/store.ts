import { configureStore } from "@reduxjs/toolkit";
// import { roleSlice } from "./deviceSlice";
// import { accountSlice } from "./accountSlice";
import { serviceSlice } from "./service/serviceSlice";
import { deviceSlice } from "./device/deviceSlice";
// import { ticketSlice } from "./ticketSlice";

export const store = configureStore({
  reducer: {
    // firestoreRoleData: roleSlice.reducer,
    // firestoreAccountData: accountSlice.reducer,
    firestoreServiceData: serviceSlice.reducer,
    firestoreDeviceData: deviceSlice.reducer,
    // firestoreTicketData: ticketSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
