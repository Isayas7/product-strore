import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import Card from "./Card";

const Recommendation = ({ typeName, id }) => {
  const { data, loading, error } = useFetch(`/product?type=${typeName}`);
  const filterData = data.filter((product) => product._id !== id);
  return (
    <div className="flex flex-col py-6 ">
      <h1 className=" text-2xl bg-slate-200 py-2 my-3 pl-10 font-bold text-gray-600">
        Related Products
      </h1>
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-5  ">
        {filterData.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
