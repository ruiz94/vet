import { useReducer, useCallback } from "react";

const reducer = (state, action) => {
  switch(action.type){
    case 'CHANGE_INPUT':

      let isValid = true;
      for(const inputId in state.inputs){
        if(!state.inputs[inputId]) continue
        if(inputId !== action.id && !state.inputs[inputId].isValid){
          isValid = false;
        }
        if(!isValid || !action.isValid){
          isValid = false;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {value: action.value, isValid: action.isValid}
        },
        isValid: isValid
      };
    case 'SET_DATA':
      return action.replaceState;
    default:
      return state;

  }
};

const useForm = (initialState) => {
  // console.log(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlerInput = useCallback(({id, value, isValid}) => {
    dispatch({type: "CHANGE_INPUT", id, value, isValid});
  }, []);

  const setData = useCallback((replaceState) => {
    dispatch({type: "SET_DATA", replaceState});
  }, [])

  return [state, handlerInput, setData];
};

export default useForm;
