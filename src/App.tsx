import React, { useEffect, useReducer, useState } from 'react';
import { testContext } from './state';
import List from './List';
import Person from './Person';
import { loadPersons } from './PersonApi';
import { initialState, personsReducer } from './persons-reducer';



const App: React.FC = () => {
  useEffect(()=>{
    loadPersons().then(p=>{
      dispatch({
        type:"person",
        data:p
      })
    })
  },[])
  const [state,dispatch]=useReducer(personsReducer,initialState)
  

  return <testContext.Provider value={state.persons}>
    <List />;

  </testContext.Provider>
};

export default App;
