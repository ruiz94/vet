import React, { useContext, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { useHistory } from "react-router-dom";

import { VetContext } from "../../share/context/context";
import HeadTitleForm from "../../share/components/HeadTitleForm";
import OwnerInfo from "../../share/components/OwnerInfo";
import PetCards from "../components/PetCards";
import Calendar from "../../share/components/calendar/Calendar";

import "./NewAppointment.scss";
import Input from "../../share/components/formElements/Input";
import useForm from ".././../share/hooks/useForm";
import { VALIDATOR_MINLENGHT } from "../../share/utils/validator";


const NewAppointment = () => {
  const { selectedOwner, storeAppointment } = useContext(VetContext);
  const history = useHistory();
  const [selectedPet, setSelectedPet] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [ state, handlerInput ] = useForm({
    inputs: {
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  if (!selectedOwner.name) {
    history.push("/search");
    return <div>Loading...</div>;
  }

  const handleSubmitForm = () => {
    const { email, phone, name } = selectedOwner;
    const newAppointment = {
      id: uuidv4(),
      owner: {
        id: "1",
        email,
        phone,
        name,
      },
      date: selectedDate.date,
      pet: selectedPet,
      reason: state.inputs.description.value,
      status: 'pending'
    };
    // console.log(newAppointment);
    storeAppointment(newAppointment);
    history.push("/");
  };
  return (
    <div className="new-appointment">
      <OwnerInfo name={selectedOwner.name} email={selectedOwner.email} />
      <HeadTitleForm name="Pets" subtitle="Select a pet" />
      {!selectedPet && (
        <PetCards pets={selectedOwner.pets} selectPet={setSelectedPet} />
      )}

      {selectedPet && (
        <div className="selectedPet">
          <div className="image">
            <img src={selectedPet.image} alt="pet selected" />
          </div>
          <div className="info">
            <div>
              Name: <span>{selectedPet.name}</span>
            </div>
            <div>
              Age: <span>{selectedPet.age}</span>
            </div>
            <div>
              Color: <span>{selectedPet.color}</span>
            </div>
            <div>
              Type: <span>{selectedPet.type}</span>
            </div>
            <div>
              Breed: <span>{selectedPet.breed}</span>
            </div>
            <div>
              Weight: <span>{selectedPet.weight}</span>
            </div>
          </div>
        </div>
      )}
      {selectedPet && (
        <>
          <HeadTitleForm name="Reason" subtitle="Describe the reason" />
          <Input
            id="description"
            element="textarea"
            name="Description"
            value={state.inputs.description.value}
            type="textarea"
            error="At least 5 characters must be introduce."
            onInput={handlerInput}
            validators={[VALIDATOR_MINLENGHT(20)]}
            placeholder="Introduce at least 20 characters describing the reason."
          />
        </>
      )}
      {state.isValid && selectedPet && (
        <>
          <HeadTitleForm name="Date" subtitle="Select a date" />
          <Calendar noDaysBefore selectDate={setSelectedDate} />
          <div className="section-btn">
            <button
              onClick={handleSubmitForm}
              className={`button ${
                (!selectedDate || !selectedDate.complete) && "disabled"
              }`}
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewAppointment;
