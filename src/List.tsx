import React, { useEffect, useState,useContext } from 'react';
import { FormState, PersonsState } from './state';
import Form from './Form';
import ListItem from './ListItem';
import Person, { InputPerson } from './Person';
import { DeletePersonAction, SavedUserAction, SortPersonsAction } from './store/person-actions';
import { deletePerson, updatePerson } from './PersonApi';
import { ClearFormAction, EditPersonAction, NewPersonAction } from './store/form-actions';
import { FormControl } from './FormControl';


const List: React.FC = () => {
  let {data,dispatch}=useContext(PersonsState)


  const form=useContext(FormState)

  function handleDelete(id: number): void {
    deletePerson(id)
    dispatch(new DeletePersonAction(id))
    form.dispatch(new ClearFormAction())
  }

  function handleEdit(id: number): void {
    form.dispatch(new EditPersonAction(id))
  }



  function handleNew(): void {
    form.dispatch(new NewPersonAction())
  }

  function sort(attr:keyof Person){
    return function sortAttr(){
      dispatch(new SortPersonsAction(attr));
    }
  }

  return (
    <>
      <FormControl></FormControl>
      <table>
        <thead>
          <tr>
            <th onClick={sort('firstName')}>first name</th>
            <th onClick={sort('lastName')}>last name</th>
            <th onClick={sort('birthdate')}>birth date</th>
            <th onClick={sort('street')}>street</th>
            <th onClick={sort('city')}>city</th>
            <th onClick={sort('zipCode')}>zip code</th>
          </tr>
        </thead>
        <tbody>
          {data.persons.map((person) => (
            <ListItem
              key={person.id}
              person={person}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
      <button
        onClick={handleNew}
        style={{
          position: 'sticky',
          bottom: 20,
          left: '90%',
        }}
      >
        new
      </button>
    </>
  );
};

export default List;
