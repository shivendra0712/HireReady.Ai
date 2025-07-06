import { useEffect } from "react";
import MainRoutes from "./routes/MainRoutes.jsx";
import { useDispatch , useSelector } from "react-redux";
import { asyncCurrentUser } from "./store/actions/userAction.jsx";


const App = () => {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.userReducer);
  
  useEffect(() => {
   !user && dispatch(asyncCurrentUser());
  }, [user]);


  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <MainRoutes />
      
    </div>
  );  
};

export default App;
