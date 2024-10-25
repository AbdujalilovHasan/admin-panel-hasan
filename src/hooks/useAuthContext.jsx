import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const useAuthContext = () => {
  const state = useContext(AuthContext);
  return state;
};

export default useAuthContext;