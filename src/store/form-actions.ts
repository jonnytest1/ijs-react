


export class EditPersonAction {

    constructor(public id: number) { }
}

export class NewPersonAction {

}
export class ClearFormAction {

}
export type FormAction = EditPersonAction | NewPersonAction | ClearFormAction