import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setFormValues, setOpenModal } from "../../redux/commanSlice";
import { addNewProduct, updateProduct } from "../../apiCall/product";
import { getCategory } from "../../apiCall/category";

function CreateProduct({ inputs }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    getCategory("", dispatch);
  }, []);
  const { categoryData, loading, error } = useSelector(
    (state) => state.category
  );
  const { formValues, openModal, rowToEdit } = useSelector(
    (state) => state.comman
  );
  const [file, setFile] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormValues({ ...formValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rowToEdit === null) {
      const NewProduct = {
        ...formValues,
        storeId: currentUser.store,
        image: "",
      };
      addNewProduct(NewProduct, dispatch);
    } else {
      updateProduct(formValues, dispatch);
    }
    dispatch(setOpenModal());
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={() => dispatch(setOpenModal())}
      className=" flex justify-center items-center"
    >
      <Box className="w-1/2 bg-white p-5 rounded-lg">
        <Typography variant="h5" className=" p-2 text-center text-gray-500 ">
          Create new Product
        </Typography>
        <Divider />
        <form onSubmit={handleSubmit} className=" mt-2">
          <Box className="flex justify-around items-center mb-3">
            <Box className="flex flex-wrap justify-around items-center gap-10  w-2/3">
              <FormControl className=" w-1/3">
                <InputLabel id="Category">Category</InputLabel>

                <Select
                  className="text-start"
                  id="Category"
                  variant="standard"
                  value={formValues.categoryId}
                  name="categoryId"
                  label="Category Name"
                  onChange={handleInputChange}
                >
                  {categoryData?.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className=" w-1/3">
                <InputLabel id="Type">Type</InputLabel>
                <Select
                  className="text-start"
                  id="Type"
                  variant="standard"
                  value={formValues.type}
                  name="type"
                  label="Type"
                  onChange={handleInputChange}
                >
                  {categoryData?.map((category) => {
                    return category.typeName.map((element) => {
                      if (
                        formValues.categoryId &&
                        formValues.categoryId === category._id
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

              {inputs.map((input) => (
                <TextField
                  className=" w-1/3"
                  key={input.name}
                  id="standard-basic"
                  variant="standard"
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  value={formValues[input.name]}
                  onChange={handleInputChange}
                />
              ))}
              <label htmlFor="file" className=" w-1/3">
                Upload Image :
                <AddPhotoAlternateRoundedIcon className=" cursor-pointer" />
              </label>
            </Box>
            <Box className=" w-1/3">
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                className=" hidden"
              />
              <img
                alt="ddd"
                src={file ? URL.createObjectURL(file) : "../../../img/f1.jpg"}
                className=" rounded-full object-cover"
              />
            </Box>
          </Box>
          <Divider />
          <Box className=" flex justify-center items-center mt-3 gap-3">
            {rowToEdit === null ? (
              <Button color="primary" type="submit" variant="contained">
                Add
              </Button>
            ) : (
              <Button color="primary" type="submit" variant="contained">
                update
              </Button>
            )}
            <Button
              onClick={() => dispatch(setOpenModal())}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default CreateProduct;
