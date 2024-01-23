import {
  fetchStart,
  fetchFail,
  getStockSuccess,
  getProPurBranFirmSuccess,
} from "../features/stockSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";

const useStockCalls = () => {
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  const getStocks = async (url = "firms") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`/${url}/`);
      const apiData = data.data;
      dispatch(getStockSuccess({ apiData, url }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} bilgileri çekilemedi.`);
    }
  };

  const getProPurBranFirm = async () => {
    dispatch(fetchStart());
    try {
      const [products, purchases, brands, firms] = await Promise.all([
        axiosWithToken("/products/"),
        axiosWithToken("/purchases/"),
        axiosWithToken("/brands/"),
        axiosWithToken("/firms/"),
      ]);
      dispatch(
        getProPurBranFirmSuccess([
          products?.data?.data,
          purchases?.data?.data,
          brands?.data?.data,
          firms?.data?.data,
        ])
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const deleteStock = async (url = "firms", id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/${url}/${id}/`);
      toastSuccessNotify(`${url} bilgisi silinmiştir.`);
      getStocks(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} silinemedi`);
    }
  };

  const postStock = async (url = "firms", info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/${url}/`, info);
      toastSuccessNotify(`${url} kayıdı eklenmiştir.`);
      getStocks(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} kaydi eklenemiştir.`);
    }
  };

  const putStock = async (url = "firms", info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`/${url}/${info._id}`, info);
      toastSuccessNotify(`${url} kayıdı güncellenmiştir..`);
      getStocks(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} kaydi güncelenememiştir.`);
    }
  };
  const searchStock = async (url = "firms", value = "") => {
    dispatch(fetchStart());
    
    const endpoint = `/${url}/?search[name]=${value}`;

    try {
      const {
        data: { data: apiData },
      } = await axiosWithToken.get(endpoint);

      dispatch(getStockSuccess({ apiData, url }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  return {
    getStocks,
    deleteStock,
    postStock,
    putStock,
    getProPurBranFirm,
    searchStock,
  };
};

export default useStockCalls;
