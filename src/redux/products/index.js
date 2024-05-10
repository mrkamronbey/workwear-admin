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

export const ProductDelete = createAsyncThunk("products/delete", async (id) => {
  return await axios
    .delete(`${API_URL}/products/${id}`)
    .then((response) => response.data);
});
export const ProductPut = createAsyncThunk(
  "products/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/products/${id}`, body)
      .then((response) => console.log(response.data));
  }
);

export const UploadImage = createAsyncThunk("Product1/upload", async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "pa92xo85");
  try {
    return await axios
      .post("https://api.cloudinary.com/v1_1/dc3qaagzz/upload", formData)
      .then((response) => response?.data.secure_url);
  } catch (error) {
    return error;
  }
});

export const UploadImage1 = createAsyncThunk("Product2/upload", async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "pa92xo85");
  try {
    return await axios
      .post("https://api.cloudinary.com/v1_1/dc3qaagzz/upload", formData)
      .then((response) => response?.data.secure_url);
  } catch (error) {
    return error;
  }
});

export const UploadImage2 = createAsyncThunk("Product3/upload", async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "pa92xo85");
  try {
    return await axios
      .post("https://api.cloudinary.com/v1_1/dc3qaagzz/upload", formData)
      .then((response) => response?.data.secure_url);
  } catch (error) {
    return error;
  }
});

export const UploadImage3 = createAsyncThunk("Product4/upload", async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "pa92xo85");
  try {
    return await axios
      .post("https://api.cloudinary.com/v1_1/dc3qaagzz/upload", formData)
      .then((response) => response?.data.secure_url);
  } catch (error) {
    return error;
  }
});

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
      Error: false,
      Loading: false,
      Success: false,
    },
    uploadProjects: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
    uploadProjects1: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
    uploadProjects2: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
    uploadProjects3: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
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
    [ProductPut.pending]: (state, action) => {
      state.productPut.loading = true;
    },
    [ProductPut.fulfilled]: (state, action) => {
      state.productPut.Error = false;
      state.productPut.Success = true;
      state.productPut.Loading = false;
    },
    [ProductPut.rejected]: (state, action) => {
      state.productPut.Error = true;
      state.productPut.Success = false;
      state.productPut.Loading = false;
    },

    [UploadImage.pending]: (state, action) => {
      state.uploadProjects.Loading = true;
    },
    [UploadImage.fulfilled]: (state, action) => {
      state.uploadProjects.Error = false;
      state.uploadProjects.Success = true;
      state.uploadProjects.Loading = false;
      state.uploadProjects.data = action.payload;
      // console.log( );
    },
    [UploadImage.rejected]: (state, action) => {
      state.uploadProjects.Error = true;
      state.uploadProjects.Success = false;
      state.uploadProjects.Loading = false;
    },

    [UploadImage1.pending]: (state, action) => {
      state.uploadProjects1.Loading = true;
    },
    [UploadImage1.fulfilled]: (state, action) => {
      state.uploadProjects1.Error = false;
      state.uploadProjects1.Success = true;
      state.uploadProjects1.Loading = false;
      state.uploadProjects1.data = action.payload;
      // console.log( );
    },
    [UploadImage1.rejected]: (state, action) => {
      state.uploadProjects1.Error = true;
      state.uploadProjects1.Success = false;
      state.uploadProjects1.Loading = false;
    },

    [UploadImage2.pending]: (state, action) => {
      state.uploadProjects2.Loading = true;
    },
    [UploadImage2.fulfilled]: (state, action) => {
      state.uploadProjects2.Error = false;
      state.uploadProjects2.Success = true;
      state.uploadProjects2.Loading = false;
      state.uploadProjects2.data = action.payload;
      // console.log( );
    },
    [UploadImage2.rejected]: (state, action) => {
      state.uploadProjects2.Error = true;
      state.uploadProjects2.Success = false;
      state.uploadProjects2.Loading = false;
    },

    [UploadImage3.pending]: (state, action) => {
      state.uploadProjects.Loading = true;
    },
    [UploadImage3.fulfilled]: (state, action) => {
      state.uploadProjects3.Error = false;
      state.uploadProjects3.Success = true;
      state.uploadProjects3.Loading = false;
      state.uploadProjects3.data = action.payload;
      // console.log( );
    },
    [UploadImage3.rejected]: (state, action) => {
      state.uploadProjects3.Error = true;
      state.uploadProjects3.Success = false;
      state.uploadProjects3.Loading = false;
    },
  },
});

export const {} = ProductSlice.actions;
export default ProductSlice.reducer;
