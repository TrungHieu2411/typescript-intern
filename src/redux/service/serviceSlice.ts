import { AnyAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";
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


interface ServiceData {
  number: string;
  progressiveId: string;
  isActive: string;
  authManagementId: string;
  id: string;
  codeService: string;
  nameService: string;
  description: string;
}

export const { setData } = serviceSlice.actions;

export const getService = () => async (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>
) => {
  try {
    const serviceRef = firebase.firestore().collection("services");
    const snapshot = await serviceRef.get();

    const serviceData = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const service = doc.data() as ServiceData;
        service.id = doc.id;

        const progressiveId = service.progressiveId;
        if (progressiveId) {
          const progressiveRef = firebase
            .firestore()
            .collection("progressives")
            .where("number", "==", progressiveId);
          const progressiveSnapshot = await progressiveRef.get();

          if (!progressiveSnapshot.empty) {
            const progressiveData = progressiveSnapshot.docs[0].data();
            const authManagementId = progressiveData.authManagementId;

            if (authManagementId) {
              const authManagementRef = firebase
                .firestore()
                .collection("authManagements")
                .doc(authManagementId);
              const authManagementSnapshot = await authManagementRef.get();

              if (authManagementSnapshot.exists) {
                const authManagementData = authManagementSnapshot.data();
                if (authManagementData) {
                  const isActive = authManagementData.isActive;
                  service.isActive = isActive;
                }
              }
            }
          }
        }

        return service;
      })
    );

    dispatch(setData(serviceData));
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    message.error("Failed to fetch service data.");
  }
};