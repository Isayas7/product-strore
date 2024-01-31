import React from "react";
import Card from "../../components/Card";
import List from "./List";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import Skeleten from "../../components/Skeleten";
function Landing() {
  const categoryId = useLocation().pathname.split("/")[1];
  const { data, loading, error } = useFetch(`/product`);
  return (
    <div>
      <div className="bg-bodyColor">
        <div className=" container mx-auto flex  gap-10 py-6 px-6">
          <div className=" lg:flex-2 ">
            <List />
          </div>
          <div className=" w-full lg:flex-7 h-fit grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
