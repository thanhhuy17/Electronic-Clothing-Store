import { Link } from "react-router-dom"
import { TypeProductListing } from "./ProductListing"


const ProductComponent = ({id, title, price, image, category}: TypeProductListing) => {
  return (
    <Link to={`/product/${id}`}>
    <div key={id} className="hover:scale-105 transition">
      <div className="relative max-w-[250px] h-[380px] bg-white rounded-xl shadow-lg shadow-emerald-500">
        <div className="absolute w-full h-[70%]  flex flex-col items-center justify-center">
          {image ? (
            <img
              src={image}
              className="absolute w-[150px] h-fit rounded-t-xl"
            />
          ) : (
            <div className="absolute w-[150px] h-fit rounded-t-xl">
              No Image Found
            </div>
          )}
        </div>
        <h2 className="absolute top-2 left-2 text-emerald-600 font-semibold">
          {price}$
        </h2>

        <div className="absolute  bottom-0 mx-2 my-2 flex flex-col items-center justify-center">
          <h3 className="text-neutral-700 text-[0.9rem] font-bold mb-6">
            {title}
          </h3>
          <p className="text-neutral-500 absolute left-0 bottom-0 text-[0.8rem]">
            {category}
          </p>
        </div>
      </div>
    </div>
  </Link>
  )
}

export default ProductComponent