import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TypeDataProduct = {
    id: number
    title: string
    price: number
    description: string
    image: string
    category: string
}

export interface TypeInitialState {
    productData: TypeDataProduct[],
    proNumber: number
}

const initialState: TypeInitialState = {
    productData: [],
    proNumber: 0
}
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<TypeDataProduct[]>) => {
            state.productData = action.payload
        },
        addProduct: (state, action) => {
            state.proNumber = action.payload
            // console.log("Kiểm tra số lượng mua hàng: ", action.payload);
        }
    }
})

export const {setProduct, addProduct} = productSlice.actions
const productSliceApp = productSlice.reducer
export default productSliceApp