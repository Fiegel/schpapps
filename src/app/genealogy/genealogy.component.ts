import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { GenealogyService } from './genealogy.service';

@Component({
  selector: 'app-genealogy',
  templateUrl: './genealogy.component.html',
  styleUrls: ['./genealogy.component.scss']
})
export class GenealogyComponent implements OnInit {
  @ViewChild('gedFileInput')
  gedFileInput: ElementRef;

  constructor(private genealogyService: GenealogyService) { }

  ngOnInit() {
  }

  onGedFileSelected() {
    if (this.gedFileInput.nativeElement.files) {
      // read file in service
      console.log(this.gedFileInput.nativeElement.files[0]);
    }
  }
}
