import { act } from 'react-dom/test-utils';
import { ClearFormAction, EditPersonAction, FormAction, NewPersonAction } from './form-actions';

export interface FormState {

    form?: {
        id: number | null
    }
}

export const initialFormState: FormState = {

}


export function formsReducer(state: FormState, action: FormAction): FormState {


    if (action instanceof EditPersonAction) {
        return {
            ...state,
            form: {
                id: action.id
            }
        }
    } else if (action instanceof NewPersonAction) {
        return {
            ...state,
            form: {
                id: null
            }
        }
    } else if (action instanceof ClearFormAction) {
        return {

        }
    }
    debugger;
    return state
}