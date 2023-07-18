import {
  Action,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { message } from "antd";

//firebase
import firebase from "firebase/compat/app";

export const noteUserManagementSlice = createSlice({
  name: "noteUser",
  initialState: { data: [] },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.map((noteUser: any) => ({
        ...noteUser,
        service: noteUser.service, // Store the ID of the role instead of the DocumentReference
      }));
    },
  },
});

export const { setData } = noteUserManagementSlice.actions;

interface NoteUserData {
  userName: string;
  timeAction: string;
  ipAddress: string;
  action: string;
}

export const getNoteUser =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch) => {
    try {
      const serviceRef = firebase.firestore().collection("noteUsers");
      const snapshot = await serviceRef.get();

      const serviceData = snapshot.docs.map(async (doc) => {
        const service = doc.data() as NoteUserData;
        
        return service;
      });
      const resolvedServiceData = await Promise.all(serviceData);
      dispatch(setData(resolvedServiceData));
    } catch (error) {
      message.error("Failed to fetch role management data");
    }
  };
