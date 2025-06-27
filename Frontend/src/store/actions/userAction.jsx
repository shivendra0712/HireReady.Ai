import { currentUserService, deleteService, logInService, logOutService, registerService, updateService } from "../../API/authService";
import { loginUser, logoutUser } from "../reducers/userSlice";

export const asyncCurrentUser = () => async (dispatch, getState) => {
  
  const { user } = await currentUserService();
  
  dispatch(loginUser(user));
  const { userReducer } = getState();
    console.log(userReducer);
  console.log('Current User');

}

export const asyncRegister = (data) => async (dispatch, getState) => {

  const res = await registerService(data)
  console.log('user Registered');

};

export const asyncLogIn = (data) => async (dispatch, getState) => {

  const res = await logInService(data);
  console.log('login res ---> ', res)
  dispatch(asyncCurrentUser());
  console.log('User Login');
}

export const asyncUpdate = (data) => async (dispatch, getState) => {

  await updateService(data);
  dispatch(asyncCurrentUser());
  console.log('User Updated Sucessfully');
}

export const asyncDelete = (data) => async (dispatch, getState) => {
  console.log("data in delete --->",data);

  await deleteService(data);
  dispatch(logoutUser());
  console.log('User Deleted Successfully');
}

export const asyncLogOut = () => async (dispatch, getState) => {

  const res = await logOutService();
  dispatch(logoutUser());
  console.log('User Logout');
}





