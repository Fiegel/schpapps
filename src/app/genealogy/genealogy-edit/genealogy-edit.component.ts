import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GenealogyService } from '../genealogy.service';


@Component({
  selector: 'app-genealogy-edit',
  templateUrl: './genealogy-edit.component.html',
  styleUrls: ['./genealogy-edit.component.scss']
})
export class GenealogyEditComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-red' });

  isGenderMaleRadioActive = false;
  isGenderFemaleRadioActive = false;
  isGenderUnknownRadioActive = false;
  isBirthCalendarOpen = false;
  isDeathCalendarOpen = false;

  constructor(private genealogyService: GenealogyService) { }

  ngOnInit() {
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
