// src/redux/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuActionFlags, RoleInfo, User } from "@/src/types/authType";

interface AuthState {
  user: User | null;
  token: string | null;
  roleInfo: RoleInfo | null;
  permissions: Record<string, MenuActionFlags> | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  roleInfo: null,
  permissions: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    storeRoleContext: (
      state,
      action: PayloadAction<{
        role: RoleInfo;
        permissions: Record<string, MenuActionFlags>;
      }>,
    ) => {
      state.roleInfo = action.payload.role;
      state.permissions = action.payload.permissions;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.roleInfo = null;
      state.permissions = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { storeUser, logout, setToken, storeRoleContext } =
  authSlice.actions;
export default authSlice.reducer;
