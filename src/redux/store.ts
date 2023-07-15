import { AnyAction, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { deviceSlice } from "./device/deviceSlice";
import { serviceSlice } from "./service/serviceSlice";
import { progressiveSlice } from "./progressive/progressiveSlice";
import { authManagementSlice } from "./authManagement/authManagementSlice";
import { roleManagementSlice } from "./roleManagement/roleManagementSlice";
import { noteUserManagementSlice } from "./userLogManagement/noteUserSlice";

export const store = configureStore({
  reducer: {
    firestoreServiceData: serviceSlice.reducer,
    firestoreDeviceData: deviceSlice.reducer,
    firestoreProgressiveData: progressiveSlice.reducer,
    firestoreAuthManagementData: authManagementSlice.reducer,
    firestoreRoleManagementData: roleManagementSlice.reducer,
    firestoreNoteUserManagementData: noteUserManagementSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, null, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
