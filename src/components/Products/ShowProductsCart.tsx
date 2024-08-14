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
  const handleDeleteProductInCart = (userId: any, index: any) => {
    const userIdAndIndex = {userId, index}
    dispatch(deleteProductInCart(userIdAndIndex));
    
  };

  return (
    <div className="mt-[5rem] mx-[20rem]">
      <h2 className="text-3xl text-emerald-400 my-3">
        Products in the shopping cart of User: {User?.username}
      </h2>

      <div className="flex flex-col gap-3">
        {productInCartTest.map((product, index) => {
          return (
            <div
              key={product.id + Math.random()}
              className="flex justify-between items-center w-full h-[100px] bg-neutral-600"
            >
              <div className="flex items-center">
                <img
                  src={product.image}
                  alt="image"
                  className="w-14 rounded-md mx-5"
                />

                <div>{product.title}</div>
              </div>
              <div>
                <Button
                  danger
                  type="primary"
                  onClick={() => handleDeleteProductInCart(User?._id, index)}
                  className="mr-5"
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
