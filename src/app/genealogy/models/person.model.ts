import { Place } from './place.model';

export class Person {
  constructor(public id: number,
    public gedcomId?: string,
    public firstname?: string,
    public lastname?: string,
    public gender?: 'M' | 'F',
    public birthDate?: string,
    public birthPlace?: Place,
    public deathDate?: string,
    public deathPlace?: Place,
    public occupation?: string,
    public note?: string,
    public type?: string) { }
}
