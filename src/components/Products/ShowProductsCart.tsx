import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Button } from "antd";
import { deleteProductInCart } from "../../reducer/productReducer";
// import { useEffect } from "react";

const ShowProductsCart = () => {
  const dispatch = useDispatch();
  const User = useSelector((state: RootState) => state.auth.login.currentUser);

  // Dùng useEffect
  // useEffect(()=>{
  //  dispatch(showProductInId(User?._id))
  // },[])

  const productInCart = useSelector(
    (state: RootState) => state.product.cartData
  );

  const productInCartTest = productInCart.filter((user: any) => {
    return user?.userId === User?._id;
  });
  // console.log("productInCart: ", productInCartTest);

  const handleDeleteProductInCart = (userId : any) => {
    dispatch(deleteProductInCart(userId));
  };

  return (
    <div className="mt-[5rem] mx-[20rem]">
      <h2 className="text-3xl text-emerald-400 my-3">
        Products in the shopping cart of User: {User?.username}
      </h2>

      <div className="flex flex-col gap-3">
        {productInCartTest.map((product) => {
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
                  onClick={() => handleDeleteProductInCart(User?._id)}
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
