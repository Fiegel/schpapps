import { Injectable } from '@angular/core';

import { Family } from './models/family.model';
import { Person } from './models/person.model';
import { Place } from './models/place.model';

@Injectable()
export class GenealogyService {
  private data: string[][] = [];
  private persons: Person[] = [];
  private families: Family[] = [];

  constructor() { }

  setFileContent(fileContent: string) {
    const fileBlocks = fileContent.split('\n0 ');

    for (let i = 0; i < fileBlocks.length; i++) {
      const fileBlock = fileBlocks[i].split('\n');

      for (let j = 0; j < fileBlock.length; j++) {
        fileBlock[j] = fileBlock[j].startsWith('@') ? fileBlock[j]
          : fileBlock[j].slice(2).replace(/\ufffd/g, '');
      }

      this.data.push(fileBlock);
    }

    for (const block of this.data) {
      const tag = block[0].split(' ')[1];

      if (tag) {
        if (tag.indexOf('INDI') !== -1) {
          this.addPerson(block);
        } else if (tag.indexOf('FAM') !== -1) {
          this.addFamily(block);
        }
      }
    }
  }

  addPerson(data: string[]) {
    const id = data[0].split(' ')[0];
    const currentPerson = new Person(id);

    for (let i = 1; i < data.length; i++) {
      const tagSepIndex = data[i].indexOf(' ');
      const tag = data[i].slice(0, tagSepIndex).replace(/[^a-zA-Z0-9 \-]/g, '');
      const value = data[i].slice(tagSepIndex + 1).replace(/[^a-zA-Z0-9_@ \-]/g, '');

      switch (tag) {
        case 'GIVN': currentPerson.firstname = value;
          break;
        case 'SURN': currentPerson.lastname = value;
          break;
        case 'SEX': currentPerson.gender = value === 'F' ? 'F' : (value === 'M' ? 'M' : null);
          break;
        case 'BIRT': const birth = this.getEventDateAndPlace(data, i);
          currentPerson.birthDate = birth.date;
          currentPerson.birthPlace = birth.place;
          break;
        case 'DEAT': const death = this.getEventDateAndPlace(data, i);
          currentPerson.deathDate = death.date;
          currentPerson.deathPlace = death.place;
          break;
        case 'OCCU': currentPerson.occupation = value;
          break;
        case 'NOTE': currentPerson.note = this.getNote(value, data, i);
          break;
        case 'TYPE': currentPerson.type = value;
          break;
        default: if (['NAME', 'PLAC', 'DATE', 'FAMS', 'FAMC', 'CONT'].indexOf(tag) === -1) {
          console.log('Unknown tag: ' + tag);
        }
      }
    }

    this.persons.push(currentPerson);
  }

  private getPlace(data: string): Place {
    const placeData = data.substring(5).split(',');

    return new Place(...placeData);
  }

  private addFamily(data: string[]) {
    const id = data[0].split(' ')[0];
    const currentFamily = new Family(id);

    for (let i = 1; i < data.length; i++) {
      const tagSepIndex = data[i].indexOf(' ');
      const tag = data[i].slice(0, tagSepIndex).replace(/[^a-zA-Z0-9 \-]/g, '');
      const value = data[i].slice(tagSepIndex + 1).replace(/[^a-zA-Z0-9_@ \-]/g, '');

      switch (tag) {
        case 'HUSB': currentFamily.husband = this.findPersonById(value);
          this.checkExistingPerson(currentFamily.husband, id);
          break;
        case 'WIFE': currentFamily.wife = this.findPersonById(value);
          this.checkExistingPerson(currentFamily.wife, id);
          break;
        case 'MARR': const marriage = this.getEventDateAndPlace(data, i);
          currentFamily.marriageDate = marriage.date;
          currentFamily.marriagePlace = marriage.place;
          break;
        case 'CHIL':
          const newChild = this.findPersonById(value);
          currentFamily.children ? currentFamily.children.push(newChild) : currentFamily.children = [newChild];
          this.checkExistingPerson(newChild, id);
          break;
        case 'NOTE': currentFamily.note = this.getNote(value, data, i);
          break;
        default: if (['PLAC', 'DATE', 'CONT'].indexOf(tag) === -1) {
          console.log('Unknown tag: ' + tag);
        }
      }
    }

    this.families.push(currentFamily);
  }

  private findPersonById(id: string): Person {
    return this.persons.find((person) => person.id === id) || new Person(id);
  }

  private checkExistingPerson(person: Person, familyId: string) {
    if (person.id && !person.firstname && !person.lastname) {
      console.log('Person unknown with id ' + person.id + ' for family id ' + familyId);
    }
  }

  private getEventDateAndPlace(data: string[], i: number): { date: string, place: Place } {
    const event = <{ date: string, place: Place }>{};

    if (data[i + 1] && data[i + 1].startsWith('DATE')) {
      event.date = data[i + 1].substring(5);
    }

    if ((!event.date && data[i + 1] && data[i + 1].startsWith('PLAC'))
      || (data[i + 2] && data[i + 2].startsWith('PLAC'))) {
      event.place = this.getPlace(data[i + 2]);
    }

    return event;
  }

  private getNote(value: string, data: string[], startIndex: number): string {
    let note = value;
    let nextLine = 1;

    while (data[startIndex + nextLine] && data[startIndex + nextLine].startsWith('CONT')) {
      note += '\n' + data[startIndex + nextLine].substring(5);
      nextLine++;
    }

    return note;
  }
}
