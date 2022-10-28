import React, { useEffect, useReducer, useState } from 'react';
import { testContext } from './state';
import List from './List';
import { loadPersons } from './PersonApi';
import { initialState, personsReducer } from './store/persons-reducer';
import { UpdatePersonsAction } from './store/actions';


const App: React.FC = () => {
  useEffect(()=>{
    loadPersons().then(p=>{
      dispatch(new UpdatePersonsAction(p))
    })
  },[])
  const [state,dispatch]=useReducer(personsReducer,initialState)
  
  const context={
    data:state.persons,
    dispatch
  }
  return <testContext.Provider value={context}>
    <List />;

  </testContext.Provider>
};

export default App;
