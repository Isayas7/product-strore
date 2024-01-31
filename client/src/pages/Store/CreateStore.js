import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { setFormValues, setOpenModal } from "../../redux/commanSlice";
import { useDispatch, useSelector } from "react-redux";
import { addNewStore, updateStore } from "../../apiCall/store";

function CreateStore() {
  const dispatch = useDispatch();

  const { formValues, openModal, rowToEdit } = useSelector(
    (state) => state.comman
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormValues({ ...formValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rowToEdit === null) {
      addNewStore(formValues, dispatch);
    } else {
      updateStore(rowToEdit, formValues, dispatch);
    }
    dispatch(setOpenModal());
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={() => dispatch(setOpenModal())}
      className="flex justify-center items-center"
    >
      <Box className="w-1/3 bg-white rounded-lg p-5">
        <Typography variant="h6" className=" text-center text-gray-400">
          Manage Store
        </Typography>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Stack className=" my-5 gap-8">
            <TextField
              name="storeName"
              label="Store Name"
              variant="outlined"
              value={formValues.storeName}
              onChange={handleInputChange}
            />
            <TextField
              name="storeLocation"
              label="Location"
              variant="outlined"
              value={formValues.storeLocation}
              onChange={handleInputChange}
            />
          </Stack>
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
        </form>
      </Box>
    </Modal>
  );
}
export default CreateStore;
