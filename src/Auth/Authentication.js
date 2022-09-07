import React, { useState, useContext, useMemo } from "react";

import Input from "../share/components/formElements/Input";
import Button from "../share/components/formElements/Button";

import useForm from "../share/hooks/useForm";
import { VetContext } from "../share/context/context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGHT,
  VALIDATOR_REQUIRED,
} from "../share/utils/validator";

import "./Authentication.scss";

const Authentication = () => {
  const {login} = useContext(VetContext);
  const defaultFormInputs = useMemo(() => ({
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
  }), []);

  const [state, handlerInput, setData] = useForm({
    inputs: defaultFormInputs,
    isValid: false,
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => setIsLogin((prev) => {
    if (!isLogin) {
      setData({
        inputs: { ...state.inputs, name: undefined },
        isValid: state.isValid,
      });
    } else {
      setData({
        inputs: {
          ...state.inputs,
          name: { value: "", isValid: false },
        },
        isValid: false,
      });
    }
    return !prev
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      id: 1,
      name: "Fernando",
      role: "admin",
    }
    // console.log(user);
    login(user);
  }

  return (
    <div className="layout-auth">
      <form className="card" onSubmit={handleSubmit}>
        <h2>{isLogin ? "LOG IN" : "SIGN UP"}</h2>
        {!isLogin && state.inputs.name && (
          <Input
            id="name"
            name="Name"
            type="text"
            element="input"
            className="input-login"
            onInput={handlerInput}
            validators={[VALIDATOR_REQUIRED()]}
            error="You must enter a name"
            value={state.inputs.name.value}
          />
        )}
        <Input
          id="email"
          name="Email"
          type="text"
          element="input"
          className="input-login"
          onInput={handlerInput}
          validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRED()]}
          error="You must enter a valid email"
        />
        <Input
          id="password"
          name="Password"
          type="password"
          element="input"
          className="input-login"
          onInput={handlerInput}
          validators={[VALIDATOR_MINLENGHT(5)]}
          error="You must enter a valid password"
        />
        {isLogin ? (
          <>
            <Button className={`${!state.isValid && "disabled"}`} type="submit">
              LOGIN
            </Button>
            <p className="switch">
              Don't have an account?{" "}
              <button
                className="btn-switch"
                type="button"
                onClick={handleSwitch}
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <Button className={`${!state.isValid && "disabled"}`} type="submit">
              SIGNUP
            </Button>
            <p className="switch">
              Have an account?{" "}
              <button
                className="btn-switch"
                type="button"
                onClick={handleSwitch}
              >
                Log In
              </button>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default Authentication;
