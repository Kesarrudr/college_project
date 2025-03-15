import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      //TODO: cookee is not being set

      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      const data = await res.data;

      if (data.message === "User LoggedIn") {
        toast.success("User LoggedIn");
      }
      localStorage.setItem("currentUser", JSON.stringify(data.userData));
      setAuthUser(data.userData);
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

  return { loading, login };
};
export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
