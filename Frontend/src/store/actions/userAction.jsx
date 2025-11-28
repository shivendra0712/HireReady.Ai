import { currentUserService, deleteService, logInService, logOutService, registerService, updateFeedbackService, updateService } from "../../API/authService";
import { loginUser, logoutUser } from "../reducers/userSlice";

export const asyncCurrentUser = () => async (dispatch, getState) => {
  try {
    const { user } = await currentUserService();
    console.log("curr user->", user)
    dispatch(loginUser(user));
    const { userReducer } = getState();
    console.log(userReducer);
    console.log('Current User');
    return user; // Return user data for promise handling
  } catch (error) {
    console.error('Error fetching current user:', error);
    localStorage.removeItem('token'); // Remove invalid token
    throw error;
  }
}

export const asyncRegister = (data) => async (dispatch, getState) => {
  const res = await registerService(data)
  if(res.data.token){
    dispatch(asyncCurrentUser());
  }
  console.log('register res ---> ', res)
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

export const asyncUpdateFeedback = (data) => async (dispatch, getState) => {
  await updateFeedbackService(data);
  dispatch(asyncCurrentUser());
  console.log('User Feedback  Updated Sucessfully');
}

export const asyncDelete = (data) => async (dispatch, getState) => {
  console.log("data in delete --->",data);
  await deleteService(data);
  dispatch(logoutUser());
  console.log('User Deleted Successfully');
}

export const asyncLogOut = () => async (dispatch, getState) => {
  try {
    await logOutService();
    localStorage.removeItem('token');
    localStorage.removeItem('currentPath'); // Clear saved path
    dispatch(logoutUser());
    console.log('User logged out');
  } catch (error) {
    console.error('Logout error:', error);
  }
}
