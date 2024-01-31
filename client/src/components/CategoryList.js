import React from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function CategoryList() {
  const categoryName = useLocation().pathname.split("/")[1];
  const type = useLocation().pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    `/category?categoryName=${categoryName}`
  );

  return (
    <div className=" bg-white rounded-md h-fit  ">
      <h2 className=" bg-featuredColor text-xl font-semibold text-white rounded-t-md  p-2">
        Categories
      </h2>
      <h3 className=" uppercase p-2">{categoryName}</h3>

      {data.map((category) => {
        if (categoryName === category.categoryName) {
          return category.typeName.map((cat, index) => (
            <div key={index} className="flex flex-col px-5 gap-1">
              <Link to={`/${category.categoryName}/${cat}`}>
                <span
                  className={` ${
                    type === cat ? "text-blue-900 text-lg  font-bold" : ""
                  }`}
                >
                  {cat} | 132
                </span>
              </Link>
            </div>
          ));
        }
        return null; // Return null for categories that don't match
      })}

      <div className="py-1 px-5">
        <span className="  text-green-500 border-b border-dashed inline  border-green-600 ">
          show all | 5
        </span>
      </div>
    </div>
  );
}

export default CategoryList;
