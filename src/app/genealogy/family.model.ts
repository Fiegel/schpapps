import { Person } from './person.model';
import { Place } from './place.model';

export class Family {
  constructor(public id: string,
    public husband?: Person,
    public wife?: Person,
    public marriageDate?: string,
    public marriagePlace?: Place,
    public children?: Person[],
    public note?: string) { }
}
