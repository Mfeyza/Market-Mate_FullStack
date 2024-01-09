import axios from "axios"
import { useSelector } from "react-redux"

const useAxios = () => {
  const { token } = useSelector((state) => state.auth)

  const axiosWithToken = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: { Authorization: `Token ${token}` },
  })

  const axiosPublic = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
  })
  return { axiosWithToken, axiosPublic }
}

export default useAxios



//' Burada iki ana kısım var: useAuthCalls ve useAxios adında iki özel hook. Bu iki hook'un işlevlerini ve nasıl çalıştıkları

//! useAxios Hook'u
//' Bu hook, Axios kütüphanesini kullanarak iki farklı Axios instance'ını (axiosWithToken ve axiosPublic) oluşturur ve döndürür.

//' axiosWithToken: Bu instance, kullanıcının oturum açtığında elde ettiği token ile HTTP istek başlıklarını (headers) ayarlar. Bu, kimlik doğrulaması gerektiren API istekleri için kullanılır.
//' axiosPublic: Bu instance, kimlik doğrulaması gerektirmeyen genel API istekleri için kullanılır.
//' Her iki instance da ortam değişkeni (process.env.REACT_APP_BASE_URL) ile tanımlanan aynı baseURL'i kullanır.

//! useAuthCalls Hook'u
//' Bu hook, üç farklı işlevi (login, register, logout) içerir. Bu işlevler, kullanıcıların giriş yapması, kayıt olması ve çıkış yapması işlemlerini yönetir.

//' login: Bu fonksiyon, kullanıcı girişi için API'ye bir istek yapar. İstek başarılı olduğunda, kullanıcı bilgilerini Redux state'ine kaydeder ve kullanıcıyı /stock yoluna yönlendirir. Başarısız olduğunda bir hata mesajı gösterir.
//' register: Bu fonksiyon, yeni kullanıcı kaydı için API'ye bir istek yapar. İşlem başarılı olduğunda, kullanıcı bilgilerini Redux state'ine kaydeder ve /stock yoluna yönlendirir. Başarısız olduğunda bir hata mesajı gösterir.
//' logout: Bu fonksiyon, kullanıcının çıkış yapması için API'ye bir istek yapar. İşlem başarılı olduğunda, kullanıcının durumunu Redux state'inden siler ve ana sayfaya (/) yönlendirir.
//' Her üç fonksiyon da başlamadan önce Redux state'ine bir yükleme başladığını (fetchStart) bildirir ve işlem bittiğinde bu durumu günceller. Başarılı veya başarısız sonuçlar için toast bildirimleri gösterir.

//! Bu hook'lar, React ve Redux ile modern web uygulamalarında sıkça kullanılan yapısal örnekleri temsil eder. useAxios ile API isteklerinin yönetimi standartlaştırılırken, useAuthCalls ile kullanıcı işlemleri merkezi bir yerden yönetilir. Bu yaklaşım, kodun okunabilirliğini ve bakımını kolaylaştırır.