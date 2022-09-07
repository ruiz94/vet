import React, { useContext, useEffect, useState } from "react";

import { VetContext } from "../../share/context/context";
import Table from "../../share/components/table/Table";

import "./Appointments.scss";

const Appointments = () => {
  const { appointments, user } = useContext(VetContext);
  const [appointmentsStructured, setAppointmentsStructured] = useState({});
  // console.log(user, appointments);
  useEffect(() => {
    const constructingItem = (item) => {
      const newITem = {
        id: item.id,
        owner: item.owner.name,
        pet: item.pet.name,
        date: `${item.date.numberDay}/${item.date.month}/${item.date.year}`,
        hour: item.date.hour,
        reason: item.reason,
        status: item.status,
      };
      if (user.name && user.role !== "admin") {
        delete newITem.owner;
      }
      return newITem;
    };
    let header = [
      "Owner",
      "Pet",
      "Date",
      "Hour",
      "Reason",
      "Status",
      "Actions",
    ];
    let newAppointments = appointments;

    /** if user exist and user's role is different from admin
     * filter by user ID
     * cut the first element from the header array
     */
    if (user.name && user.role !== "admin") {
      header.shift();
      newAppointments = appointments.filter(
        (item) => +item.owner.id === user.id
      );
    }
    newAppointments = newAppointments.map((item) => constructingItem(item));

    setAppointmentsStructured({
      body: newAppointments,
      header,
    });
  }, [appointments, user]);
  return (
    <div className="section-appointments">
      <h2 className="title">
        All {user.name && user.role !== "admin" && "my "}appointments
      </h2>
      <Table data={appointmentsStructured} />
    </div>
  );
};

export default Appointments;
