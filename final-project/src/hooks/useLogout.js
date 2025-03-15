import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const navigate = useNavigate();


  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        null,
        {
          withCredentials: true,
        },
      );

      const data = await res.data;
      if (data.message === "User logged Out Successfully") {
        toast.success("User Logged Out")
        navigate("/signin")
      }
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("currentUser");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;

