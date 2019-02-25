import {
  BsDatepickerConfig, BsDatepickerViewMode
} from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';

import { convertMetaToOutput } from '@angular/compiler/src/render3/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GenealogyService } from '../genealogy.service';

@Component({
  selector: 'app-genealogy-edit',
  templateUrl: './genealogy-edit.component.html',
  styleUrls: ['./genealogy-edit.component.scss']
})
export class GenealogyEditComponent implements OnInit {
  showPersonEdit = false;
  showFamilyEdit = false;

  birthBsConfig: Partial<BsDatepickerConfig> = Object.assign({}, {
    containerClass: 'theme-red',
    minMode: <BsDatepickerViewMode>'day',
    dateInputFormat: 'DD/MM/YYYY'
  });
  deathBsConfig: Partial<BsDatepickerConfig> = Object.assign({}, {
    containerClass: 'theme-red',
    minMode: <BsDatepickerViewMode>'day',
    dateInputFormat: 'DD/MM/YYYY'
  });

  isGenderMaleRadioActive = false;
  isGenderFemaleRadioActive = false;
  isGenderUnknownRadioActive = true;
  isBirthCalendarOpen = false;
  isDeathCalendarOpen = false;

  constructor(private genealogyService: GenealogyService) { }

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

  getDateFormatFromMinMode(minMode: BsDatepickerViewMode) {
    switch (minMode) {
      case 'day': return 'DD/MM/YYYY';
      case 'month': return 'MM/YYYY';
      case 'year': return 'YYYY';
    }
  }

  onGedFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsText(file);
      reader.onload = () => {
        this.genealogyService.setFileContent(reader.result.toString());
      };
    }
  }
}
