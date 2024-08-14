import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type TypeDataProduct = {
    id: number
    title: string
    price: number
    description: string
    image: string
    category: string
    rating: {
        rate: number;
        count: number;
    };
    userId?: string
}

export interface TypeInitialState {
    productData: TypeDataProduct[],
    cartData: TypeDataProduct[]
}

const initialState: TypeInitialState = {
    productData: [],
    cartData: []
}
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<TypeDataProduct[]>) => {
            state.productData = action.payload
        },
        addProduct: (state, action: PayloadAction<{ product: TypeDataProduct, userId: string }>) => {
            const { product, userId } = action.payload
            state.cartData = [...state.cartData, { ...product, userId }];
            console.log("OKE: ", state.cartData);
        },
        deleteProductInCart: (state, action: PayloadAction<{ userId: string, index: number }>) => {
            const { userId, index } = action.payload // id đc bắn qua

            console.log("userIdDelete", userId, index);

            const findIdProduct = state.cartData.findIndex((pro) => pro.userId === userId);

            console.log("SP ở vị trí: ", index);
            if (findIdProduct !== -1 && index) { // -1 nghĩa là không tìm thấy: khác -1 nghĩa là tìm thấy 
                state.cartData.splice(index, 1)
            }
        },
    }
})

export const { setProduct, addProduct, deleteProductInCart } = productSlice.actions
const productSliceApp = productSlice.reducer
export default productSliceApp