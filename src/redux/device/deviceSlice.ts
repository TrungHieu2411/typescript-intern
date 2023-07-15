import {
  Action,
  ThunkAction,
  ThunkDispatch,
  createSlice,
} from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";
import { message } from "antd";
import { RootState } from "../store";

export const deviceSlice = createSlice({
  name: "device",
  initialState: { data: [] },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.map((device: any) => ({
        ...device,
        service: device.service, // Store the ID of the role instead of the DocumentReference
      }));
    },
  },
});

interface DeviceData {
  id: string;
  codeDevice: string;
  nameDevice: string;
  ipAddress: string;
  isActive: string;
  isConnected: string;
  service: string;
  typeDevice: string;
  authManagementId: string;
}

export const { setData } = deviceSlice.actions;

export const getDevice =
  (): ThunkAction<
    void,
    RootState,
    null, // Thay đổi từ `undefined` thành `null` ở đây
    Action<string>
  > =>
  async (dispatch) => {
    try {
      const deviceRef = firebase.firestore().collection("devices");
      const snapshot = await deviceRef.get();

      const deviceData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const device = doc.data() as DeviceData;
          device.id = doc.id;

          const authManagementId = device.authManagementId;
          if (authManagementId) {
            const authManagementRef = firebase
              .firestore()
              .collection("authManagements")
              .where("authManagementId", "==", authManagementId);
            const authManagementSnapshot = await authManagementRef.get();

            if (!authManagementSnapshot.empty) {
              const authManagementData = authManagementSnapshot.docs[0].data();
              const isActive = authManagementData.isActive;
              device.isActive = isActive;
            }
          }
          return device;
        })
      );

      dispatch(setData(deviceData));
    } catch (error) {
      console.log(error);
    }
  };

export const createDevice =
  (
    newDevice: DeviceData,
    authManagementInfo: { userName: string; password: string }
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
      // Kiểm tra thông tin đăng nhập
      const authManagementCollection = firebase
        .firestore()
        .collection("authManagements");
      const snapshot = await authManagementCollection
        .where("userName", "==", authManagementInfo.userName)
        .where("password", "==", authManagementInfo.password)
        .get();

      if (!snapshot.empty) {
        const matchingData = snapshot.docs[0].data();
        const authManagementId = matchingData.authManagementId;

        // Thực hiện thêm thiết bị và lưu trữ authManagementId
        const deviceCollection = firebase.firestore().collection("devices");
        const deviceRef = await deviceCollection.add({
          codeDevice: newDevice.codeDevice,
          nameDevice: newDevice.nameDevice,
          ipAddress: newDevice.ipAddress,
          isConnected: newDevice.isConnected,
          service: newDevice.service,
          authManagementId: authManagementId,
        });

        // Lấy ID của thiết bị vừa thêm
        const newDeviceId = deviceRef.id;

        // Cập nhật state trong Redux
        dispatch(
          setData([
            {
              id: newDeviceId,
              codeDevice: newDevice.codeDevice,
              nameDevice: newDevice.nameDevice,
              ipAddress: newDevice.ipAddress,
              isConnected: newDevice.isConnected,
              service: newDevice.service,
              authManagementId: authManagementId,
            },
          ])
        );

        // Hiển thị thông báo "Thiết bị đã được thêm thành công"
        message.success("Thiết bị đã được thêm thành công");
      } else {
        message.error("Tên đăng nhập hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      console.error("Failed to create device:", error);
    }
  };

export const updateDevice =
  (
    id: string,
    data: any,
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
        // Cập nhật thiết bị
        await firebase.firestore().collection("devices").doc(id).update({
          codeDevice: data.codeDevice,
          nameDevice: data.nameDevice,
          ipAddress: data.ipAddress,
          isConnected: data.isConnected,
          service: data.service,
          isActive: data.isActive,
        });
      
      // Cập nhật state trong Redux
      dispatch(getDevice);
    } catch (error) {
      console.log(error);
    }
  };
