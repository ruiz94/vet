import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import {
  VALIDATOR_REQUIRED,
  VALIDATOR_MINLENGHT,
} from "../../share/utils/validator";
import Input from "../../share/components/formElements/Input";
import Button from "../../share/components/formElements/Button";
import useForm from "../../share/hooks/useForm";
import { VetContext } from "../../share/context/context";
import OwnerInfo from "../../share/components/OwnerInfo";
import HeadTitleForm from "../../share/components/HeadTitleForm";

import "./NewPet.scss";
import ImgDefault from '../../assets/images/default.jpg';

const NewPet = () => {
  const { selectedOwner } = useContext(VetContext);
  const history = useHistory();
  const [state, handlerInput] = useForm({
    inputs: {
      name: {
        value: "",
        isValid: false,
      },
      age: {
        value: 0,
        isValid: false,
      },
      color: {
        value: "",
        isValid: false,
      },
      breed: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      weight: {
        value: 0,
        isValid: false,
      },
    },
    isValid: false,
  });

  // Redirect to search an owner if does not exist
  if (!selectedOwner.name) {
    history.push("/search");
  }

  const handlerSubmit = (event) => {
    event.preventDefault();

    if(!state.isValid){
      alert('Form must be completed');
      return;
    }

    const newPet = {
      name: state.inputs.name.value,
      age: state.inputs.age.value,
      breed: state.inputs.breed.value,
      color: state.inputs.color.value,
      description: state.inputs.description.value,
      type: state.inputs.type.value,
      weight: state.inputs.weight.value,
    }

    // console.log(newPet);
  }

  return (
    <div className="newPet">
      <h3 className="title">New pet</h3>
      <OwnerInfo name={selectedOwner.name} email={selectedOwner.email} />

      <HeadTitleForm name="Pet" />
      <form onSubmit={handlerSubmit}>
        <div className="three-col">
          <Input
            id="name"
            type="text"
            element="input"
            name="Name"
            validators={[VALIDATOR_REQUIRED()]}
            error="Field required"
            onInput={handlerInput}
          />
          <Input
            id="age"
            type="number"
            element="input"
            name="Age"
            validators={[VALIDATOR_REQUIRED()]}
            error="Field required"
            onInput={handlerInput}
          />
          <Input
            id="color"
            type="text"
            element="input"
            name="Color"
            validators={[VALIDATOR_REQUIRED()]}
            error="Field required"
            onInput={handlerInput}
          />
          <Input
            id="breed"
            type="text"
            element="input"
            name="Breed"
            validators={[VALIDATOR_REQUIRED()]}
            error="Field required"
            onInput={handlerInput}
          />
          <Input
            id="type"
            type="text"
            element="input"
            name="Type"
            validators={[VALIDATOR_REQUIRED()]}
            error="Field required"
            onInput={handlerInput}
          />
          <Input
            id="weight"
            type="number"
            element="input"
            name="Weight"
            validators={[VALIDATOR_REQUIRED()]}
            error="Field required"
            onInput={handlerInput}
          />
        </div>
        <div className="two-col">
          <div className="item-col upload-image">
            <div className="button-upload">
              <label htmlFor="picture">Upload Image</label>
              <input type="file" id="picture" />
            </div>
            <img src={ImgDefault} alt="pet" />
          </div>
          <div className="item-col description">
            <Input
              id="description"
              name="Description"
              rows="10"
              element="textarea"
              validators={[VALIDATOR_MINLENGHT(5)]}
              error="5 min characters are required"
              onInput={handlerInput}
            />
          </div>
        </div>
        <div className="btn-save">
          <Button type="submit"  className={`${!state.isValid && 'disabled'}`}>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default NewPet;
