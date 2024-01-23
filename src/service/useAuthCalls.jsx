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
      toastSuccessNotify("login işlemi başarılı");
      dispatch(loginSuccess(data));
      console.log(data); 
      navigate("/redirecting");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("login işlemi başarısız");
    }
  };
  const register = async (registerInfo) => {
    dispatch(fetchStart());
    try {
        const {data}=await axiosPublic.post("/users/",  registerInfo)

        toastSuccessNotify("register işlemi başarılı");
        dispatch(registerSuccess(data));
        console.log(data);
        navigate("/redirecting")


    } catch (error) {
        dispatch(fetchFail());
        toastErrorNotify("register işlemi başarısız");
    }
  };
  const logout = async () => {
    try {
        
      await axiosWithToken("/auth/logout");
      toastSuccessNotify("Logout işlemi başarılı");
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Logout işlemi başarısız");
    }
  };
  return { login, register, logout };

};
export default useAuthCalls;


