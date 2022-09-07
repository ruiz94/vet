import React from "react";
import { Link } from "react-router-dom";

const ItemHour = ({ hour, handleClick, selectedHour }) => {
  const { unavailable, hour: itemHour, bookedHour, allowPrevious } = hour;

  const classes = `item-hour ${unavailable && "unavailable"} ${
    itemHour === selectedHour && "selected"
  } ${allowPrevious && (bookedHour ? "booked" : "unavailable")}`;
  const body = (
    <>
      <span>{itemHour}</span>
      <span>{bookedHour ? "Chosen" : "Choose"}</span>
    </>
  );
  const labelHour = allowPrevious ? (
    bookedHour ? (
      <Link className={classes} to="/appointments/detail/1">
        {body}
      </Link>
    ) : (
      <div className={classes}>{body}</div>
    )
  ) : (
    <div className={classes} onClick={() => handleClick(hour)}>
      {body}
    </div>
  );
  return labelHour;
};

export default ItemHour;
