import { createContext } from "react";

export const VetContext = new createContext({
  selectedOwner: {},
  storeOwner: () => {},
  appointments: [],
  storeAppointment: () => {},
  user: {},
  pets: []
});
