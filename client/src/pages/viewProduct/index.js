import React from "react";
import { useLocation } from "react-router-dom";
import Recommendation from "../../components/Recommendation";
import useFetch from "../../hooks/useFetch";
import {
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
  MessageOutlined,
  NotificationsOutlined,
  SearchOutlined,
  ArrowCircleRight,
  ArrowCircleRightOutlined,
} from "@mui/icons-material";
function ViewProduct() {
  const id = useLocation().pathname.split("/")[3];
  const { data } = useFetch(`/product/${id}`);
  const { data: store } = useFetch(`/store/${data.storeId}`);

  return (
    <div className="bg-bodyColor px-10 md:px-16 ">
      <div className=" container mx-auto">
        <div className="  flex flex-col md:flex-row gap-10 py-6 ">
          <div className=" flex-5 ">
            <img
              src="../../../img/t1.png"
              className=" w-full aspect-square object-center   bg-slate-300"
            />
          </div>

          <div className=" flex-4 flex flex-col  ">
            <div className=" flex flex-col gap-5 md:w-full">
              <p className="   text-5xl font-bold text-[#12263a] mt-2 normal-case relative">
                {data.productName}
                <div className=" after:bg-[#12263a] after:absolute after:left-1 after:-bottom-2 after:h-[4px] after:w-20" />
              </p>
              <p className="">
                <span className="text-[#12263a] mr-1 text-lg font-bold">
                  Price:
                </span>
                <span className=" text-xl font-bold text-green-500">
                  {data.price}Birr
                </span>
              </p>
              <p className=" text-base text-brandColor font-bold ">
                Existed in {store.storeName}
              </p>
              <p className=" font-semibold ">
                Location : {store.storeLocation}
              </p>
            </div>
            <span className="text-[#12263a] text-lg font-bold mt-3 mb-1">
              About this item:
            </span>
            <span className=" text-base text-gray-600 ml-2">
              {data.description}
            </span>
            {data && (
              <div className=" flex flex-col gap-3 pt-6 ">
                {data.type && (
                  <div className=" flex gap-3">
                    <ArrowCircleRightOutlined className=" text-brandColor" />
                    <span className=" text-gray-600 uppercase font-semibold">
                      Type:
                    </span>
                    <span className="font-semibold">{data.type}</span>
                  </div>
                )}
                {data.brandName && (
                  <div className="flex gap-3">
                    <ArrowCircleRightOutlined className=" text-brandColor" />
                    <span className=" text-gray-600 uppercase font-semibold">
                      Brand:
                    </span>
                    <span className="font-semibold">{data.brandName}</span>
                  </div>
                )}
                {data.color && (
                  <div className="flex gap-3">
                    <ArrowCircleRightOutlined className=" text-brandColor" />
                    <span className=" text-gray-600 uppercase font-semibold">
                      Color:
                    </span>
                    <span className="font-semibold">{data.color}</span>
                  </div>
                )}

                {data.condition && (
                  <div className="flex gap-3">
                    <ArrowCircleRightOutlined className=" text-brandColor" />
                    <span className=" text-gray-600 uppercase font-semibold">
                      Condition:
                    </span>
                    <span className="font-semibold">{data.condition}</span>
                  </div>
                )}

                {data.gender && (
                  <div className="flex gap-3">
                    <ArrowCircleRightOutlined className=" text-brandColor" />
                    <span className=" text-gray-600 uppercase font-semibold">
                      Gender:
                    </span>
                    <span className="font-semibold">{data.gender}</span>
                  </div>
                )}
                {data.size && (
                  <div className="flex gap-3">
                    <ArrowCircleRightOutlined className=" text-brandColor" />
                    <span className=" text-gray-600 uppercase font-semibold">
                      Size:
                    </span>
                    <span className="font-semibold">{data.size}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Recommendation typeName={data.type} id={data._id} />
      </div>
    </div>
  );
}

export default ViewProduct;
