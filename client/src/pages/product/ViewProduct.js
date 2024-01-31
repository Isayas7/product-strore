import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { setOpenViewModal } from "../../redux/commanSlice";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../apiCall/currentData";
import { updateProduct } from "../../apiCall/product";
import { addNewSell } from "../../apiCall/sell";
import { addNewPurchase } from "../../apiCall/purchase";
import useFetch from "../../hooks/useFetch";

function ViewProduct() {
  const dispatch = useDispatch();
  const { openViewModal, viewId } = useSelector((state) => state.comman);
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useFetch(`/product/${viewId}`);

  const [amountValue, setAmountValue] = useState("");

  const handleChange = (event) => {
    setAmountValue(event.target.value);
  };
  const handleClose = () => {
    dispatch(setOpenViewModal());
    setAmountValue("");
  };

  const handleClick = (action) => {
    const { amount, _id, selledTimes, ...rest } = data;
    let seller, purchaser;

    const newPurchaseSell = {
      ...(action === "-" &&
        Number(amount) - Number(amountValue) >= 1 && {
          amount: Number(amountValue),
          seller: currentUser.firstName,
        }),
      ...(action === "+" && {
        amount: Number(amountValue),
        purchaser: currentUser.firstName,
      }),

      ...rest,
    };
    const update_Product = {
      _id,
      ...(action === "-" && {
        amount: Number(amount) - Number(amountValue),
        selledTimes: amountValue,
      }),
      ...(action === "+" && { amount: Number(amount) + Number(amountValue) }),

      ...rest,
    };
    if (action === "-") addNewSell(newPurchaseSell, dispatch);
    if (action === "+") addNewPurchase(newPurchaseSell, dispatch);
    updateProduct(update_Product, dispatch);
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openViewModal}
      onClose={handleClose}
      className=" flex justify-center items-center"
    >
      <Box className=" bg-white p-5 w-1/2 rounded-lg ">
        <Box className="flex  w-full items-center">
          {data && (
            <Box className="flex flex-wrap gap-3 w-2/3 pl-5 ">
              {data.productName && (
                <Box className=" w-2/5">
                  <span>{data.productName}</span>
                  <span className=" block text-gray-600 uppercase">
                    Product Name
                  </span>
                </Box>
              )}
              {data.type && (
                <Box className=" w-2/5">
                  <span>{data.type}</span>
                  <span className=" block text-gray-600 uppercase">Type</span>
                </Box>
              )}
              {data.brandName && (
                <Box className=" w-2/5">
                  <span>{data.brandName}</span>
                  <span className=" block text-gray-600 uppercase">Brand</span>
                </Box>
              )}
              {data.color && (
                <Box className=" w-2/5">
                  <span>{data.color}</span>
                  <span className=" block text-gray-600 uppercase">Color</span>
                </Box>
              )}

              {data.condition && (
                <Box className=" w-2/5">
                  <span>{data.condition}</span>
                  <span className=" block text-gray-600 uppercase">
                    Condition
                  </span>
                </Box>
              )}

              {data.gender && (
                <Box className=" w-2/5">
                  <span>{data.gender}</span>
                  <span className=" block text-gray-600 uppercase">Gender</span>
                </Box>
              )}
              {data.size && (
                <Box className=" w-2/5">
                  <span>{data.size}</span>
                  <span className=" block text-gray-600 uppercase">Size</span>
                </Box>
              )}
              {data.price && (
                <Box className=" w-2/5">
                  <span>{data.price}</span>
                  <span className=" block text-gray-600 uppercase">Price</span>
                </Box>
              )}
              {data.amount && (
                <Box className=" w-2/5">
                  <span>{data.amount}</span>
                  <span className=" block text-gray-600 uppercase">Amount</span>
                </Box>
              )}
              {data.description && (
                <Box className=" w-2/5">
                  <span>{data.description}</span>
                  <span className=" block text-gray-600 uppercase">
                    Description
                  </span>
                </Box>
              )}
            </Box>
          )}

          <Box className="w-1/3">
            <img
              alt="ddd"
              src="../../../img/f1.jpg"
              className=" rounded-full object-cover w-fit"
            />
          </Box>
        </Box>

        <Box className="flex gap-2 justify-center mt-5">
          <TextField
            className=" w-1/5"
            id="standard-basic"
            variant="standard"
            type="number"
            value={amountValue}
            name="sellPurchase"
            onChange={handleChange}
          />
          <Button variant="contained" onClick={() => handleClick("-")}>
            Sell
          </Button>
          <Button variant="contained" onClick={() => handleClick("+")}>
            Purchase
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ViewProduct;
