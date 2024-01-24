//burada async isteklerimizi toparlayıp yazıyoruz (3.ders)

import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, loginSuccess,registerSuccess ,logoutSuccess} from "../features/authSlice";
import { useDispatch } from "react-redux";
import useAxios from "./useAxios"

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { axiosWithToken, axiosPublic } = useAxios()
  const login = async (userInfo) => {
    dispatch(fetchStart());

    try {
     
      const { data } = await axiosPublic.post("/auth/login/",
        userInfo
        
      );
      toastSuccessNotify("Login process successful");
      dispatch(loginSuccess(data));
      console.log(data); 
      navigate("/redirecting");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login process unsuccessful");
    }
  };
  const register = async (registerInfo) => {
    dispatch(fetchStart());
    try {
        const {data}=await axiosPublic.post("/users/",  registerInfo)

        toastSuccessNotify("Register process successful");
        dispatch(registerSuccess(data));
        console.log(data);
        navigate("/redirecting")


    } catch (error) {
        dispatch(fetchFail());
        toastErrorNotify("Register process unsuccessful");
    }
  };
  const logout = async () => {
    try {
        
      await axiosWithToken("/auth/logout");
      toastSuccessNotify("Logout process successful");
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Logout process unsuccessful");
    }
  };
  return { login, register, logout };

};
export default useAuthCalls;


