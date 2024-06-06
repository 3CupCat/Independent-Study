import Sidebar from "../Sidebar";
import UserProfileEdit from "../UserProfileEdit";
import './Profile.css';

function Profile() {
  return (
    <div className="profile-layout">
      <div className="profile-sidebar">
        <Sidebar />
      </div>
      <div className="profile-content">
        <UserProfileEdit />
      </div>
    </div>
  );
}

export default Profile;
