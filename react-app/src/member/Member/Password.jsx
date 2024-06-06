import ChangePassword from "../ChangePassword";
import Sidebar from "../Sidebar";
import './Password.css';

function Password() {
  return (
    <div className="password-layout">
      <div className="password-sidebar">
        <Sidebar />
      </div>
      <div className="password-main">
        <ChangePassword />
      </div>
    </div>
  );
}

export default Password;
