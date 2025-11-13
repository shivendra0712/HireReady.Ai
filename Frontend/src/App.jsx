import { useEffect } from "react";
import MainRoutes from "./routes/MainRoutes.jsx";
import { useDispatch , useSelector } from "react-redux";
import { asyncCurrentUser } from "./store/actions/userAction.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.userReducer);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedPath = localStorage.getItem('currentPath');
    
    if (token && !user) {
      dispatch(asyncCurrentUser()).then(() => {
      
        if (savedPath && savedPath !== location.pathname) {
          navigate(savedPath);
          localStorage.removeItem('currentPath');
        }
      });
    }
  }, [user, dispatch, location.pathname, navigate]);

  // Save current path on route changes
  useEffect(() => {
    if (user && location.pathname !== '/') {
      localStorage.setItem('currentPath', location.pathname);
    }
  }, [location.pathname, user]);

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <MainRoutes />
    </div>
  );  
};

export default App;
