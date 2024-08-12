import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import useFetchProduct from "../CustomHooks/useFetchProduct";
import { FaStar } from "react-icons/fa";
import { Button } from "antd";
import { addProduct} from "../reducer/productReducer";

// interface TypeDetail extends TypeDataProduct {
//   rating: {
//     rate: number;
//     count: number;
//   };
// }

const ProductDetailPage = () => {
  // GET USER ID
  const userId = useSelector(
    (state: RootState) => state.auth.login?.currentUser?._id
  );
  console.log("User: ", userId);

  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();

  const { data, loading } = useFetchProduct(`products/${param?.id}`);

  // console.log("Data: ", data);

  const handleAddProductIn = () => {
    if (!userId) {
      console.error("User ID is required to add a product to the cart.");
      return;
    }

    if (data && data.id && data.title) {
      // kiểm tra xem data có tồn tại và hợp lệ
      dispatch(addProduct({ product: data, userId }));
      console.log("Product dispatched: ", { product: data, userId });
    } else {
      console.error("Invalid data, cannot dispatch:", data);
    }
    navigate("/home");
  };

  return (
    <div>
      {loading ? (
        <div className="mt-20 text-xl">...Loading</div>
      ) : (
        <div className="flex items-center justify-center">
          <div
            className="my-20 w-[70vw] h-[70vh] flex items-center 
    shadow-xl shadow-emerald-500 bg-white rounded-full gap-5"
          >
            <div className="ml-[8rem]">
              <img src={data?.image} className="max-w-[250px]" />
            </div>

            <div className="mx-5 flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-neutral-500">
                {data?.title}
              </h3>
              <p className="text-neutral-400">{data?.description}</p>
              <p className="text-3xl text-emerald-500 font-semibold">
                {data?.price}$
              </p>
              <p className="text-neutral-600">
                The remaining amount :
                <span className="text-emerald-500 font-semibold">
                  {data?.rating?.count}
                </span>
              </p>
              <p className="text-neutral-600 flex gap-2">
                Star :
                <span className="text-emerald-500 font-semibold flex items-baseline">
                  {data?.rating?.rate} <FaStar />
                </span>
              </p>
              <div>
                <Button
                  size="large"
                  className="bg-emerald-600 text-white hover:scale-105"
                  onClick={handleAddProductIn}
                >
                  Add to card
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
