import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const navigation = useNavigate();

  const signOutTT = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch({ type: "LOGOUT" });
        navigation("/login");
        console.log("success");
      })
      .catch((error) => {
        console.log("err");
        // An error happened.
      });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/">
          <span className="logo">baoadmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">LIST</p>
          <Link to="/users">
            <li>
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products">
            <li>
              <StoreMallDirectoryIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/orders">
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/delivery">
            <li>
              <LocalShippingIcon className="icon" />
              <span>Delivery</span>
            </li>
          </Link>

          <p className="title">USEFUL</p>
          <li>
            <AnalyticsIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <HealthAndSafetyIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsOutlinedIcon className="icon" />
            <span>Setting</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={signOutTT}>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
