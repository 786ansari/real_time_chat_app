import axios from "axios";
import { baseUrl } from "./api.routes";

export const PostService = async (url, data) => {
  console.log("urlururl",url,data)
  try {
    const headers = {
      headers: "application/json",
    };
    const res = await axios.post(baseUrl + url, data, headers);
    return res.data;
  } catch (err) {
    console.log("err",err)
    if (err?.response?.data?.message) {
      return { status: false, message: err?.response?.data.message, err };
    }
    if (err?.message) {
      return { status: false, message: err.message };
    }
    if(err.status == 500){
      return { status: false, message: err.statusText };
    }
    return { status: false, message: err };

  }
};
