import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import useFetchProduct from "../CustomHooks/useFetchProduct";
import { addProduct, TypeDataProduct } from "../reducer/productReducer";
import { FaStar } from "react-icons/fa";
import { Button } from "antd";

interface TypeDetail extends TypeDataProduct {
  rating: object;
}

const ProductDetailPage = () => {
  const getAddData = useSelector(
    (state: RootState) => state.product?.proNumber
  );
  const param = useParams();
  // console.log("Param: ", param);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, loading }: TypeDetail[] = useFetchProduct(
    `products/${param?.id}`
  );

  console.log("Data: ", { data });

  const handleAddProductIn = () => {
    const number = getAddData + 1;
    // console.log("So Luong: ", number); // Bây giờ sẽ hiển thị giá trị đã cập nhật
    dispatch(addProduct(number));

    navigate("/");
    // <ShowNotification/>
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
