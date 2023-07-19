import {
  Action,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
//firebase
import firebase from "firebase/compat/app";
import moment from "moment";

export const serviceSlice = createSlice({
  name: "service",
  initialState: { data: [] },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.map((service: any) => ({
        ...service,
        service: service.service, // Store the ID of the role instead of the DocumentReference
      }));
    },
  },
});

interface ServiceData {
  id: string;
  codeService: string;
  nameService: string;
  description: string;
}

export const { setData } = serviceSlice.actions;

export const getService =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch) => {
    try {
      const serviceRef = firebase.firestore().collection("services");
      const snapshot = await serviceRef.get();

      const serviceData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const service = doc.data() as ServiceData;
          service.id = doc.id;
          return service;
        })
      );

      dispatch(setData(serviceData));
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

export const createService =
  (newService: ServiceData): ThunkAction<void, RootState, null, any> =>
  async (dispatch) => {
    try {
      await firebase.firestore().collection("services").add({
        codeService: newService.codeService,
        nameService: newService.nameService,
        description: newService.description,
        isActive: "Hoạt động",
        
      });
      window.location.href = "/service"
      dispatch(getService());
    
    } catch (error) {
      console.error(error);
    }
  };

export const updateService =
  (
    id: string,
    data: any
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection("services")
        .doc(id)
        .update({
          ...data,
        });
      dispatch(getService);
    } catch (error) {
      console.log(error);
    }
  };
