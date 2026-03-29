import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);

  // const { user } = useSelector((state) => state.auth);

  // console.log(user);

  // if (!user)
  //   return (
  //     <>
  //       <Navigate to="/signin" />
  //       localStorage.removeItem("Auth_id");
  //     </>
  //   );

  // if (!allowedRoles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" />;
  // }

  return children;
};

export default ProtectedRoute;
