import { ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';

import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { GenealogyService } from '../genealogy.service';
import { Family } from '../models/family.model';
import { Person } from '../models/person.model';
import { Place } from '../models/place.model';

@Component({
  selector: 'app-genealogy-grid',
  templateUrl: './genealogy-grid.component.html',
  styleUrls: ['./genealogy-grid.component.scss']
})
export class GenealogyGridComponent implements OnInit, OnDestroy {
  columnDefs: ColDef[];
  rowData;

  private personsChangedSubscription: Subscription;
  private familiesChangedSubscription: Subscription;

  constructor(private genealogyService: GenealogyService) {
    this.columnDefs = [
      { headerName: 'ID', field: 'id' },
      { headerName: 'Nom', field: 'lastname', resizable: true },
      { headerName: 'Prénom', field: 'firstname' },
      { headerName: 'Sexe', field: 'gender' },
      { headerName: 'Date de naissance', field: 'birthDate' },
      { headerName: 'Lieu de naissance', field: 'birthPlace' },
      { headerName: 'Date de décès', field: 'deathDate' },
      { headerName: 'Lieu de décès', field: 'deathPlace' }
    ];

    this.rowData = [];
  }

  ngOnInit() {
    this.personsChangedSubscription = this.genealogyService.personsChanged
      .subscribe((persons: Person[]) => {
        console.log(persons);
        this.setRowData(persons);
      });
    this.familiesChangedSubscription = this.genealogyService.familiesChanged
      .subscribe((families: Family[]) => console.log(families));

    this.setRowData(this.genealogyService.getPersons());
  }

  private setRowData(persons: Person[]) {
    const rows = [];

    for (const person of persons) {
      rows.push({
        ...person,
        birthPlace: this.formatPlace(person.birthPlace),
        deathPlace: this.formatPlace(person.deathPlace)
      });
    }

    this.rowData = rows;
  }

  private formatPlace(place: Place): string {
    if (!place) {
      return null;
    }

    let inlinePlace = ('' + (place.town ? place.town + ', ' : '')
      + (place.county ? place.county + ' ' : '')
      + (place.areaCode ? '(' + place.areaCode + '), ' : '')
      + (place.region ? place.region + ', ' : '')
      + place.country).trim();

    if (inlinePlace && inlinePlace[inlinePlace.length - 1] === ',') {
      inlinePlace = inlinePlace.slice(0, inlinePlace.length - 2);
    }

    return inlinePlace;
  }

  ngOnDestroy() {
    this.personsChangedSubscription.unsubscribe();
    this.familiesChangedSubscription.unsubscribe();
  }
}
