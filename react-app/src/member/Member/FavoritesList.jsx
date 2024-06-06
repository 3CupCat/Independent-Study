import React from 'react';
import Sidebar from '../Sidebar';
import Favorites from '../Favorites';
import './FavoritesList.css';

const FavoritesList = () => {
  return (
    <div className="favoriteslist-layout">
      <div className="favoriteslist-sidebar">
        <Sidebar />
      </div>
      <div className="favoriteslist-content">
        <Favorites />
      </div>
    </div>
  );
};

export default FavoritesList;
