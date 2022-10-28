
import Person, { InputPerson } from '../Person';
export class UpdatePersonsAction {
    readonly type = "persons"

    constructor(public data: Array<Person>) {

    }
}


export class SortPersonsAction {
    readonly type = "sort"

    constructor(public key: keyof Person) {

    }
}

export class SavedUserAction {
    readonly type = "savedUser"

    constructor(public savedPerson: Person, public id: InputPerson["id"]) { }

}

export class DeletePersonAction {
    readonly type = "delete"

    constructor(public id: Person["id"]) { }
}

export type Actions = UpdatePersonsAction | SortPersonsAction | SavedUserAction | DeletePersonAction