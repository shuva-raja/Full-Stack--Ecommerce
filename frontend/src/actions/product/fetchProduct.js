import axios from "axios";
import {
  addProducts,
  errorProducts,
  loadProducts,
} from "../../Reducers/Productslice";

export default function fetchProducts(
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category,
  rating = 0
) {
  return async function reduxThunk(dispatch, getState) {
    try {
      dispatch(loadProducts());
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
      }
      console.log(link);
      const { data } = await axios.get(link);
      dispatch(addProducts(data));
    } catch (error) {
      const { message, response } = error;
      const errorMessage = response?.data?.message || message;

      // Dispatch only serializable data
      dispatch(errorProducts(errorMessage));
    }
  };
}
// function fetchfilterProducts(keyword) {
//   return async function reduxThunk(dispatch, getState) {
//     try {
//       dispatch(loadProducts());
//       let link = `/api/v1/products`;
//       if (keyword) {
//         link = `/api/v1/products&keyword=${keyword}`;
//       }

//       const { data } = await axios.get(link);
//       dispatch(addProducts(data));
//     } catch (error) {
//       const { message, response } = error;
//       const errorMessage = response?.data?.message || message;

//       // Dispatch only serializable data
//       dispatch(errorProducts(errorMessage));
//     }
//   };
// }
