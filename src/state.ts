import { createContext } from 'react';
import Person from './Person';



export const testContext = createContext<Array<Person>>([])