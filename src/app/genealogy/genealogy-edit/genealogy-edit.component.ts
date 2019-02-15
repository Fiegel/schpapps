import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GenealogyService } from '../genealogy.service';

@Component({
  selector: 'app-genealogy-edit',
  templateUrl: './genealogy-edit.component.html',
  styleUrls: ['./genealogy-edit.component.scss']
})
export class GenealogyEditComponent implements OnInit {

  constructor(private genealogyService: GenealogyService) { }

  ngOnInit() {
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
