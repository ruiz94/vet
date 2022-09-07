import React from 'react'

import './PetCards.scss';
const PetCards = ({pets, selectPet}) => {
  return (
    <div className='pet-cards'>
      {pets.length && pets.map((pet, index) => (
        <div className='card' key={index} onClick={() => selectPet(pet)}>
          <div className="image">
            <img src={pet.image} alt="pet" />
          </div>
          <div className="info">
            <span>Name: {pet.name}</span>
            <span>Breed: {pet.breed}</span>
            <span>Color: {pet.color}</span>
            <span>Weight: {pet.weight}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PetCards
