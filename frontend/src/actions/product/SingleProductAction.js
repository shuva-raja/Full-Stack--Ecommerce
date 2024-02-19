import axios from "axios";
import {
  addSingleProduct,
  errorSingleProduct,
  loadSingleProduct,
} from "../../Reducers/SingleProductSlice";

export default function fetchSingleProduct(id) {
  return async function reduxThunk(dispatch, getState) {
    try {
      dispatch(loadSingleProduct());
      console.log("ok");
      const { data } = await axios.get(`/api/v1/product/${id}`);
      console.log("not");
      dispatch(addSingleProduct(data));
    } catch (error) {
      dispatch(errorSingleProduct(error.response.data.message));
    }
  };
}
