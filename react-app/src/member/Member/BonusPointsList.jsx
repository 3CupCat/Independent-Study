import React from 'react';
import Sidebar from '../Sidebar';
import BonusPoints from '../BonusPoints';
import '../Member/BonusPointsList.css';

const BonusPointsList = () => {
  return (
    <div className="bonuspointslist-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content-container">
        <BonusPoints />
      </div>
    </div>
  );
};

export default BonusPointsList;
