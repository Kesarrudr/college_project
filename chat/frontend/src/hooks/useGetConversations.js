import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/all", {
          withCredentials: true,
        });
        const data = res.data;
        const allUsersArray =
          typeof data.allUsers === "string"
            ? JSON.parse(data.allUsers)
            : data.allUsers;
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(allUsersArray);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
