import React from "react";

import './Home.scss';
import Calendar from "../../share/components/calendar/Calendar";

const Home = () => {
  return <div className="home-section">
    <Calendar allowPrevious />
  </div>;
};

export default Home;
