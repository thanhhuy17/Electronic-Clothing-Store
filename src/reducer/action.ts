import axios from "axios";

// Gọi API để lấy data các sản phẩm
export const fetchProductData = async () => {
    try {
        const res = await axios.get("products")
        // console.log("Check data: ", res);
        return res
    } catch (error) {
        console.log("Get Data Error!", error);
    }
}
