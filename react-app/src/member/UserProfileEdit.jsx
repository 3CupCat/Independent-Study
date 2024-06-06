import React, { useState } from 'react';
import './UserProfileEdit.css';

const UserProfileEdit = () => {
  const [username, setUsername] = useState('twq3on9uk5');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('a0********@gmail.com');
  const [phone, setPhone] = useState('0983002223');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState({
    day: '1',
    month: '一月',
    year: '1990'
  });
  const [avatar, setAvatar] = useState('https://thumbor.4gamers.com.tw/IRblH-oHzo-DgsFGDT7u-c-ibnQ=/adaptive-fit-in/1200x1200/filters:no_upscale():extract_cover():format(jpeg):quality(85)/https%3A%2F%2Fugc-media.4gamers.com.tw%2Fpuku-prod-zh%2Fanonymous-story%2F805d9a9c-e821-46f6-90da-42d0cb25f12f.jpg');
  const [avatarFile, setAvatarFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    else if (name === 'name') setName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'phone') setPhone(value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleBirthDateChange = (e) => {
    const { name, value } = e.target;
    setBirthDate(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let avatarUrl = avatar;
    if (avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      avatarUrl = data.filePath;
    }

    const userInfo = { username, name, email, phone, gender, birthDate, avatar: avatarUrl };
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="user-profile-edit">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">使用者帳號</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            disabled
          />
          <small>使用者名稱僅能修改一次。</small>
        </div>
        <div className="form-group">
          <label htmlFor="name">姓名</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="phone">手機號碼</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group half-width">
            <label>性別</label>
            <div className="gender-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="男性"
                  checked={gender === '男性'}
                  onChange={handleGenderChange}
                />
                男性
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="女性"
                  checked={gender === '女性'}
                  onChange={handleGenderChange}
                />
                女性
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="其他"
                  checked={gender === '其他'}
                  onChange={handleGenderChange}
                />
                其他
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>生日</label>
          <div className="birthdate-select">
            <select name="day" value={birthDate.day} onChange={handleBirthDateChange}>
              {[...Array(31).keys()].map(i => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select name="month" value={birthDate.month} onChange={handleBirthDateChange}>
              {['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'].map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
            <select name="year" value={birthDate.year} onChange={handleBirthDateChange}>
              {Array.from({ length: 100 }, (_, i) => 1920 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="save-button">儲存</button>
      </form>
      <div className="profile-image">
        <img src={avatar} alt="User Avatar" className="user-avatar-large" />
        <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleAvatarChange} />
        <label htmlFor="file-upload" className="upload-button">選擇圖片</label>
        <p>檔案大小: 最大1MB</p>
        <p>檔案限制: .JPEG, .PNG</p>
      </div>
    </div>
  );
};

export default UserProfileEdit;
