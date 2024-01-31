import React from "react";
import { Link } from "react-router-dom";
function Card({ product }) {
  return (
    <Link to={`/${product.categoryName}/${product.type}/${product._id}`}>
      <div className="w-full h-full bg-white text-black    rounded-lg overflow-hidden ">
        <div className=" flex justify-center">
          <img
            src={product.img || "../../img/t1.png"}
            className=" object-center  w-full aspect-square bg-red-500"
          />
        </div>

        <div className="p-2">
          <div className=" w-full   flex flex-col   rounded-md border border-violet-300 p-2 bg-transparent ">
            <h6 className=" text-black font-bold">{product.productName}</h6>
            <h5 className=" text-sm font-semibold text-brandColor">
              {product.brandName}
            </h5>
            <p className=" text-lg font-semibold text-buttonColor">
              {product.price} Birr
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
