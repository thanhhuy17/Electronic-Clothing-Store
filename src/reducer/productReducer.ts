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
        deleteProductInCart: (state, action: PayloadAction<{ userIdDelete: string | undefined}>) => {
            const  userIdDelete  = action.payload // id đc bắn qua
            // console.log("sosanh1: ", userIdDelete );
            // console.log("sosanh2: ", state.cartData.findIndex(pro => pro.userId));

            const findIdProduct = state.cartData.findIndex(pro => pro.userId === userIdDelete);

            // console.log("Có giống Id hay không: ", findIdProduct);
            if (findIdProduct !== -1) { // -1 nghĩa là không tìm thấy: khác -1 nghĩa là tìm thấy 
                state.cartData.splice((findIdProduct), 1)
            }

        }
    }
})

export const { setProduct, addProduct, deleteProductInCart } = productSlice.actions
const productSliceApp = productSlice.reducer
export default productSliceApp