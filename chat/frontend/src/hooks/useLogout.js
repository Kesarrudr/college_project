import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("AuthToken");
      console.log(token);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        null,
        {
          withCredentials: true,
        },
      );

      const data = await res.data;
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
