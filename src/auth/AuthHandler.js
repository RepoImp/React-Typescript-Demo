import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    if (!!localStorage.getItem("token")) return;
    if (!localStorage.getItem("token") || (!currentUser && isLoading === false))
      navigate("/login");
  }, [currentUser, isLoading]);

  return null;
};

export default AuthHandler;
