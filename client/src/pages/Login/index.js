import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handlelogin } from "../../apiCall/auth";
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm({ ...form, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handlelogin(form, dispatch, navigate);
  };
  return (
    <Box className=" flex justify-center items-center h-screen bg-myColor">
      <form onSubmit={handleSubmit}>
        <Box className="flex gap-3 flex-col p-4 bg-white drop-shadow w-96	h-64 rounded-md">
          <h3 className="text-center">Login</h3>

          <TextField
            onChange={handleChange}
            id="email"
            type="email"
            label="email"
            variant="outlined"
          />

          <TextField
            className="bg-gray-50"
            onChange={handleChange}
            id="password"
            type="password"
            label="password"
            variant="outlined"
          />

          <Box className=" flex justify-center items-center">
            <Button
              className=" bg-featuredColor "
              variant="contained"
              disabled={loading}
              onClick={handleSubmit}
              // color="primary"
            >
              login
            </Button>
          </Box>
          {error && <span>{error.message}</span>}
        </Box>
      </form>
    </Box>
  );
}

export default Login;
