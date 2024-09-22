import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appWrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .currentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <div className="bg-cyan-200 min-h-screen content-between flex flex-wrap">
        <div className="w-full block">
          <Header />
          <main>{/* <Outlet/> */}</main>
          <Footer />
        </div>
      </div>
    </>
  ):null;
}

export default App;
