import React from "react";

import useCalendar from "../../hooks/useCalendar";
import ItemCalendar from "./ItemCalendar";
import ItemHour from "./ItemHour";
import "./Calendar.scss";

const Calendar = ({ allowPrevious, noDaysBefore, selectDate }) => {
  // noDaysBefore = { noDaysBefore };
  const {
    days,
    textDate,
    getPreviousMont,
    getNextMonth,
    btnPreviousAvailable,
    hours,
    selectedDay,
    selectDay,
    deselectDay,
    selectHour,
    selectedHour,
  } = useCalendar({
    noDaysBefore,
    allowPrevious,
    time: {
      start: 8,
      ends: 17,
    },
  });

  /** This is for underline the latest day box of the calendar */
  let maxNumber = undefined;
  if (days.length) {
    if (days[days.length - 1].numberDay === 31) {
      maxNumber = 25;
    } else if (days[days.length - 1].numberDay === 30) {
      maxNumber = 24;
    } else {
      maxNumber = 22;
    }
  }

  const handleClickDay = (day) => {
    selectDay(day);
  };
  const handleClickHour = (hour) => {
    selectHour(hour);
    if(allowPrevious) return null;
    selectDate({
      date: {
        ...selectedDay,
        hour: hour.hour,
      },
      complete: selectedDay && !!hour,
    });
  };
  const handleDeselectHour = () => {
    deselectDay();
    if(allowPrevious) return null;
    selectDate({
      complete: false,
    });
  };

  /** This is to define a hight for the hours container */
  const stylesHours = {
    height: hours ? Math.ceil(hours.length / 2) * 60 + "px" : 0,
  };

  /** This is to get the proper name of the number day */
  const getTextDate = ({ nameDay, numberDay, nameMonth, year }) => {
    let pref;
    let day = String(numberDay);
    if (numberDay > 20) {
      day = day[day.length - 1];
    }
    switch (day) {
      case "1":
        pref = "st";
        break;
      case "2":
        pref = "nd";
        break;
      case "3":
        pref = "rd";
        break;
      default:
        pref = "th";
    }
    return `${nameDay} ${numberDay + pref} ${nameMonth} ${year}`;
  };

  return (
    <div className="calendar">
      {!selectedDay && (
        <>
          <div className="controls">
            {btnPreviousAvailable ? (
              <div className="item">
                <button className="btn" onClick={getPreviousMont}>
                  {`< Previous`}
                </button>
              </div>
            ) : (
              <div className="item"></div>
            )}

            <div className="actualDate item">{textDate}</div>
            <div className="item">
              <button className="btn" onClick={getNextMonth}>
                {`Next >`}
              </button>
            </div>
          </div>
          <div className="labels">
            <span className="item">
              No work day<span className="no-work"></span>
            </span>
            <span className="item">
              No available day<span className="no-available"></span>
            </span>
            <span className="item">
              Full day<span className="full"></span>
            </span>
            <span className="item">
              Available day<span className="available"></span>
            </span>
          </div>
          <div className="days">
            {days &&
              days.map((day) => (
                <ItemCalendar
                  key={day.numberDay}
                  {...day}
                  maxNumber={maxNumber}
                  chooseDay={handleClickDay}
                />
              ))}
          </div>
        </>
      )}
      {selectedDay && (
        <div className="section-hours">
          <div className="chosen-date">
            Chosen Date: {getTextDate(selectedDay)}
            {selectedHour && (
              <span className="selected-hour"> - {selectedHour} Hrs</span>
            )}
          </div>
          <div className="hours-controls">
            <button onClick={handleDeselectHour}>Return</button>
            <h2>Select an Hour</h2>
          </div>
          <div className="hours" style={stylesHours}>
            {hours &&
              hours.map((hour, index) => <ItemHour key={index} hour={hour} handleClick={handleClickHour} selectedHour={selectedHour} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
