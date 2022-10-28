import React, { useEffect, useState,useContext } from 'react';
import { testContext } from './state';
import Form from './Form';
import ListItem from './ListItem';
import Person, { InputPerson } from './Person';
import { DeletePersonAction, SavedUserAction, SortPersonsAction } from './store/actions';
import { deletePerson, updatePerson } from './PersonApi';


const List: React.FC = () => {
  let {data,dispatch}=useContext(testContext)

  const [form, setForm] = useState<{ edit: number | null; showForm: boolean }>({
    edit: null,
    showForm: false,
  });

  function handleDelete(id: number): void {
    deletePerson(id)
    dispatch(new DeletePersonAction(id))
   
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

  async function handleSave(person: InputPerson) {
    const data=await updatePerson(person)
    dispatch(new SavedUserAction(data,person.id))

    clearAndHideForm()
  }


  function sort(attr:keyof Person){
    return function sortAttr(){
      dispatch(new SortPersonsAction(attr));
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
          {data?.map((person) => (
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
