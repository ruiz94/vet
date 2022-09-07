import React, { useContext, useState, useEffect } from "react";
import Table from "../../share/components/table/Table";
import { VetContext } from "../../share/context/context";
import "./Pets.scss";
const Pets = () => {
  const { pets, user } = useContext(VetContext);
  const [petStructured, setPetStructured] = useState({});

  useEffect(() => {
    let newPets = pets;
    const constructingItem = (item) => {
      const newITem = {
        id: item.id,
        owner: item.owner.name,
        pet: item.name,
        age: item.age,
        breed: item.breed,
        color: item.color,
        type: item.type,
        description: item.description,
      };
      if (user.name && user.role !== "admin") {
        delete newITem.owner;
      }
      return newITem;
    };
    const header = [
      "Owner",
      "Pet name",
      "Age",
      "Breed",
      "Color",
      "Type",
      "Description",
      "Actions",
    ];

    if (user.name && user.role !== "admin") {
      header.shift();
      newPets = pets.filter((item) => +item.owner.id === user.id);
    }
    newPets = newPets.map((item) => constructingItem(item));
    // console.log(newPets);
    setPetStructured({
      header,
      body: newPets,
    });
  }, [pets, user]);
  // console.log(pets, user);
  return (
    <div className="section-pets">
      <h2 className="title">
        All {user.name && user.role !== "admin" && "my "}pets
      </h2>
      <Table data={petStructured} />
    </div>
  );
};

export default Pets;
