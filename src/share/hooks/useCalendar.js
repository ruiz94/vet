import { useState, useEffect, useCallback, useMemo } from "react";

const useCalendar = ({ noDaysBefore, allowPrevious, time }) => {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(null);
  const [textDate, setTextDate] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [btnPreviousAvailable, setBtnPreviousAvailable] = useState(false);
  const [totalHours, setTotalHours] = useState(null);

  const monthNames = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );
  var daysName = useMemo(
    () => [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    []
  );

  const getPreviousMont = () => {
    let newMonth = month;
    let newYear = year;
    if (month <= 1) {
      newYear--;
      newMonth = 12;
    } else {
      newMonth--;
    }
    let newDate = new Date(`${newMonth}/01/${newYear}`);
    setDate(newDate);
  };
  const getNextMonth = () => {
    let newMonth = month;
    let newYear = year;
    if (month >= 12) {
      newYear++;
      newMonth = 1;
    } else {
      newMonth++;
    }
    let newDate = new Date(`${newMonth}/01/${newYear}`);
    setDate(newDate);
  };

  useEffect(() => {
    let totalHours = 0;
    for (let i = time.start; i <= time.ends; i++) {
      totalHours++;
    }
    setTotalHours(totalHours);
  }, [time]);

  useEffect(() => {
    let today = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let textDate = monthNames[month] + " - " + year;

    setTextDate(textDate);
    setBtnPreviousAvailable(
      !allowPrevious
        ? today.getFullYear() !== year || today.getMonth() < month
        : true
    );
    setYear(year);
    setMonth(month + 1);
  }, [date, allowPrevious, monthNames]);

  useEffect(() => {
    let today = new Date();

    // Get the stored schedules
    // Pending ................
    const monthSchedule = [
      {
        numberDay: 15,
        hour: "10:00",
      },
      {
        numberDay: 15,
        hour: "11:00",
      },
      {
        numberDay: 15,
        hour: "12:00",
      },
      {
        numberDay: 15,
        hour: "10:00",
      },
      {
        numberDay: 15,
        hour: "10:00",
      },
      {
        numberDay: 15,
        hour: "10:00",
      },
      {
        numberDay: 15,
        hour: "10:00",
      },
      {
        numberDay: 15,
        hour: "10:00",
      },
      {
        numberDay: 15,
        hour: "10:00",
      },
      {
        numberDay: 15,
        hour: "10:00",
      },
    ];

    // Create the days of the calendar
    const numberOfDays = new Date(year, month, 0).getDate();
    const days = [];
    if (year && month) {
      for (let i = 0; i < numberOfDays; i++) {
        const reservedDays = monthSchedule
          .filter((el) => el.numberDay === i + 1)
          .map((el) => el.hour);
        let newDate = new Date(`${month}/${i + 1}/${year}`);
        let dayObj = {
          day: newDate.getDay(),
          nameDay: daysName[newDate.getDay()],
          numberDay: newDate.getDate(),
          nameMonth: monthNames[month - 1],
          month,
          year,
          permissions: {
            full: reservedDays.length !== totalHours,
            selectable: allowPrevious,
            available:
              !allowPrevious &&
              noDaysBefore &&
              newDate.getMonth() === today.getMonth() &&
              newDate.getFullYear() === today.getFullYear()
                ? newDate.getDate() >= today.getDate()
                : true,
            actualDay:
              today.getFullYear() === newDate.getFullYear() &&
              today.getMonth() === newDate.getMonth() &&
              today.getDate() === newDate.getDate(),
          },
        };
        days.push(dayObj);
      }
    }
    setDays(days);
  }, [
    year,
    month,
    allowPrevious,
    monthNames,
    daysName,
    noDaysBefore,
    totalHours,
  ]);

  const selectDay = (day) => {
    const monthSchedule = [
      {
        month: 12,
        nameDay: "Thursday",
        nameMonth: "January",
        numberDay: 18,
        year: 2021,
        hour: "10:00",
      },
      {
        month: 1,
        nameDay: "Thursday",
        nameMonth: "January",
        numberDay: 18,
        year: 2022,
        hour: "10:00",
      },
      {
        month: 1,
        nameDay: "Thursday",
        nameMonth: "January",
        numberDay: 20,
        year: 2022,
        hour: "10:00",
      },
      {
        month: 1,
        nameDay: "Thursday",
        nameMonth: "January",
        numberDay: 20,
        year: 2022,
        hour: "15:00",
      },
      {
        month: 1,
        nameDay: "Friday",
        nameMonth: "January",
        numberDay: 22,
        year: 2022,
        hour: "12:00",
      },
    ];
    let today = new Date();
    let todaySchedule = monthSchedule
      .filter((appointment) => appointment.numberDay === day.numberDay)
      .map((appointment) => appointment.hour);

    // Create the hours
    let hours = [];
    for (let i = time.start; i <= time.ends; i++) {
      let hour = i + ":00";
      let unavailable = false;
      let unbookedHour = true;
      let bookedHour = false;
      if (!allowPrevious) {
        unavailable =
          today.getDate() === day.numberDay && i < today.getHours() + 2;
        unbookedHour = !todaySchedule.find((el) => el === hour);
      } else {
        // console.log("lol", unavailable);
        bookedHour = !!todaySchedule.find((el) => el === hour);
      }
      if (unbookedHour) {
        hours.push({
          hour,
          unavailable,
          bookedHour,
          allowPrevious,
        });
      }
    }
    setSelectedDay(day);
    setHours(hours);
  };

  const deselectDay = () => {
    setSelectedDay(null);
    setHours(null);
    setSelectedHour(null);
  };

  const selectHour = ({ hour }) => {
    setSelectedHour(hour);
  };

  return {
    days,
    getPreviousMont,
    getNextMonth,
    textDate,
    btnPreviousAvailable,
    hours,
    selectedDay,
    selectDay,
    deselectDay,
    selectHour,
    selectedHour,
  };
};

export default useCalendar;
