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
}

// TYPE OF CART


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
        addProduct: (state, action: PayloadAction<TypeDataProduct>) => {
            state.cartData = [...state.cartData, action.payload];
            console.log("OKE: ", state.cartData);
        },
        deleteProductInCart: (state, action) => {
            const idProduct = action.payload
            const findIdProduct = state.cartData.findIndex(pro => pro.id == idProduct)
            if (findIdProduct !== -1) {
                state.cartData.splice((findIdProduct), 1)
            }
        }
    }
})

export const { setProduct, addProduct, deleteProductInCart } = productSlice.actions
const productSliceApp = productSlice.reducer
export default productSliceApp