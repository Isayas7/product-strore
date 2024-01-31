import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { setOpenDialog } from "../../redux/commanSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteStore } from "../../apiCall/store";

export default function AlertDialog() {
  const dispatch = useDispatch();
  const { openDialog, rowToDlete } = useSelector((state) => state.comman);
  const handleDelete = () => {
    deleteStore(rowToDlete, dispatch);
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
