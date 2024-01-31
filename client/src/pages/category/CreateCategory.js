import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { setFormValues, setOpenModal } from "../../redux/commanSlice";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory, updateCategory } from "../../apiCall/category";

function CreateCategory() {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");

  const { formValues, openModal, rowToEdit } = useSelector(
    (state) => state.comman
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormValues({ ...formValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let { typeName, categoryName, ...others } = formValues;
    typeName = typeName.split(", ").map((_type, index) => (index = _type));
    try {
      const newCategory = { typeName, categoryName, image: "" };
      const update = { typeName, ...others, image: "" };
      if (rowToEdit === null) {
        addNewCategory(newCategory, dispatch);
      } else {
        updateCategory(update, dispatch);
      }
      dispatch(setOpenModal());
    } catch (error) {}
  };

  return (
    <Box>
      <Modal
        open={openModal}
        onClose={() => dispatch(setOpenModal())}
        className=" flex justify-center items-center"
      >
        <Box className=" w-1/3 bg-white rounded-lg p-5">
          <Typography className=" py-2 text-center">Create Category</Typography>
          <Divider />
          <Box className="flex justify-between items-center  p-5">
            <Stack className=" gap-8">
              <TextField
                name="categoryName"
                label="Category name"
                variant="standard"
                value={formValues.categoryName}
                onChange={handleInputChange}
              />
              <TextField
                name="typeName"
                label="type"
                variant="standard"
                placeholder="split the word by comma"
                value={formValues.typeName}
                onChange={handleInputChange}
              />
              <label htmlFor="file" className="w-fit">
                Upload Image :
                <AddPhotoAlternateRoundedIcon className=" cursor-pointer" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                className=" hidden"
              />
            </Stack>
            <img
              alt="ddd"
              src={file ? URL.createObjectURL(file) : "../../../img/f1.jpg"}
              className="w-28 h-28 rounded-full object-cover"
            />
          </Box>
          <Divider />
          <Box className=" flex justify-center items-center mt-3 gap-3">
            {rowToEdit === null ? (
              <Button
                color="primary"
                type="submit"
                onClick={handleSubmit}
                variant="contained"
              >
                Add
              </Button>
            ) : (
              <Button
                color="primary"
                type="submit"
                onClick={handleSubmit}
                variant="contained"
              >
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
        </Box>
      </Modal>
    </Box>
  );
}

export default CreateCategory;
