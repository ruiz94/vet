import React, { useReducer, useEffect } from "react";

import { validate } from "../../utils/validator";
import "./Input.scss";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCHED":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({
  id,
  element,
  name,
  value,
  rows,
  type,
  placeholder,
  validators,
  error,
  onInput,
  className,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", value: event.target.value, validators });
  };
  const handlerBlur = () => dispatch({ type: "TOUCHED" });

  const { value: valueState, isValid } = state;
  useEffect(() => {
    if (element !== "static") {
      onInput({ id, value: valueState, isValid });
    }
  }, [id, valueState, isValid, onInput, element]);

  const input =
    element === "static" ? (
      <div className="text">{value}</div>
    ) : element === "input" ? (
      <input
        id={id}
        type={type}
        value={state.value}
        onChange={changeHandler}
        placeholder={placeholder}
        onBlur={handlerBlur}
      />
    ) : (
      <textarea
        rows={rows ? rows : "3"}
        id={id}
        value={state.value}
        onChange={changeHandler}
        onBlur={handlerBlur}
        placeholder={placeholder}
      ></textarea>
    );

  return (
    <div className={`item-input ${className}`}>
      <div>
        <label htmlFor={id}>
          <span>{name}</span> {className !== "input-login" && ":"}
        </label>
        {input}
      </div>
      {state.isTouched && !state.isValid && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
