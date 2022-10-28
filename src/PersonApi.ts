import Person from './Person';

const url = `${process.env.REACT_APP_BACKEND_URL}/users`;

export async function loadPersons() {
    const response = await fetch(url)
    const data = await response.json()


    data as Array<Person>
    return data;

}