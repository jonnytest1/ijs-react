import React, { useEffect, useState,useContext } from 'react';
import { testContext } from './state';
import Form from './Form';
import ListItem from './ListItem';
import Person, { InputPerson } from './Person';

const url = `${process.env.REACT_APP_BACKEND_URL}/users`;

let sortAttrStr:string|null=null
let sortDirection=false
const List: React.FC = () => {
  let persons=useContext(testContext)

  debugger;
  const [form, setForm] = useState<{ edit: number | null; showForm: boolean }>({
    edit: null,
    showForm: false,
  });

  function handleDelete(id: number): void {
    fetch(`${url}/${id}`, { method: 'DELETE' }).then((response) => {
      /*setPersons((prevPersons) =>
        prevPersons?.filter((person) => person.id !== id)
      );*/
    });
  }

  function handleEdit(id: number): void {
    setForm({ edit: id, showForm: true });
  }

  function clearAndHideForm(): void {
    setForm({ edit: null, showForm: false });
  }

  function handleNew(): void {
    setForm({ edit: null, showForm: true });
  }

  function handleSave(person: InputPerson) {
    const method = person.id ? 'PUT' : 'POST';
    let saveUrl = person.id ? `${url}/${person.id}` : url;
    fetch(saveUrl, {
      method,
      body: JSON.stringify(person),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
       /* setPersons((prevPersons) => {
          if (person.id) {
            return prevPersons.map((prevPerson) => {
              if (prevPerson.id === person.id) {
                return person;
              }
              return prevPerson;
            });
          }
          return [...prevPersons, data];
        });
        clearAndHideForm();*/
      });
  }


  function sort(attr:keyof Person){
    return function sortAttr(){
 
      persons.sort((a,b)=>(b[attr] >a[attr] ?1:-1))

      if(sortAttrStr===attr){
        sortDirection=!sortDirection
      }

      if(!sortDirection){
        persons.reverse()
      }
      sortAttrStr=attr;
      
     /* setPersons([...persons])*/
    }
  }

  return (
    <>
      {form.showForm && (
        <Form id={form.edit} onSave={handleSave} onCancel={clearAndHideForm} />
      )}
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
          {persons?.map((person) => (
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
