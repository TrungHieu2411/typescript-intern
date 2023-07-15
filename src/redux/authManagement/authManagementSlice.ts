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
  
  export const authManagementSlice = createSlice({
    name: "authManagement",
    initialState: { data: [] },
    reducers: {
      setData: (state, action) => {
        state.data = action.payload.map((authManagement: any) => ({
          ...authManagement,
          service: authManagement.service, // Store the ID of the role instead of the DocumentReference
        }));
      },
    },
  });
  

export const { setData } = authManagementSlice.actions;

interface AuthManagementData {
    userName: string;
    id: string;
    fullName: string;
    phone: string;
    email: string;
    role: firebase.firestore.DocumentReference | null;
    isActive: string;
    password: string;
  }

  interface AuthManagementDataAdd {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    role: string; // Thay đổi kiểu dữ liệu của role thành DocumentReference
    isActive: string;
    userName: string;
    image: string;
    password: string;
    confirmPassword: string;
  }
export const getAuthMangement =
  (): ThunkAction<
    void,
    RootState,
    null, // Thay đổi từ `undefined` thành `null` ở đây
    Action<string>
  > =>
  async (dispatch) => {
    try {
        const authManagementRef = firebase
        .firestore()
        .collection("authManagements");
      const snapshot = await authManagementRef.get();
      const authManagmentData = 
        await Promise.all(
          snapshot.docs.map(async (doc) => {
            const authManagement = doc.data() as AuthManagementData;
            authManagement.id = doc.id;

            const roleRef = authManagement.role;

            if (
              roleRef &&
              roleRef instanceof firebase.firestore.DocumentReference
            ) {
              const roleDoc = await roleRef.get();
              if (roleDoc.exists) {
                const roleData = roleDoc.data();
                if (roleData && roleData.nameRole) {
                  const roleName = roleData.nameRole;
                  authManagement.role = roleName;
                }
              }
            }

            return authManagement;
          })
        )

      dispatch(setData(authManagmentData));
    } catch (error) {
      console.log(error);
    }
  };


export const createAuthManagement =
(authManagement: AuthManagementDataAdd): ThunkAction<void, RootState, null, any> =>
async (dispatch) => {
  try {
    const authManagementCollection = firebase
    .firestore()
    .collection("authManagements");

  // Lấy DocumentReference của vai trò (role)
  const roleRef = firebase
    .firestore()
    .doc(`roles/${authManagement.role}`);

    await authManagementCollection.doc().set({
      fullName: authManagement.fullName,
      phone: authManagement.phone,
      email: authManagement.email,
      role: roleRef, // Lưu DocumentReference vào Firestore
      isActive: authManagement.isActive,
      userName: authManagement.userName,
      password: authManagement.password,
      image: "",
    });

    window.location.href = "/authManagement"
    dispatch(getAuthMangement());
  
  } catch (error) {
    console.error(error);
  }
};

export const updateAuthManagement =
(
  id: string,
  auth: any
): ThunkAction<void, RootState, null, Action<string>> =>
async (dispatch) => {
  try {
    await firebase
      .firestore()
      .collection("authManagements")
      .doc(id)
      .update({
        ...auth,
      });
    dispatch(getAuthMangement);
  } catch (error) {
    console.log(error);
  }
};

