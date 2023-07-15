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
import { DocumentData } from "@firebase/firestore";

export const roleManagementSlice = createSlice({
  name: "role",
  initialState: { data: [] },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.map((roleManagement: any) => ({
        ...roleManagement,
        service: roleManagement.service, // Store the ID of the role instead of the DocumentReference
      }));
    },
  },
});

export const { setData } = roleManagementSlice.actions;

interface RoleManagementData {
  id: string;
  nameRole: string;
  description: string;
  userNumber: number;
}

export const getRoleManagement =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch: ThunkDispatch<RootState, null, Action<string>>) => {
    try {
      const roleManagementRef = firebase.firestore().collection("roles");

      const roleManagementSnapshot = await roleManagementRef.get();

      const roleManagementData = roleManagementSnapshot.docs.map((doc) => {
        const roleManagement = doc.data() as RoleManagementData;
        roleManagement.id = doc.id;
        return roleManagement;
      });

      dispatch(setData(roleManagementData));
    } catch (error) {
      message.error("Failed to fetch role management data");
    }
  };


export const createRoleManagement =
  (role: RoleManagementData): ThunkAction<void, RootState, null, any> =>
  async (dispatch) => {
    try {
      await firebase.firestore().collection("roles").add({
        nameRole: role.nameRole,
        description: role.description,
       
      });

      window.location.href = "/roleManagement"
      dispatch(getRoleManagement());
    
    } catch (error) {
      console.error(error);
    }
  };

export const updateRoleManagement =
  (
    id: string,
    role: any
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection("roles")
        .doc(id)
        .update({
          ...role,
        });
      dispatch(getRoleManagement);
    } catch (error) {
      console.log(error);
    }
  };

