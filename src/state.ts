import { createContext } from 'react';
import Person from './Person';
import { FormState as FormStateI, initialFormState } from './store/form-reducer';
import { initialState, State as StateI } from './store/persons-reducer';

interface DispatchContext<T> {
    data: T

    dispatch: React.Dispatch<any>
}

export const PersonsState = createContext<DispatchContext<StateI>>({
    data: initialState,
    dispatch: () => { }
})

export const FormState = createContext<DispatchContext<FormStateI>>({
    data: initialFormState,
    dispatch: () => { }
})