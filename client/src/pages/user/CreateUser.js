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
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStore } from "../../apiCall/store";
import { setFormValues, setOpenModal } from "../../redux/commanSlice";
import { AddNewUser, updateUser } from "../../apiCall/user";
import useFetch from "../../hooks/useFetch";

function CreateUSer({ role }) {
  const dispatch = useDispatch();
  useEffect(() => {
    getStore("", dispatch);
  }, []);

  const { storeData } = useSelector((state) => state.store);

  const { formValues, openModal, rowToEdit } = useSelector(
    (state) => state.comman
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormValues({ ...formValues, [name]: value, role: role }));
  };

  const storeOption = storeData.map((store) => ({
    label: store.storeName,
    value: store._id,
  }));
  const handleSubmit = (event) => {
    event.preventDefault();
    if (rowToEdit === null) {
      AddNewUser(formValues, dispatch);
    } else {
      updateUser(formValues, dispatch);
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
      <Box className=" w-1/2 bg-white p-4 rounded-lg">
        <Typography variant="h6" className="p-2 text-center text-gray-500">
          Manage Store Manager
        </Typography>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4} className=" py-6">
            <Grid item className=" text-center" xs={6}>
              <TextField
                id="outlined-basic"
                label="First Name"
                name="firstName"
                variant="outlined"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item className=" text-center" xs={6}>
              <TextField
                id="outlined-basic"
                name="lastName"
                label="Last Name"
                variant="outlined"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item className=" text-center" xs={6}>
              <TextField
                id="outlined-basic"
                name="gender"
                label="Gender"
                variant="outlined"
                value={formValues.gender}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item className=" text-center" xs={6}>
              <TextField
                id="outlined-basic"
                name="email"
                label="Email"
                variant="outlined"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item className=" text-center" xs={6}>
              <TextField
                id="outlined-basic"
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item className=" text-center " xs={6}>
              <TextField
                id="outlined-basic"
                name="address"
                label="Address"
                type="text"
                variant="outlined"
                value={formValues.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              item
              xs={6}
              className={` ${
                role === "admin" ? "hidden" : "block"
              } text-center `}
            >
              <FormControl className="w-4/6">
                <InputLabel id="store">Store</InputLabel>
                <Select
                  className="text-start"
                  id="store"
                  name="store"
                  value={formValues.store}
                  label="store"
                  onChange={handleInputChange}
                >
                  {storeOption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
export default CreateUSer;
