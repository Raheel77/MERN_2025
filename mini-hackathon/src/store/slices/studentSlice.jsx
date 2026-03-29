import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

// Async thunk for saving student




export const saveStudent = createAsyncThunk(
    "student/saveStudent",
    async (formData, { rejectWithValue }) => {
        try {
            const generateId = Math.random().toString(36).substr(2, 9);

            const studentData = {
                ...formData,
                userID: generateId,
            };

            await setDoc(doc(db, "studentData", generateId), studentData);

            return studentData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const studentSlice = createSlice({
    name: "student",
    initialState: {
        formData: {
            fname: "",
            lname: "",
            email: "",
            class: "",
            section: "A",
        },
        loading: false,
        error: null,
    },
    reducers: {
        updateField: (state, action) => {
            const { name, value } = action.payload;
            state.formData[name] = value;
        },
        resetForm: (state) => {
            state.formData = {
                fname: "",
                lname: "",
                email: "",
                class: "",
                section: "A",
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveStudent.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(saveStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { updateField, resetForm } = studentSlice.actions;
export default studentSlice.reducer;