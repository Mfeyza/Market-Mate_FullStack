//burada async isteklerimizi toparlayıp yazıyoruz (3.ders)

import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, loginSuccess,registerSuccess ,logoutSuccess} from "../features/authSlice";
import { useDispatch , useSelector} from "react-redux";
import useAxios from "./useAxios"

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  const { axiosWithToken, axiosPublic } = useAxios()
  const login = async (userInfo) => {
    dispatch(fetchStart());

    try {
      //!datayı dest ettik aşağıda responsta data.data yazmamak için
      const { data } = await axiosPublic.post("/auth/login/",
        userInfo //buraya veri vermemiz gerek
        //apiden gelen veriyi loginsucces e pas geç burdak veri payload a gidicek ordaki user ı okumak istiyorum verinin içindeki userın içindeki username
      );
      toastSuccessNotify("login işlemi başarılı");
      dispatch(loginSuccess(data));
      console.log(data); //veriyi global state e aktarıp heryerde kullanmalıyız
      navigate("/stock");
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
        navigate("/stock")


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

//burada custom hook yapmalıyız neden?burası pure js react componenti değil hooklar use ile başlamak zorunda
//hooklar component sayılmaz içerisinde birden fazla fonksiyon olabilir. bunun içinde de başka hooklar gerekiyo bu js dosyasını custom hook a benzettik içinde jsx barındırmak best practise değil  fonksiyonları yaz return ile dışarıya aç daha sonra hook u import et hooktan fonmksiyonu çıkart
