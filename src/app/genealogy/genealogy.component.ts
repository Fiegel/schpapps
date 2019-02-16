import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { frLocale } from 'ngx-bootstrap/locale';

import { Component, OnInit } from '@angular/core';

defineLocale('fr', frLocale);

@Component({
  selector: 'app-genealogy',
  templateUrl: './genealogy.component.html',
  styleUrls: ['./genealogy.component.scss']
})
export class GenealogyComponent implements OnInit {

  constructor(private localeService: BsLocaleService) { }

  ngOnInit() {
    this.localeService.use('fr');
  }

}
