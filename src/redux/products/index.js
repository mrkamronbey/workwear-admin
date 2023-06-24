import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const ProductPost = createAsyncThunk("products/post", async (body) => {
  return await axios.post(`${API_URL}/products`, body).then((res) => res);
});
export const ProductGet = createAsyncThunk("products/get", async () => {
  return await axios
    .get(`${API_URL}/products`)
    .then((response) => response.data);
});

export const ProductDelete = createAsyncThunk(
  "products/delete",
  async (id) => {
    return await axios
      .delete(`${API_URL}/products/${id}`)
      .then((response) => response.data);
  }
);
export const ProductPut = createAsyncThunk(
  "products/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/products/${id}`, body)
      .then((response) => console.log(response.data));
  }
);
const ProductSlice = createSlice({
  name: "product",
  initialState: {
    productGet: {
      loading: false,
      data: [],
      error: false,
      success: false,
    },
    productPost: {
      Success: false,
      Error: false,
      loading: false,
    },
    productDelete: {
      Success: false,
      Error: false,
      loading: false,
    },
    productPut: {
        Error : false,
        Loading : false,
        Success : false,
    },
  },
  extraReducers: {
    // get
    [ProductGet.pending]: (state, action) => {
      state.productGet.loading = true;
    },
    [ProductGet.fulfilled]: (state, action) => {
      state.productGet.loading = false;
      state.productGet.success = true;
      state.productGet.data = action.payload;
      state.productGet.error = false;
    },
    [ProductGet.rejected]: (state, action) => {
      state.productGet.loading = false;
      state.productGet.error = true;
      state.productGet.success = false;
    },
    // add
    [ProductPost.pending]: (state, action) => {
      state.productPost.loading = true;
    },
    [ProductPost.fulfilled]: (state, action) => {
      state.productPost.loading = false;
      state.productPost.Success = true;
      state.productPost.Error = false;
    },
    [ProductPost.rejected]: (state, action) => {
      state.productPost.loading = false;
      state.productPost.Error = true;
      state.productPost.Success = false;
    },
    // delete
    [ProductDelete.pending]: (state, action) => {
      state.productDelete.loadingDelete = true;
    },
    [ProductDelete.fulfilled]: (state, action) => {
      state.productDelete.loading = false;
      state.productDelete.Success = true;
      state.productDelete.Error = false;
    },
    [ProductDelete.rejected]: (state, action) => {
      state.productDelete.loading = false;
      state.productDelete.Error = true;
      state.productDelete.Success = false;
    },
    // put
    [ProductPut.pending]:(state , action) =>{
        state.productPut.loading = true
    },
    [ProductPut.fulfilled]:(state , action) =>{
        state.productPut.Error = false
        state.productPut.Success = true
        state.productPut.Loading = false
    },
    [ProductPut.rejected]:(state , action) =>{
        state.productPut.Error = true
        state.productPut.Success = false
        state.productPut.Loading = false
    },
  },
});

export const {} = ProductSlice.actions;
export default ProductSlice.reducer;
