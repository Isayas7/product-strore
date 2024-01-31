import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDialog } from "../../redux/commanSlice";
import { deleteUser } from "../../apiCall/user";

export default function AlertDialog() {
  const dispatch = useDispatch();
  const { openDialog, rowToDlete } = useSelector((state) => state.comman);
  const handleDelete = () => {
    deleteUser(rowToDlete, dispatch);
    dispatch(setOpenDialog());
  };
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={() => dispatch(setOpenDialog())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(setOpenDialog())}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
