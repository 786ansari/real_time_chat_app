import axios from "axios";
import { baseUrl } from "./api.routes";

export const getService = async (url) => {
  try {
    const headers = {
      headers: "application/json",
    };
    const res = await axios.post(baseUrl + url, {}, headers);
    return res.data;
  } catch (err) {
    if (err.data.response.message) {
      return { status: false, message: err.data.response.message, err };
    }
    return { status: false, message: err, err };
  }
};
