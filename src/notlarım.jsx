import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import image from "../assets/result.svg"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import { Formik , Form} from "formik"
import { object, string } from 'yup';


const Login = () => {
 //! yup kısmı
const  loginSchema = object({  //'bu objenin keyleri formikte kulandığımız keyler bizim sadece iki tane var email ve password bize lazım olan 
  email: string().email("lütfen geçerli bir email veriniz").required("Email girişi zorunludur"), //'bir şey yazdıktan sonra geliyr ama dokunup çıkktığımda gelmeli
  password:string().required("şifre zorunludur").min(8,"şifre en az 8 karakter içermelidir").max(16 ,"şifre an fazla 16 karakter içerebilir").matches(/\d+/, "şifre en az 1 rakam içermelidir" ).matches(/[a-z]/,"şifre en az 1 küçük karakter içermelidir").matches(/[A-Z]/, "Şifre en az bir büyük karakter içermelidir")
});
    return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>
          <Formik 
          //! formik componenti içerisine 4 tane prop alır bunlardan en önemllisi initial values inputların isimlerini buraya veriyorsun bunlar state oluyor kendisi oluşturuyor formiğin 
          initialValues={{email:"", password:""}} //!formumun statelerini başlangıç değerlerini veriyorum
          validationSchema={loginSchema} //! 2. si gördüğümüz hataları çıkartmamızı sağlayan kısım
          onSubmit={(values,actions)=>{ //'setsubmitting,resetform olarak dest edebilirsin  //! form submit edilidğinde ne olacak, onsubmit bi fonksiyon alır call back ilk parametresi ise valuesdır stateleri barındıran objedir values values.email ile erişirsinn. 2. si de diğer işlemler
            //*TODO login(post) isteği //' burada post isteği atmalıyız api ye. LOgin neden post veri gönderiyoruz apiye bu yüzden post.
            //* navigasyon
            //* veriler gloal state e aktarılır
            //* tostify yapılabilir
            actions.resetForm() //! formu siler hazır fpnksiyon 
            actions.setSubmitting(false)  //'form submit edildiğinde tomatik trueya kuruluyor (2.ders) isSubmiting = bu form submit edilirken formik bizim için truye kuruyor kullanmak zorunda değiliz nerede kullanırız submit edilirken spinner koyarsın spinner döner mesela submit butonunu pasif yaparsın disabled mesela
          }}
          
          >
           {({handleChange,values, touched,errors,handleBlur})=> <Form> //!jsx alanındayız süslü yaz call back aç değişkenlerini koyç dest edip aşağıdakullan
            //'touched dokunuldu mu ona göre hata verecek' error formun içinde validationun için de taşınıyor bu reuired mesela hata mesajı yollucak error ile geliyor buna error.email error.passwor diye ulaşabilirim
            </Form>} 

            
          

          <Box
        
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              name="email"
              id="email"
              type="email"
              variant="outlined"
              value={values.email} //2.aşama
              onChange={handleChange} //'bunlar formikin yapısında hali hazırda yazılmış dest edip getiriyorum
              onBlur={handleBlur} //!ayrıldığımda
              error={touched.email && Boolean(errors.email)} //'mesela bi valudasyon yaptık hata meajı verdik o errorun içine gelecek nasıl gelcek errors bi obje içine email ve pasword almış erors.email diye erişebilirim ya da errors.password diye erişebilirim.error true olursa helpertexti ekrana basar boolen hale getirmen gerek  var mı yok mu trıe false true ise helpertexti bas
              helperText={errors.email}  //'helper text error de saklanıyor errorsun içindeki email mesajını bas
            />
            {/* error ve helperText propertyleri Textfield componentine ait propertyler. */}
            {/* // mui textfield kullanmadığımzda hata mesajını göstermek için  */}
              {/* <span>{touched.username && errors.username}</span> */}
            <TextField
              label="password"
              name="password"
              id="password"
              type="password"
              variant="outlined"
              value={values.password} //2.aşama
              onChange={handleChange}
            />
            <Button variant="contained" type="submit"> //!bunun disable yapabiliriz submit sırasında falam
              Submit
            </Button>
          </Box>
          </Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login



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



//burada custom hook yapmalıyız neden?burası pure js react componenti değil hooklar use ile başlamak zorunda
//hooklar component sayılmaz içerisinde birden fazla fonksiyon olabilir. bunun içinde de başka hooklar gerekiyo bu js dosyasını custom hook a benzettik içinde jsx barındırmak best practise değil  fonksiyonları yaz return ile dışarıya aç daha sonra hook u import et hooktan fonmksiyonu çıkart