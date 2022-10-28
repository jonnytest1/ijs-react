import Person, { InputPerson } from './Person';

const url = `${process.env.REACT_APP_BACKEND_URL}/users`;

export async function loadPersons() {
    const response = await fetch(url)
    const data = await response.json()


    data as Array<Person>
    return data;

}


export async function updatePerson(person: InputPerson) {
    const method = person.id ? 'PUT' : 'POST';
    let saveUrl = person.id ? `${url}/${person.id}` : url;
    const response = await fetch(saveUrl, {
        method,
        body: JSON.stringify(person),
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    return data as Person
}

export async function deletePerson(id: number) {
    await fetch(`${url}/${id}`, { method: 'DELETE' });
}