import { createSlice } from "@reduxjs/toolkit"

const initialState={
  user:"",
  loading:"false", //ikisini baştan false a kurmak daha mantıklı hataları engeller
  error:"false",
  token:"", //token ı saklaman gerek api isteği attığında dönen token ı sakla
}

const authSlice = createSlice({
  name: "auth",

  initialState: {},
  reducers: {
    fetchStart:(state)=>{
      state.loading=true

    },
    loginSuccess:(state, {payload})=>{
      state.loading=false
      state.user=payload.user.username
      state.token=payload.token

    },
    registerSuccess:(state, {payload})=>{
      state.loading=false
      state.user=payload.data.username
      state.token=payload.token
      


    },
    fetchFail:(state)=>{
      state.loading=false
      state.error=true
    },

    logoutSuccess:(state)=>{
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = false;

    }

  },
})

export const {fetchStart,loginSuccess,fetchFail,registerSuccess,logoutSuccess} = authSlice.actions
export default authSlice.reducer



//Token (Belirteç/Jeton): Tek kullanımlık yaşam süresi olan hashlenmiş yada şifrelenmiş bir bilgi içeren metinlerdir.
//API ile iletişimde kullanılan token, kimlik doğrulaması için kullanılan bir tür anahtardır. Genellikle API isteklerini yetkilendirmek ve doğrulamak için kullanılır. Bu token, istemcinin kimliğini doğrulamak ve izin verilen işlemleri gerçekleştirmesine olanak tanır. Tokenlar genellikle güvenlik amacıyla kullanılır ve API istemcisine özgüdür. Başka bir deyişle, doğru token olmadan API ile iletişim kurmak mümkün olmaz. Bu tokenler, genellikle API sağlayıcısı tarafından sağlanır ve yetkilendirme işlemlerinde kullanılır.