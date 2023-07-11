import { Action, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

//firebase
import firebase from "firebase/compat/app";
import { message } from "antd";

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

export const { setData } = serviceSlice.actions;

interface ServiceData {
  progressiveId: number;
  id: string;
  codeService: string;
  nameService: string;
  description: string;
}

export const getService =
  (): ThunkAction<void, RootState, null, Action<string>> => {
    return async (dispatch) => {
      try {
        const serviceRef = firebase.firestore().collection("services");
        const snapshot = await serviceRef.get();
  
        const serviceData = snapshot.docs.map((doc) => {
          const service = doc.data() as ServiceData;
          service.id = doc.id;
          return service;
        });
  
        dispatch(setData(serviceData));
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch service data.");
      }
    };
  }
  

export const createService =
  (
    newService: ServiceData,
    isAutoIncrement: boolean
  ): ThunkAction<void, RootState, null, Action<string>> => {
    return async (dispatch) => {
      try {
        const serviceCollection = firebase.firestore().collection("services");
  
        // Lấy dữ liệu dịch vụ cuối cùng
        const snapshot = await serviceCollection
          .orderBy("progressiveId", "desc")
          .limit(1)
          .get();
        const lastService = snapshot.docs[0]?.data() as ServiceData;
  
        // Tính toán progressiveId
        let progressiveId = lastService?.progressiveId || 200000;
        if (isAutoIncrement) {
          progressiveId++;
        }
  
        // Thêm dịch vụ mới vào cơ sở dữ liệu
        await serviceCollection.add({
          ...newService,
          progressiveId,
        });
  
        // Thông báo thành công
        message.success("Thêm dịch vụ thành công!");
  
        // Dispatch action để cập nhật lại danh sách dịch vụ
        dispatch(getService());
      } catch (error) {
        console.error(error);
        message.error("Đã xảy ra lỗi khi thêm dịch vụ.");
      }
    };
  }
  



  interface UpdateServicePayload {
    id: string;
    data: ServiceData;
  }
  
  export const updateService =
    (
      payload: UpdateServicePayload
    ): ThunkAction<void, RootState, null, Action<string>> =>
    async () => {
      const { id, data } = payload;
      const serviceRef = firebase.firestore().collection("services").doc(id);
  
      try {
        await serviceRef.update(data);
        message.success("Service updated successfully!");
      } catch (error) {
        console.error("Error updating service:", error);
        message.error("Failed to update service.");
      }
    };