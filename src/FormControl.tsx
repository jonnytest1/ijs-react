import { useContext } from 'react'
import Form from './Form'
import { InputPerson } from './Person'
import { updatePerson } from './PersonApi'
import { FormState, PersonsState } from './state'
import { ClearFormAction } from './store/form-actions'
import { SavedUserAction } from './store/person-actions'

export const FormControl: React.FC = ()=>{


    const form=useContext(FormState)
    let persons=useContext(PersonsState)

    function clearAndHideForm(): void {
        form.dispatch(new ClearFormAction())
      }
      
    async function handleSave(person: InputPerson) {
        const data=await updatePerson(person)
        persons.dispatch(new SavedUserAction(data,person.id))
        clearAndHideForm()
      }

    return (
        <>
        {form.data.form && (
        <Form id={form.data.form.id} onSave={handleSave} onCancel={clearAndHideForm} />
      )}
        </>
    )

}