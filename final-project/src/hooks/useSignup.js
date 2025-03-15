import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const signup = async ({ email, password, username }) => {
    const success = handleInputErrors({
      email,
      username,
      password,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        {
          email,
          username,
          password,
        },
      );
      const data = res.data;
      if (data.message === "User created Successfully") {
        toast.success("User created Successfully");
        navigate("/signin");
      }
      setAuthUser(data.token);
    } catch (error) {
      console.log("error", error);
      if (error.message === "Request failed with status code 400") {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something is wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ email, username, password }) {
  if (!email || !username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
