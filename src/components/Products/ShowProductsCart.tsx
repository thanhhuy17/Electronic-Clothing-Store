import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Button } from "antd";
import { deleteProductInCart } from "../../reducer/productReducer";

const ShowProductsCart = () => {
  const dispatch = useDispatch();
  const productInCart = useSelector(
    (state: RootState) => state.product.cartData
  );
  console.log("productInCart: ", productInCart);

  const handleDeleteProductInCart = (id: number) => {
    dispatch(deleteProductInCart(id));
  };
  return (
    <div className="mt-[5rem] mx-[20rem]">
      <h2 className="text-3xl text-emerald-400 my-3">
        Products in the shopping cart
      </h2>
      <div className="flex flex-col gap-3">
        {productInCart.map((product) => {
          return (
            <div
              key={product.id + Math.random()}
              className="flex justify-between items-center"
            >
              <div>{product.title}</div>
              <div>
                <Button
                  danger
                  type="primary"
                  onClick={() => handleDeleteProductInCart(product.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowProductsCart;
