import React from "react";

import Button from "../../share/components/formElements/Button";
import Input from "../../share/components/formElements/Input";
import "./searchResults.scss";

const SearchResults = ({
  owner: { name, email, address, phone },
  cleanOwner,
}) => {
  return (
    <div className="results">
      <div className="btns-actions">
        <Button to="/appointments/new">
          New appointments
        </Button>
        <Button to="/pets/new" className="m-left">
          New pet
        </Button>
      </div>
      <div className="information">
        <Input name="Name" element="static" value={name} />
        <Input name="Email" element="static" value={email} />
        <Input name="Address" element="static" value={address} />
        <Input name="Phone" element="static" value={phone} />
      </div>
      <div className="btn-clean">
        <button type="button" onClick={cleanOwner}>
          Clean owner
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
