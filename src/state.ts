import { createContext } from 'react';
import Person from './Person';

interface DispatchContext<T> {
    data: T

    dispatch: React.Dispatch<any>
}

export const testContext = createContext<DispatchContext<Array<Person>>>({
    data: [],
    dispatch: () => { }
})