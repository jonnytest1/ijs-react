import Person from './Person';

export interface State {
    persons: Array<Person>
}


export const initialState = {
    persons: []
}

export function personsReducer(state: State, action: { type: string, [key: string]: any }): State {
    debugger;
    if (action.type === "person") {
        return { ...state, persons: action.data }
    }
    return state;
}