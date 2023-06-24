import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const adminAdd = createAsyncThunk('admin/Add' , async(body) =>{
     return await axios.post("https://x8ki-letl-twmt.n7.xano.io/api:1p9FGSWt/auth/signup" , body)
    .then(res => res)
})
export const adminGet = createAsyncThunk("admin/Get" ,  () =>{
    return axios.get("https://x8ki-letl-twmt.n7.xano.io/api:1p9FGSWt/user")
    .then(response => response.data)
})
export const adminPut = createAsyncThunk("admin/Delete", async ({body, id})=>{
    return await axios.put(`https://x8ki-letl-twmt.n7.xano.io/api:1p9FGSWt/user/${id}`, body)
    .then(res => res)
})
export const adminDelete = createAsyncThunk("admin/Delete", async (id)=>{
    return await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:1p9FGSWt/user/${id}`)
    .then(res => res)
})
const AdminSlice = createSlice({
    name : "admin",
    initialState:{
        userGet:{
            loading : false,
            data : [],
            error : false,
            success: false
        },
        AddPost:{
            Success : false,
            Error : false,
            loading : false,
        },
        AddPut:{
            Success : false,
            Error : false,
            loading : false,
        },
        AdminDelete:{
            Success : false,
            Error : false,
            loading : false,
        }
    },
    extraReducers:{
        // get
        [adminGet.pending]:(state , action) =>{
            state.userGet.loading = true
        },
        [adminGet.fulfilled]:(state , action) =>{
            state.userGet.loading = false;
            state.userGet.success = true
            state.userGet.data = action.payload
            state.userGet.error = false
        },       
         [adminGet.rejected]:(state , action) =>{
            state.userGet.loading = false
            state.userGet.error = true
            state.userGet.success = false
        },
        // add
        [adminAdd.pending]:(state , action) =>{
            state.AddPost.loading = true
        },
        [adminAdd.fulfilled]:(state , action) =>{
            state.AddPost.loading = false;
            state.AddPost.Success = true
            state.AddPost.Error = false
        },       
         [adminAdd.rejected]:(state , action) =>{
            state.AddPost.loading = false
            state.AddPost.Error = true
            state.AddPost.Success = false
        },
         // put
         [adminPut.pending]:(state , action) =>{
            state.AddPost.loading = true
        },
        [adminPut.fulfilled]:(state , action) =>{
            state.AddPost.loading = false;
            state.AddPost.Success = true
            state.AddPost.Error = false
        },       
         [adminPut.rejected]:(state , action) =>{
            state.AddPost.loading = false
            state.AddPost.Error = true
            state.AddPost.Success = false
        },
        // delete
        [adminDelete.pending]:(state , action) =>{
            state.AdminDelete.loadingDelete = true
        },
        [adminDelete.fulfilled]:(state , action) =>{
            state.AdminDelete.loading = false;
            state.AdminDelete.Success = true
            state.AdminDelete.Error = false
        },       
         [adminDelete.rejected]:(state , action) =>{
            state.AdminDelete.loading = false
            state.AdminDelete.Error = true
            state.AdminDelete.Success = false
        }
    }
})


export const {} = AdminSlice.actions;
export default AdminSlice.reducer;
