import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import "../pages/Loginpage.css";
import { Spinner } from '@chakra-ui/react';

const LOGIN_URL = "http://localhost:8080/user/login";

const Login = () => {
  const [account, setAccount] = useState("");
  const [passwd, setPasswd] = useState("");
  const [error, setError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };

  const handlePasswdChange = (e) => {
    setPasswd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account || !passwd) {
      setError('請輸入帳號和密碼');
      return;
    }
    setError('');
    setLoginMessage('');
    setLoading(true);
    try {
      const response = await axios.post(LOGIN_URL, {
        account: account,
        passwd: passwd
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      Cookies.set('token', response.data, { expires: 1 });
      setLoginMessage('登錄成功');
      setTimeout(() => {
        setLoading(false); // 停止加載
        const redirectTo = location.state?.from?.pathname || '/';
        navigate(redirectTo); // 登錄成功後跳轉到上個頁面
      }, 1000);
    } catch (error) {
      setLoading(false); // 停止加載
      if (error.response) {
        const errorMsg = typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data);
        setError(errorMsg);
      } else if (error.request) {
        setError('無法連接到服務器');
      } else {
        setError('請求發生錯誤');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      // 打印 token 到控制台
      console.log("Google ID Token:", token);

      const response = await axios.post('http://localhost:8080/user/google-login', { tokenId: token }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      Cookies.set('token', response.data.token, { expires: 1 });

      setLoginMessage('Google 登錄成功');
      setTimeout(() => {
        setLoading(false);
        const redirectTo = location.state?.from?.pathname || '/';
        navigate(redirectTo);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError('Google 登錄失敗');
      console.error(error);
    }
  };

  return (
    <section className="login-container">
      <form method="post" className="login-box" onSubmit={handleSubmit}>
        <h2>會員登入</h2>
        <div className="input-box">
          <span className="icon">
            <ion-icon name="person"></ion-icon>
          </span>
          <input
            type="text"
            value={account}
            onChange={handleAccountChange}
            required
            disabled={loading} // 登錄中禁用輸入框
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
            disabled={loading} // 登錄中禁用輸入框
          />
          <label htmlFor="passwd">密碼</label>
        </div>

        <div className="remember-forget">
          <label>
            <input type="checkbox" disabled={loading} /> {/* 登錄中禁用復選框 */}
            記住我
          </label>
          <a href="#">忘記密碼?</a>
        </div>

        <button className="login-btn" type="submit" disabled={loading}> {/* 登錄中禁用按鈕 */}
          {loading ? <Spinner size="sm" /> : '登入'} {/* 根據 loading 狀態顯示轉圈圈或"登入" */}
        </button>

        {/* <div className="google-login">
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            width="320px"  
            height="50px"  
            backgroundColor="white"
            color="#4285F4"
            border="1px solid #4285F4"
            _hover={{ backgroundColor: '#f5f5f5' }}
            _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
                style={{ marginRight: '8px' }}
              >
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.4 0 6.2 1.2 8.3 3.2l6.1-6.1C34.5 2.9 29.6 0 24 0 14.6 0 6.6 5.8 2.7 14.1l7 5.4C11.4 12.1 17 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.6c-.5 2.5-2 4.6-4.2 6l6.4 5c3.7-3.4 5.7-8.5 5.7-14.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.7 29.5c-1-2.5-1.6-5.2-1.6-8s.6-5.5 1.6-8l-7-5.4C2.1 12.9 0 18.3 0 24s2.1 11.1 5.7 15.4l7-5.4z"
                />
                <path
                  fill="#EA4335"
                  d="M24 48c6.4 0 11.8-2.1 15.7-5.7l-6.4-5c-2.1 1.4-4.7 2.3-7.6 2.3-6 0-11.1-4.1-12.9-9.6l-7 5.4C6.6 42.2 14.6 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
            }
          >
            使用 Google 登錄
          </Button>
        </div> */}

        <div className="register-link">
          <p>
            尚未有帳號？<a href="/signup">註冊</a>
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {loginMessage && <div className="success-message">{loginMessage}</div>}
      </form>
    </section>
  );
};

export default Login;