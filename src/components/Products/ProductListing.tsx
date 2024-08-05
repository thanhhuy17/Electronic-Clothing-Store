import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProductComponent from "./ProductComponent";

export type TypeProductListing = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

const ProductListing = () => {
  const products = useSelector(
    (state: RootState) => state.product?.productData
  );
  // console.log(products);
  return (
    <div className="mt-[5rem] mx-[15rem] grid grid-cols-[repeat(auto-fit,230px)] gap-8 items-center justify-center shadow-xl shadow-slate-400 pb-10">
      {products.map((res: TypeProductListing, index: number) => {
        return (
          <ProductComponent
            key={res.id + index}
            id={res.id}
            title={res.title}
            price={res.price}
            image={res.image}
            category={res.category}
          />
        );
      })}
    </div>
  );
};

export default ProductListing;
