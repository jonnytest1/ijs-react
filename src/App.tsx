import React, { useEffect, useReducer, useState } from 'react';
import { FormState, PersonsState } from './state';
import List from './List';
import { loadPersons } from './PersonApi';
import { initialState, personsReducer } from './store/persons-reducer';
import { UpdatePersonsAction } from './store/person-actions';
import { formsReducer, initialFormState } from './store/form-reducer';


const App: React.FC = () => {
  useEffect(()=>{
    loadPersons().then(p=>{
      dispatch(new UpdatePersonsAction(p))
    })
  },[])
  const [state,dispatch]=useReducer(personsReducer,initialState)
  const [formState,formDispatch]=useReducer(formsReducer,initialFormState)
  
  const context={
    data:state,
    dispatch
  }
  const formContext={
    data:formState,
    dispatch:formDispatch
  }
  return <PersonsState.Provider value={context}>
    <FormState.Provider value={formContext}>
      <List />;
    </FormState.Provider>
  </PersonsState.Provider>
};

export default App;
