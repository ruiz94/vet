import React from "react";
import "./ItemCalendar.scss";

const ItemCalendar = ({
  numberDay,
  nameDay,
  day,
  year,
  nameMonth,
  month,
  maxNumber,
  chooseDay,
  permissions,
}) => {
  const margin = numberDay === 1 ? day * 101 : 0;

  const handleClick = () => {
    let day = {
      nameDay,
      numberDay,
      month,
      nameMonth,
      year,
    };
    chooseDay(day);
  };

  let classes = `item-calendar ${nameDay === "Sunday" && "no-work-day"} ${
    nameDay === "Saturday" && "saturday"
  } ${numberDay >= maxNumber && "under"} ${
    !permissions.available && "no-available"
  } ${!permissions.full && "full-day"} ${
    permissions.actualDay && "actualDay"
  } ${!permissions.selectable && !permissions.full && "not-selectable"}`;
  classes = classes.replace(/false/gi, "");

  return (
    <div
      className={classes}
      style={{ marginLeft: margin }}
      onClick={handleClick}
    >
      <span className="day">{numberDay}</span>
      <span className="name">{nameDay}</span>
    </div>
  );
};

export default ItemCalendar;
