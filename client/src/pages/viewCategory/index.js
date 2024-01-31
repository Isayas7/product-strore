import React from "react";
import CategoryList from "../../components/CategoryList";
import Card from "../../components/Card";
import Price from "../../components/Price";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function ViewCategory() {
  const categoryName = useLocation().pathname.split("/")[1];
  const typeName = useLocation().pathname.split("/")[2];

  const { data: categoryData } = useFetch(`/category`);

  const categoryId = categoryData.find(
    (category) => category.categoryName === categoryName
  );

  const {
    data: datacategory,
    loading,
    error,
  } = useFetch(`/product?categoryId=${categoryId?._id}`);
  const { data: dataType } = useFetch(`/product?type=${typeName}`);
  const data = typeName ? dataType : datacategory;
  return (
    <div className="bg-bodyColor flex  gap-5 py-6 px-10">
      <div className="w-80 hidden lg:flex flex-col gap-2">
        <CategoryList />
        <Price />
      </div>
      <div className="grid w-full h-fit lg:w-2/3  grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-5">
        {data.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ViewCategory;
