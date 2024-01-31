import React, { useEffect, useState } from "react";
import { getCategory } from "../../apiCall/category";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function List() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCategory("", dispatch);
  }, []);

  const { categoryData, loading, error } = useSelector(
    (state) => state.category
  );
  const [categoryName, setCategoryName] = useState();
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div
        onMouseLeave={() => setIsHover(false)}
        className=" bg-white hidden lg:flex flex-col relative shadow-lg h-152 pt-1 w-80"
      >
        {categoryData.map((category) => {
          return (
            <Link key={category._id} to={`/${category.categoryName}`}>
              <div
                onMouseEnter={() => {
                  setIsHover(true);
                  setCategoryName(category.categoryName);
                }}
                className=" flex justify-between items-center p-3 hover:bg-bodyColor cursor-pointer w-full"
              >
                <div className=" flex gap-5 items-center">
                  <img src="./img/woman.png" alt="sss" className=" w-10 h-10" />
                  <div className=" flex flex-col">
                    <span>{category.categoryName}</span>
                    <span className=" text-xs text-gray-400">1,250 ads</span>
                  </div>
                </div>
                <span>{">"}</span>
              </div>
            </Link>
          );
        })}
        {isHover && (
          <div className="bg-white flex flex-col w-full border-l-2 pt-1 border-green-500 shadow-lg absolute inset-y-0 inset-x-full z-10 h h-152">
            {categoryData.map((category, categoryIndex) => {
              if (categoryName === category.categoryName) {
                return category.typeName.map((cat, index) => (
                  <Link to={`/${category.categoryName}/${cat}`}>
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 hover:bg-bodyColor cursor-pointer"
                    >
                      <div className="flex gap-5 items-center">
                        <img
                          src="./img/woman.png"
                          alt="sss"
                          className="w-10 h-10"
                        />
                        <div className="flex flex-col">
                          <span>{cat}</span>
                          <span className="text-xs text-gray-400">
                            1,250 ads
                          </span>
                        </div>
                      </div>
                      <span>{">"}</span>
                    </div>
                  </Link>
                ));
              }
              return null; // Return null for categories that don't match
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default List;
