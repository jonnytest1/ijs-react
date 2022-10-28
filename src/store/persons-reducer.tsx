import Person from '../Person';
import { Actions } from './person-actions';

export interface State {
    persons: Array<Person>
    sortKey:string|null,
    sortDirection:boolean
}


export const initialState:State = {
    persons: [],
    sortDirection:true,
    sortKey:null
}

export function personsReducer(state: State, action:Actions): State {
   
    if (action.type === "persons") {
        return { ...state, persons: action.data }
    }else if(action.type==="sort"){
        const sortedP=[...state.persons].sort((a,b)=>(b[action.key] >a[action.key] ?1:-1))

        if(state.sortKey===action.key){
            state.sortDirection=!state.sortDirection
        }
  
        if(!state.sortDirection){
            sortedP.reverse()
        }

        return {
            ...state,
            persons:sortedP,
            sortKey:action.key,
            sortDirection:!state.sortDirection
        }
    }else if(action.type==="savedUser"){
        let newPersons:Array<Person>
        if (action.id) {
            newPersons= state.persons.map((prevPerson) => {
              if (prevPerson.id === action.id) {
                return action.savedPerson;
              }
              return prevPerson;
            });
        }
        newPersons= [...state.persons, action.savedPerson];
        return {
            ...state,
            persons:newPersons
        }
    }else if(action.type==="delete"){
        return {
            ...state,
            persons:state.persons.filter((person) => person.id !== action.id)
        }
    }
    debugger;
    return state;
}