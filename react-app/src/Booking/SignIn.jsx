import React, { useState } from "react";
import axios from "axios";
import "./Loginpage.css";

const REGISIER = "http://localhost:8080/user/register";
const Info = () => {
  const [account, setAccount] = useState("");
  const [passwd, setPasswd] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };
  const handlePasswdChange = (e) => {
    setPasswd(e.target.value);
  };
  const handleConfirmPasswdChange = (e) => {
    setconfirmPassword(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // 控制點：提交 => 發送POST請求將資料以 formData.append(key, value)方法傳遞出去
  // headers:{ 'Content-Type': 'multipart/form-data'}
  // email:資料表欄位名稱 <= email:前端變數名稱
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("account", account);
    formData.append("passwd", passwd);
    formData.append("confirmPassword", confirmPassword);
    formData.append("phone", phone);
    formData.append("email", email);

    // Java => 挑到的圖片轉成文字 data uri => base64 => 檔案大小加1/3
    // BLOB: Binary Large Object(長度: 255)
    // CLOB: Character Large Object => 存劇本、小說、留言、轉換成文字的圖片
    // axios.post(URL, formData, {header:{'Content-Type': 'multipart/form-data'}})
    // multipart/form-data 最大的用處在於使用者可以把複數個資料格式一次傳送（一個請求）出去
    // 使用 multipart/form-data 發出 POST 請求後，所傳送的資料會被轉成 multipart document format 格式
    // 每一組單位都會有自己的 Content-Disposition 及 Content-Type
    // 使用 axios 套件處理 http 請求，不需要特別更換標頭 => axios 會根據傳送的 body 自動幫開發者處理
    axios
      .post("http://localhost:8080/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <section>
      <form method="post" className="signin-box">
        <h2>註冊會員</h2>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="person"></ion-icon>
          </span>
          <input
            type="text"
            value={account}
            onChange={handleAccountChange}
            required
          />
          <label htmlFor="account">帳號</label>
        </div>

        <div className="input-box">
          <span className="icon">
            <ion-icon name="lock-closed"></ion-icon>
          </span>
          <input
            type="password"
            value={passwd}
            onChange={handlePasswdChange}
            required
          />
          <label htmlFor="passwd">密碼</label>
        </div>

        <div className="input-box">
          <span className="icon">
            <ion-icon name="document-lock"></ion-icon>
          </span>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswdChange}
            required
          />
          <label htmlFor="confirmPassword">確認密碼</label>
        </div>

        <div className="input-box">
          <span className="icon">
            <ion-icon name="phone-portrait"></ion-icon>
          </span>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
          <label htmlFor="phone">電話</label>
        </div>

        <div className="input-box">
          <span className="icon">
            <ion-icon name="mail-sharp"></ion-icon>
          </span>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label htmlFor="email">信箱</label>
        </div>

        <button className="signin-btn" onClick={handleSubmit}>
          註冊
        </button>

        <div className="login-link">
          <p>
            是否已有帳號?<a href="/login">登入</a>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Info;
