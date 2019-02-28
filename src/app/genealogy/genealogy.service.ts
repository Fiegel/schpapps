import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

import { Family } from './models/family.model';
import { Person } from './models/person.model';

@Injectable()
export class GenealogyService {
  private persons: Person[] = [];
  private families: Family[] = [];

  personsChanged = new Subject<Person[]>();
  familiesChanged = new Subject<Family[]>();

  getPersons(): Person[] {
    return this.persons;
  }

  getFamily(): Family[] {
    return this.families;
  }

  addPerson(person: Person) {
    this.persons.push(person);
    this.personsChanged.next(this.persons.slice());
  }

  addPersons(persons: Person[]) {
    this.persons.push(...persons);
    this.personsChanged.next(this.persons.slice());
  }

  addFamily(family: Family) {
    this.families.push(family);
    this.familiesChanged.next(this.families.slice());
  }

  addFamilies(families: Family[]) {
    this.families.push(...families);
    this.familiesChanged.next(this.families.slice());
  }
}
