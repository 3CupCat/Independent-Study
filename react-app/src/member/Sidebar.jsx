import React from "react";
import "./Sidebar.css";
import {
  FaUser,
  FaHistory,
  FaGift,
  FaHeart,
  FaReceipt,
  FaLock,
} from "react-icons/fa";

const Sidebar = ({ user }) => {
  // 假資料
  const defaultUser = {
    avatar:
      "https://thumbor.4gamers.com.tw/IRblH-oHzo-DgsFGDT7u-c-ibnQ=/adaptive-fit-in/1200x1200/filters:no_upscale():extract_cover():format(jpeg):quality(85)/https%3A%2F%2Fugc-media.4gamers.com.tw%2Fpuku-prod-zh%2Fanonymous-story%2F805d9a9c-e821-46f6-90da-42d0cb25f12f.jpg", // 預設的空頭像 URL
    Gmail: "a0983002223@gmail.com", // 預設的用戶名稱
  };

  const currentUser = user || defaultUser;

  return (
    <div className="custom-sidebar">
      <div className="custom-user-profile">
        <img
          src={currentUser.avatar || defaultUser.avatar}
          alt="User Avatar"
          className="custom-user-avatar"
        />
        <p className="custom-gmail">{currentUser.Gmail || defaultUser.Gmail}</p>
      </div>
      <ul className="custom-sidebar-menu">
        <li className="custom-sidebar-item">
          <FaUser className="custom-icon" />
          <a href="http://localhost:5173/member">我的帳戶</a>
        </li>
        <li className="custom-sidebar-item">
          <FaLock className="custom-icon" />
          <a href="http://localhost:5173/password">更改密碼</a>
        </li>
        <li className="custom-sidebar-item">
          <FaHistory className="custom-icon" />
          <a href="http://localhost:5173/orderlist">歷史訂單</a>
        </li>
        <li className="custom-sidebar-item">
          <FaGift className="custom-icon" />
          <a href="http://localhost:5173/point">紅利點數</a>
        </li>
        <li className="custom-sidebar-item">
          <FaHeart className="custom-icon" />
          <a href="http://localhost:5173/favorite">我的最愛</a>
        </li>
        {/* <li className="custom-sidebar-item">
          <FaReceipt className="custom-icon" />
          <a href="#member-invoice">會員載具</a>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
