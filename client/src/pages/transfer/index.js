import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewDataTo,
  getDataFrom,
  getDataTo,
  updateDataFrom,
  updateDataTo,
} from "../../apiCall/transfer";
import { getStore } from "../../apiCall/store";
import { getCategory } from "../../apiCall/category";

function Transfer() {
  const dispatch = useDispatch();

  const [transferData, setTransferData] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [optionForm, setOptionForm] = useState({
    storeIdFrom: "",
    storeIdTo: "",
    categoryId: "",
    type: "",
  });
  useEffect(() => {
    getStore("", dispatch);
    getCategory("", dispatch);
    getDataFrom(
      `/product?storeId=${optionForm.storeIdFrom}&categoryId=${optionForm.categoryId}&type=${optionForm.type}`,
      dispatch
    );
    getDataTo(
      `/product?storeId=${optionForm.storeIdTo}&categoryId=${optionForm.categoryId}&type=${optionForm.type}`,
      dispatch
    );
  }, [
    optionForm.storeIdFrom,
    optionForm.categoryId,
    optionForm.type,
    optionForm.storeIdTo,
  ]);
  const { dataFrom, dataTo } = useSelector((state) => state.transfer);
  const { storeData } = useSelector((state) => state.store);
  const { categoryData } = useSelector((state) => state.category);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOptionForm({ ...optionForm, [name]: value });
  };

  const deleteDataFromSet = (id) => {
    const filtered = transferData.filter((transfer) => {
      return transfer._id !== id;
    });

    setTransferData(filtered);
    setFormValue("");
  };
  const handleClick = (productFrom) => {
    const matchTransfer = transferData.find(
      (transfer) => transfer._id === productFrom._id
    );
    if (matchTransfer) {
      const filtered = transferData.filter(
        (transfer) => matchTransfer._id !== transfer._id
      );
      setTransferData(filtered);
    } else setTransferData([...transferData, productFrom]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleTransfer = () => {
    if (optionForm.storeIdTo) {
      transferData.forEach((transfer) => {
        const matchingTransfer = dataTo.find(
          (productTo) => transfer.productName === productTo.productName
        );
        const { amount, _id, storeId, ...restProperties } = transfer;

        if (matchingTransfer) {
          const transferToUpdate = {
            _id: matchingTransfer._id,
            stoteId: optionForm.storeIdTo,
            ...restProperties,
            amount:
              Number(matchingTransfer.amount) +
              Number(formValue[matchingTransfer.productName]),
          };
          updateDataTo(transferToUpdate, dispatch);
        } else {
          const transferToAdd = {
            storeId: optionForm.storeIdTo,
            ...restProperties,
            amount: formValue[transfer.productName],
          };
          addNewDataTo(transferToAdd, dispatch);
        }
      });

      dataFrom.forEach((product) => {
        if (Object.keys(formValue).includes(product.productName)) {
          const transferFrom = {
            ...product,
            amount:
              Number(product.amount) - Number(formValue[product.productName]),
          };
          updateDataFrom(transferFrom, dispatch);
        }
      });
      setTransferData([]);
      setFormValue("");
    }
  };

  const set = new Set();

  return (
    <>
      <Box>
        <Box className="flex items-center justify-center gap-20 mb-5">
          <FormControl className=" w-1/6 ">
            <InputLabel id="Store">Store from</InputLabel>

            <Select
              className="text-start h-6"
              id="Store from"
              variant="standard"
              value={optionForm.storeIdFrom}
              name="storeIdFrom"
              onChange={handleInputChange}
            >
              {storeData.map((store) => (
                <MenuItem key={store._id} value={store._id}>
                  {store.storeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className=" w-1/6 ">
            <InputLabel id="Store">Store to</InputLabel>

            <Select
              className="text-start h-6"
              id="Store to"
              variant="standard"
              value={optionForm.storeIdTo}
              name="storeIdTo"
              onChange={handleInputChange}
            >
              {storeData.map((store) => (
                <MenuItem key={store._id} value={store._id}>
                  {store._id !== optionForm.storeIdFrom && store.storeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className=" w-1/6">
            <InputLabel id="Category">Category</InputLabel>

            <Select
              className="text-start h-6"
              id="Category"
              variant="standard"
              value={optionForm.categoryId}
              name="categoryId"
              onChange={handleInputChange}
            >
              {categoryData.map((catagory) => (
                <MenuItem key={catagory._id} value={catagory._id}>
                  {catagory.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className=" w-1/6">
            <InputLabel id="Type">Type</InputLabel>

            <Select
              className="text-start h-6"
              id="Type"
              variant="standard"
              value={optionForm.type}
              name="type"
              onChange={handleInputChange}
            >
              {categoryData.map((category) => {
                return category.typeName.map((element) => {
                  if (
                    optionForm.categoryId &&
                    optionForm.categoryId === category._id
                  )
                    return (
                      <MenuItem key={element} value={element}>
                        {element}
                      </MenuItem>
                    );
                });
              })}
            </Select>
          </FormControl>
        </Box>

        {/* render products */}

        <Box className="flex justify-around" sx={{ height: 545 }}>
          <Box className="w-1/3 gap-2 flex flex-col flex-1 border-2 items-center overflow-scroll">
            {optionForm.type &&
              dataFrom.map((productFrom) => {
                return (
                  <Box
                    key={productFrom._id}
                    className="flex w-4/5 border-2 rounded-md  mt-3"
                  >
                    <Checkbox onClick={() => handleClick(productFrom)} />
                    <Box className="w-1/3">
                      <img
                        src="../../../img/f1.jpg"
                        className=" w-full h-full"
                      />
                    </Box>
                    <Box className="bg-slate-200 w-2/3 flex flex-col ">
                      <Box className="flex flex-wrap justify-around">
                        <Box className=" flex flex-col gap-5">
                          <Typography>{productFrom.productName}</Typography>
                        </Box>

                        <Box className="flex flex-col gap-5 ">
                          <Typography
                            variant=" h5"
                            className=" text-green-500 font-bold  "
                          >
                            ETB {productFrom.price}
                          </Typography>
                          <Typography
                            variant=" h5"
                            className=" text-slate-600 "
                          >
                            Amount {productFrom.amount}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
          </Box>

          <Box className="flex w-fit flex-col flex-1  items-center gap-5 border-2 overflow-scroll">
            {transferData.length >= 1
              ? transferData.map((item) => {
                  if (!set.has(item.productName)) {
                    set.add(item.productName);
                    return (
                      <Box
                        key={item._id}
                        className="flex gap-3 items-center w-fit  mx-5"
                      >
                        <Box className="flex border-2 w-fit rounded-md   mt-3">
                          <Box className="w-fit">
                            <img
                              src="../../../img/f1.jpg"
                              className="w-20 h-full"
                            />
                          </Box>
                          <Box className="bg-slate-200 flex flex-col w-fit ">
                            <Typography
                              variant=" h5"
                              className=" text-green-500 font-bold  "
                            >
                              ETB {item.price}
                            </Typography>
                            <Typography>{item.productName}</Typography>
                          </Box>
                        </Box>
                        <TextField
                          label="Amount"
                          type="number"
                          variant="standard"
                          value={formValue[item.productName] || ""}
                          name={item.productName}
                          onChange={handleChange}
                        />
                        <IconButton
                          disableRipple
                          onClick={() => deleteDataFromSet(item._id)}
                        >
                          <Cancel />
                        </IconButton>
                      </Box>
                    );
                  }
                })
              : null}
            <Box className="h-full flex items-center">
              <Button
                className=" my-auto"
                variant="contained"
                onClick={handleTransfer}
              >
                Transfer
              </Button>
            </Box>
          </Box>
          <Box className="w-1/3  flex flex-col flex-1 border-2 items-center  overflow-scroll">
            {optionForm.type &&
              optionForm.storeIdTo &&
              dataTo.map((productTo) => {
                return (
                  <Box
                    key={productTo._id}
                    className="flex w-4/5 border-2 rounded-md  mt-3"
                  >
                    <Box className="w-1/3">
                      <img
                        src="../../../img/f1.jpg"
                        className=" w-full h-full"
                      />
                    </Box>
                    <Box className="bg-slate-200  w-2/3 flex flex-col ">
                      <Box className="flex flex-wrap justify-around  text-ellipsis overflow-hidden">
                        <Box className=" flex flex-col gap-5  ">
                          <Typography className="  whitespace-nowrap  ">
                            {productTo.productName}
                          </Typography>
                        </Box>

                        <Box className="flex flex-col gap-5 ">
                          <Typography
                            variant=" h5"
                            className=" text-green-500 font-bold whitespace-nowrap "
                          >
                            ETB {productTo.price}
                          </Typography>
                          <Typography
                            variant=" h5"
                            className=" text-slate-600 "
                          >
                            Amount {productTo.amount}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Transfer;
