import {
  BsDatepickerConfig, BsDatepickerViewMode
} from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GedcomReaderService } from '../gedcom-reader.service';
import { GenealogyService } from '../genealogy.service';
import { Family } from '../models/family.model';
import { Person } from '../models/person.model';
import { FRANCE_DEPTS, FRANCE_REGIONS, Place } from '../models/place.model';

@Component({
  selector: 'app-genealogy-edit',
  templateUrl: './genealogy-edit.component.html',
  styleUrls: ['./genealogy-edit.component.scss']
})
export class GenealogyEditComponent implements OnInit, OnDestroy {
  franceRegions = FRANCE_REGIONS;
  franceDepts = FRANCE_DEPTS;

  minModes = [
    { value: 'day', text: '(date exacte)', format: 'DD/MM/YYYY' },
    { value: 'month', text: '~ (mois)', format: 'MM/YYYY' },
    { value: 'year', text: '~ (année)', format: 'YYYY' }
  ];
  defaultMinMode = this.minModes[0];

  showPersonEdit = false;
  showFamilyEdit = false;

  birthBsConfig: Partial<BsDatepickerConfig> = Object.assign({}, {
    containerClass: 'theme-red',
    minMode: <BsDatepickerViewMode>this.defaultMinMode.value,
    dateInputFormat: this.defaultMinMode.format
  });
  deathBsConfig: Partial<BsDatepickerConfig> = Object.assign({}, {
    containerClass: 'theme-red',
    minMode: <BsDatepickerViewMode>this.defaultMinMode.value,
    dateInputFormat: this.defaultMinMode.format
  });

  isGenderMaleRadioActive = false;
  isGenderFemaleRadioActive = false;
  isGenderUnknownRadioActive = true;
  isBirthCalendarOpen = false;
  isDeathCalendarOpen = false;

  personsChangedSubscription: Subscription;
  familiesChangedSubscription: Subscription;

  constructor(private gedcomReaderService: GedcomReaderService,
    private genealogyService: GenealogyService) { }

  ngOnInit() {
    this.personsChangedSubscription = this.genealogyService.personsChanged
      .subscribe((persons: Person[]) => console.log(persons));
    this.familiesChangedSubscription = this.genealogyService.familiesChanged
      .subscribe((families: Family[]) => console.log(families));
  }

  onPersonEditClick() {
    this.showPersonEdit = !this.showPersonEdit;
  }

  onFamilyEditClick() {
    this.showFamilyEdit = !this.showFamilyEdit;
  }

  onGenderRadioClick(event) {
    this.isGenderMaleRadioActive = event.srcElement.id === 'genderMale';
    this.isGenderFemaleRadioActive = event.srcElement.id === 'genderFemale';
    this.isGenderUnknownRadioActive = event.srcElement.id === 'genderUnknown';
  }

  onPersonSubmit(form: NgForm) {
    // TODO get other persons with same first/lastname in the db
    // and check with the user if they are not the same
    this.genealogyService.addPerson(<Person>{
      id: this.genealogyService.getIncPersonsIdCounter(),
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      gender: this.getGenderFromForm(form.value.gender),
      birthPlace: <Place>{
        town: form.value.birthPlaceTown,
        county: form.value.birthPlaceCounty,
        areaCode: form.value.birthPlaceAreaCode,
        region: form.value.birthPlaceRegion,
        country: form.value.birthPlaceCountry
      },
      deathPlace: <Place>{
        town: form.value.deathPlaceTown,
        county: form.value.deathPlaceCounty,
        areaCode: form.value.deathPlaceAreaCode,
        region: form.value.deathPlaceRegion,
        country: form.value.deathPlaceCountry
      },
      occupation: form.value.occupation,
      note: form.value.note
    });

    console.log(form.value);
  }

  onFamilySubmit(form: NgForm) {
    console.log(form.value);
  }

  onClear(form: NgForm) {
    form.reset();
  }

  onBirthDateControlChange(form: NgForm, value: BsDatepickerViewMode) {
    this.birthBsConfig.minMode = value;
    this.birthBsConfig.dateInputFormat = this.getDateFormatFromMinMode(value);
    this.isBirthCalendarOpen = false;
    form.setValue({ ...form.value, 'birthDate': null });
  }

  onDeathDateControlChange(form: NgForm, value: BsDatepickerViewMode) {
    this.deathBsConfig.minMode = value;
    this.deathBsConfig.dateInputFormat = this.getDateFormatFromMinMode(value);
    this.isDeathCalendarOpen = false;
    form.setValue({ ...form.value, 'deathDate': null });
  }
  getDateFormatFromMinMode(minMode: BsDatepickerViewMode): string {
    let format: string;

    for (const mm of this.minModes) {
      if (mm.value === minMode.toString()) {
        format = mm.format;
        break;
      }
    }

    return format;
  }

  onGedFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsText(file);
      reader.onload = () => {
        this.gedcomReaderService.readFileContent(reader.result.toString());
      };
    }
  }

  getGenderFromForm(genderForm: string): string {
    if (genderForm === 'M' || genderForm === 'F') {
      return genderForm;
    } else {
      return null;
    }
  }

  ngOnDestroy() {
    this.personsChangedSubscription.unsubscribe();
    this.familiesChangedSubscription.unsubscribe();
  }
}
