import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { GenealogyService } from './genealogy.service';

@Component({
  selector: 'app-genealogy',
  templateUrl: './genealogy.component.html',
  styleUrls: ['./genealogy.component.scss']
})
export class GenealogyComponent implements OnInit {

  constructor(private genealogyService: GenealogyService) { }

  ngOnInit() {
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
