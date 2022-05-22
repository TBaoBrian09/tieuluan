import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { ShoppingCartOutlined } from "@mui/icons-material";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const Widget = ({ type }) => {
  let data;

  //   tempoprary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlined
            className="icon"
            style={{
              backgroundColor: "rgb(119 170 48 / 47%)",
              color: "yellow",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View all earnings",
        icon: (
          <PaidOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgb(132 177 69 / 47%)",
              color: "#1ba810",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgb(240 126 247 / 47%)",
              color: "#c100b0",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
          {data?.isMoney && "$"} {amount}
        </span>
        <span className="link">See all users</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data?.icon}
        {/* <PersonOutlinedIcon className="icon" /> */}
      </div>
    </div>
  );
};

export default Widget;
