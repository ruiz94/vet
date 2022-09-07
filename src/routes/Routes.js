import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "../Layout/index";

import Home from "../home/pages/Home";
import Search from "../home/pages/Search";
import NewPet from "../pets/pages/NewPet";
import Pets from "../pets/pages/Pets";
import Appointments from "../appointments/pages/Appointments";
import NewAppointment from "../appointments/pages/NewAppointment";
import Authentication from "../Auth/Authentication";

import { VetContext } from "../share/context/context";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const stateReducer = (state, action) => {
  switch (action.type) {
    case "STORE_OWNER":
      return {
        ...state,
        selectedOwner: action.payload,
      };
    case "STORE_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
const defaultOwner = {
  name: "Fernando",
  address: "Av. Reforma, col. Satelite",
  pets: [
    {
      name: "Goliat",
      age: 4,
      breed: "Pastor Aleman",
      color: "Black",
      description: "He is a playful dog",
      type: "Canine",
      weight: 5.6,
      image:
        "https://i.pinimg.com/originals/79/b9/ec/79b9ecd88a26a8091d37594d164c5de2.jpg",
    },
    {
      name: "Govani",
      age: 2,
      breed: "Amazonian",
      color: "Green",
      description: "He is a slowly and sleepy iguana",
      type: "Reptile",
      weight: 2.1,
      image: "https://imgcom.masterd.es/12/blog/2017/10/38374.jpg",
    },
  ],
  appointments: [],
  email: "fernando@mail.com",
  phone: "8341254565",
};
const defaultAppointments = [
  {
    id: "c391f2ed-ff79-4ddf-8d96-b313e83fdcee",
    owner: {
      id: "1",
      email: "fernando@mail.com",
      phone: "8341254565",
      name: "Fernando",
    },
    date: {
      nameDay: "Friday",
      numberDay: 21,
      month: 1,
      nameMonth: "January",
      year: 2022,
      hour: "11:00",
    },
    pet: {
      name: "Goliat",
      age: 4,
      breed: "Pastor Aleman",
      color: "Black",
      description: "He is a playful dog",
      type: "Canine",
      weight: 5.6,
      image:
        "https://i.pinimg.com/originals/79/b9/ec/79b9ecd88a26a8091d37594d164c5de2.jpg",
    },
    reason:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A laborum dolore at quia eum quo quibusdam quidem pariatur aliquam culpa dolores, assumenda laudantium ut esse, quos sit veniam facere alias.",
    status: "pending",
  },
  {
    id: "8443db8f-ff4b-4fad-9f83-9e0816090b17",
    owner: {
      id: "1",
      email: "fernando@mail.com",
      phone: "8341254565",
      name: "Fernando",
    },
    date: {
      nameDay: "Friday",
      numberDay: 21,
      month: 1,
      nameMonth: "January",
      year: 2022,
      hour: "14:00",
    },
    pet: {
      name: "Govani",
      age: 2,
      breed: "Amazonian",
      color: "Green",
      description: "He is a slowly and sleepy iguana",
      type: "Reptile",
      weight: 2.1,
      image: "https://imgcom.masterd.es/12/blog/2017/10/38374.jpg",
    },
    reason: "zxczczxczxccxzczcxzczxc",
    status: "pending",
  },
  {
    id: "6b2cc437-1069-482a-8e6f-a07ec9bf9fb8",
    owner: {
      id: "2",
      email: "arturo@mail.com",
      phone: "8341254565",
      name: "Arturo",
    },
    date: {
      nameDay: "Friday",
      numberDay: 21,
      month: 1,
      nameMonth: "January",
      year: 2022,
      hour: "10:00",
    },
    pet: {
      name: "Iguano",
      age: 4,
      breed: "Reptile",
      color: "Dark Green",
      description: "He is a big reptile",
      type: "Reptile",
      weight: 4.2,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Portrait_of_an_Iguana.jpg/800px-Portrait_of_an_Iguana.jpg",
    },
    reason: "xzczxc zxc zc zxcz cz cz cz zxc",
    status: "pending",
  },
];
const defaultUser = {
  id: 1,
  name: "Fernando",
  role: "admin",
};
const defaultPets = [
  {
    id: 1,
    name: "Goliat",
    age: 4,
    breed: "Pastor Aleman",
    color: "Black",
    description: "He is a playful dog",
    type: "Canine",
    weight: 5.6,
    image:
      "https://i.pinimg.com/originals/79/b9/ec/79b9ecd88a26a8091d37594d164c5de2.jpg",
    owner: {
      id: "1",
      email: "fernando@mail.com",
      phone: "8341254565",
      name: "Fernando",
    },
  },
  {
    id: 2,
    name: "Govani",
    age: 2,
    breed: "Amazonian",
    color: "Green",
    description: "He is a slowly and sleepy iguana",
    type: "Reptile",
    weight: 2.1,
    image: "https://imgcom.masterd.es/12/blog/2017/10/38374.jpg",
    owner: {
      id: "1",
      email: "fernando@mail.com",
      phone: "8341254565",
      name: "Fernando",
    },
  },
  {
    id: 3,
    name: "Iguano",
    age: 4,
    breed: "Reptile",
    color: "Dark Green",
    description: "He is a big reptile",
    type: "Reptile",
    weight: 4.2,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Portrait_of_an_Iguana.jpg/800px-Portrait_of_an_Iguana.jpg",
    owner: {
      id: "2",
      email: "arturo@mail.com",
      phone: "8341254565",
      name: "Arturo",
    },
  },
];
const Routes = () => {
  const [state, dispatch] = useReducer(stateReducer, {
    selectedOwner: defaultOwner,
    appointments: defaultAppointments,
    user: null,
    pets: defaultPets,
  });

  const storeOwner = (owner) =>
    dispatch({ type: "STORE_OWNER", payload: owner });

  const storeAppointment = (data) =>
    dispatch({ type: "STORE_APPOINTMENT", payload: data });

  const login = (data) => dispatch({ type: "LOGIN", payload: data });

  // console.log(state.appointments);
  const routes = state.user ? (
    state.user.role === "admin" ? (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
          <Route path="/pets" exact component={Pets} />
          <Route path="/pets/new" exact component={NewPet} />
          <Route path="/appointments" exact component={Appointments} />
          <Route path="/appointments/new" exact component={NewAppointment} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    ) : (
      <Layout>
        <Switch>
          <Route path="/pets/my-pets" exact component={Pets} />
          <Route path="/pets/new" exact component={NewPet} />
          <Route path="/appointments/new" exact component={NewAppointment} />
          <Route
            path="/appointments/my-appointments"
            exact
            component={Appointments}
          />
          <Redirect to="/appointments/my-appointments" />
        </Switch>
      </Layout>
    )
  ) : (
    <Switch>
      <Route path="/login" exact component={Authentication} />
      <Redirect to="/login" />
    </Switch>
  );
  return (
    <VetContext.Provider
      value={{
        selectedOwner: state.selectedOwner,
        appointments: state.appointments,
        storeOwner,
        storeAppointment,
        user: state.user,
        pets: state.pets,
        login
      }}
    >
      <Router>{routes}</Router>
    </VetContext.Provider>
  );
};

export default Routes;
