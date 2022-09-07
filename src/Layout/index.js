import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { VetContext } from "../share/context/context";
import "./layout.scss";
import Button from "../share/components/formElements/Button";

const Index = ({ children }) => {
  const { user, login } = useContext(VetContext);

  return (
    <div className="vet-main">
      <header>
        <div className="logo">Vet</div>
        <div className="header-actions">
          <div className="userName">{user && user.name}</div>
          <div className="buttons">
            <Button type="button" className="mini" onClick={() => login(null)}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main>
        <aside>
          {user && user.role === "admin" ? (
            <>
              <NavLink className="item" exact to="/" activeClassName="selected">
                Calendar
              </NavLink>
              <NavLink className="item" to="/search" activeClassName="selected">
                Search Owner
              </NavLink>
              <NavLink
                className="item"
                to="/appointments"
                activeClassName="selected"
              >
                Appointments
              </NavLink>
              <NavLink
                className="item"
                to="/pets"
                activeClassName="selected"
              >
                Pets
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className="item"
                to="/appointments/my-appointments"
                activeClassName="selected"
              >
                My Appointments
              </NavLink>
              <NavLink
                className="item"
                to="/pets/my-pets"
                activeClassName="selected"
              >
                My Pets
              </NavLink>
            </>
          )}
        </aside>
        <div className="children">{children}</div>
      </main>
    </div>
  );
};

export default Index;
