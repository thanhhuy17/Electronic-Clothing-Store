import axios from "axios";

export const fetchProductData = async () => {
    try {
        const res = await axios.get("products")
        // console.log("Check data: ", res);
        return res
    } catch (error) {
        console.log("Get Data Error!", error);
    }
}
