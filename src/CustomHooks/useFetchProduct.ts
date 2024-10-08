
import { useEffect, useState } from "react"
import { API_Products } from "../main"
import { TypeDataProduct } from "../reducer/productReducer"

const useFetchProduct = (endPoint: string) => {
    const [data, setData] = useState<TypeDataProduct>()
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await API_Products.get(endPoint)
            setData(res?.data)
            setLoading(false)

        } catch (err) {
            console.log("Fetch Data Error!", err);
        }
    }
    useEffect(() => {
        fetchData()
    }, [endPoint])
    return { data, loading }
}

export default useFetchProduct