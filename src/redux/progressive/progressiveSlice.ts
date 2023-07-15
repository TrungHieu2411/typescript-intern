import {
  Action,
  ThunkAction,
  ThunkDispatch,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { message } from "antd";

//firebase
import firebase from "firebase/compat/app";

export const progressiveSlice = createSlice({
  name: "progressive",
  initialState: { data: [] },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.map((progressive: any) => ({
        ...progressive,
        service: progressive.service, // Store the ID of the role instead of the DocumentReference
      }));
    },
  },
});

interface ProgressiveData {
  id: string;
  number: string;
  nameCustomer: string;
  timeCreate: string;
  deadLineUsed: string;
  status: string;
  service: string;
  fullName: string;
  authManagementId: string;
  typeDevice: string;
  nameService:
    | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
    | string;
}

interface ServiceData {
  id: string;
  nameService: string;
}

interface DeviceData {
  id: string;
  typeDevice: string;
}

export const { setData } = progressiveSlice.actions;

export const getProgressive =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch: ThunkDispatch<RootState, null, Action<string>>) => {
    try {
      const progressiveRef = firebase.firestore().collection("progressives");
      const snapshot = await progressiveRef.get();

      const progressiveData = (
        await Promise.all(
          snapshot.docs.map(async (doc) => {
            const progressive = doc.data() as ProgressiveData;
            progressive.id = doc.id;

            const serviceRef = progressive.nameService;
            if (
              serviceRef !== null &&
              serviceRef instanceof firebase.firestore.DocumentReference
            ) {
              const serviceDoc = await serviceRef.get();
              if (serviceDoc.exists) {
                const serviceData = serviceDoc.data();
                if (serviceData && serviceData.nameService) {
                  const nameService = serviceData.nameService;
                  progressive.nameService = nameService;
                }
              }
            }

            const authManagementId = progressive.authManagementId;
            if (authManagementId) {
              // Fetch the associated device document
              const deviceRef = firebase
                .firestore()
                .collection("devices")
                .where("authManagementId", "==", authManagementId);
              const deviceSnapshot = await deviceRef.get();

              if (!deviceSnapshot.empty) {
                const deviceData = deviceSnapshot.docs[0].data();
                const typeDevice = deviceData.typeDevice;
                progressive.typeDevice = typeDevice;
              }
            }

            return progressive;
          })
        )
      ).sort((a, b) => Number(a.number) - Number(b.number)); // Sắp xếp theo STT tăng dần

      dispatch(setData(progressiveData));
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      message.error("Failed to fetch service data.");
    }
  };
