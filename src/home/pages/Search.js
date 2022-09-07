import React, { useState, useContext } from "react";
import { VetContext } from "../../share/context/context";

import SearchResults from "../components/SearchResults";
import Button from "../../share/components/formElements/Button";

import "./search.scss";

const owners = [
  {
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
        image: "https://i.pinimg.com/originals/79/b9/ec/79b9ecd88a26a8091d37594d164c5de2.jpg"
      },
      {
        name: "Jovani",
        age: 2,
        breed: "Amazonian",
        color: "Green",
        description: "He is a slowly and sleepy iguana",
        type: "Reptile",
        weight: 2.1,
        image: "https://imgcom.masterd.es/12/blog/2017/10/38374.jpg"
      }
    ],
    appointments: [],
    email: "fernando@mail.com",
    phone: "8341254565",
  },
];

const Search = () => {
  const [email, setEmail] = useState("");
  const [ownerNotFound, setOwnerNotFound] = useState(false);
  const { selectedOwner, storeOwner } = useContext(VetContext);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    setOwnerNotFound(false);
    const owner = owners.filter((owner) => owner.email === email);
    if (owner[0] !== null && owner[0] !== undefined) {
      storeOwner(owner[0]);
    } else {
      setOwnerNotFound(true);
      setEmail('');
    }
  };

  const handleCleanOwner = () => {
    setEmail("")
    storeOwner({});
  };

  return (
    <div className="search-section">
      {selectedOwner && selectedOwner.name ? (
        <SearchResults owner={selectedOwner} cleanOwner={handleCleanOwner} />
      ) : (
        <form onSubmit={handleSubmitForm}>
          <label htmlFor="search">
            E-mail owner
            {ownerNotFound && (
              <span className="err">Owner not found</span>
            )}
          </label>
          <input
            type="email"
            placeholder="owner@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="btns">
            <Button type="submit">
              Search
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Search;
