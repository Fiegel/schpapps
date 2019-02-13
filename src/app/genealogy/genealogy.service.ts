import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Person {
  id: string;
  firstname?: string;
  lastname?: string;
  gender?: 'M' | 'F';
  birthDate?: string;
  birthPlace?: Place;
  deathDate?: string;
  deathPlace?: Place;
  occupation?: string;
  note?: string;
  type?: string;
}

export interface Family {
  id: string;
  husband?: Person;
  wife?: Person;
  marriageDate?: string;
  marriagePlace?: Place;
  children?: Person[];
}

export interface Place {
  town?: string;
  areaCode?: string;
  county?: string;
  region?: string;
  country?: string;
  subdivision?: string;
}

@Injectable()
export class GenealogyService {
  private data: string[][] = [];
  private persons: Person[] = [];
  private places: Place[] = [];
  private families: Family[] = [];

  constructor(private httpClient: HttpClient) { }

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
    const currentPerson = <Person>{ id };

    for (let i = 1; i < data.length; i++) {
      const tagSepIndex = data[i].indexOf(' ');
      const tag = data[i].slice(0, tagSepIndex).replace(/[^a-zA-Z0-9]/g, '');
      const value = data[i].slice(tagSepIndex + 1);

      switch (tag) {
        case 'GIVN': currentPerson.firstname = value;
          break;
        case 'SURN': currentPerson.lastname = value;
          break;
        case 'SEX': currentPerson.gender = value.indexOf('F') !== -1 ? 'F'
          : (value.indexOf('M') !== 1 ? 'M' : null); // === does not work
          break;
        case 'BIRT': currentPerson.birthDate = data[i + 1].substring(5);
          if (data[i + 2] && data[i + 2].startsWith('PLAC')) {
            currentPerson.birthPlace = this.getPlace(data[i + 2]);
          }
          break;
        case 'DEAT': currentPerson.deathDate = data[i + 1].substring(5);
          if (data[i + 2] && data[i + 2].startsWith('PLAC')) {
            currentPerson.deathPlace = this.getPlace(data[i + 2]);
          }
          break;
        case 'OCCU': currentPerson.occupation = value;
          break;
        case 'NOTE': currentPerson.note = value;
          let nextLine = 1;

          while (data[i + nextLine].startsWith('CONT')) {
            currentPerson.note += '\n' + data[i + nextLine].substring(5);
            nextLine++;
          }
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

  private getPlace(data: string) {
    const placeData = data.substring(5).split(',');

    return <Place>{
      town: placeData[0],
      areaCode: placeData[1],
      county: placeData[2],
      region: placeData[3],
      country: placeData[4],
      subdivision: placeData[5]
    };
  }

  private addFamily(data: string[]) {

  }
}
