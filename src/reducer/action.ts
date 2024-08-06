
import { API_Products } from "../main";

// Gọi API để lấy data các sản phẩm
export const fetchProductData = async () => {
    try {
        const res = await API_Products.get("products")
        // console.log("Check data: ", res);
        return res
    } catch (error) {
        console.log("Get Data Error!", error);
    }
}
