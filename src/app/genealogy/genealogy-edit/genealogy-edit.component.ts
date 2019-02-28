import {
  BsDatepickerConfig, BsDatepickerViewMode
} from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GedcomReaderService } from '../gedcom-reader.service';

@Component({
  selector: 'app-genealogy-edit',
  templateUrl: './genealogy-edit.component.html',
  styleUrls: ['./genealogy-edit.component.scss']
})
export class GenealogyEditComponent implements OnInit {
  minModes = [
    { value: 'day', text: '(date exacte)', format: 'DD/MM/YYYY' },
    { value: 'month', text: '~ (mois)', format: 'MM/YYYY' },
    { value: 'year', text: '~ (année)', format: 'YYYY' }
  ];
  defaultMinMode = this.minModes[0].value;

  showPersonEdit = false;
  showFamilyEdit = false;

  birthBsConfig: Partial<BsDatepickerConfig> = Object.assign({}, {
    containerClass: 'theme-red',
    minMode: <BsDatepickerViewMode>this.defaultMinMode,
    dateInputFormat: 'DD/MM/YYYY'
  });
  deathBsConfig: Partial<BsDatepickerConfig> = Object.assign({}, {
    containerClass: 'theme-red',
    minMode: <BsDatepickerViewMode>this.defaultMinMode,
    dateInputFormat: 'DD/MM/YYYY'
  });

  isGenderMaleRadioActive = false;
  isGenderFemaleRadioActive = false;
  isGenderUnknownRadioActive = true;
  isBirthCalendarOpen = false;
  isDeathCalendarOpen = false;

  constructor(private gedcomReaderService: GedcomReaderService) { }

  ngOnInit() {
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
        this.gedcomReaderService.setFileContent(reader.result.toString());
      };
    }
  }
}
