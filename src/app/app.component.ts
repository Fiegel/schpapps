import { Component, OnInit } from '@angular/core';

import { FirestoreService } from './shared/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.firestoreService.firestoreInit();

    // this.firestoreService.mergeDoc('users', '2TWbTNyNvsfCYkNjtsJXxhzzDyW2', {
    //   email: 'jeremy.fiegel@hotmail.fr',
    //   fullname: 'Jérémy FIEGEL',
    //   surname: 'Jérémy'
    // });

    // this.firestoreService.addAllDoc('puns', [{
    //   id: 0,
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '
    //     + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    //     + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    //     + 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '
    //     + 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //   source: 'Lorem Ipsum'
    // },
    // {
    //   id: 1,
    //   text: 'C\'est l\'histoire du nain aux 26 enfants.\nElle est courte mais elle est bonne.'
    // },
    // {
    //   id: 2,
    //   text: 'C\'est l\'histoire de l\'eunuque décapité.\nUne histoire sans queue ni tête.'
    // },
    // {
    //   id: 3,
    //   text: 'C\'est l\'histoire d\'un pingouin qui respire par les fesses.\nUn jour il s’assoit et il meurt.'
    // },
    // {
    //   id: 4,
    //   text: 'Pourquoi les Belges viennent-ils à la messe avec du savon ?\nPour l\'Ave Maria.'
    // },
    // {
    //   id: 5,
    //   text: 'C\'est quoi un petit pois avec une épée face à une carotte avec une épée ?\nUn bon duel.'
    // },
    // {
    //   id: 6,
    //   text: 'Pourquoi les pêcheurs ne sont pas gros ?\nParce qu\'ils surveillent leur ligne !'
    // },
    // {
    //   id: 7,
    //   text: 'C\'est quoi un petit pois avec une épée face à une carotte avec une épée ?\nUn bon duel.'
    // },
    // {
    //   id: 8,
    //   text: 'Quelle est la mamie qui fait peur aux voleurs ?\nMamie Traillette.'
    // },
    // {
    //   id: 9,
    //   text: 'Comment appelle-t-on un chien qui n\'a pas de pattes ?\nOn l\'appelle pas, on va le chercher...'
    // },
    // {
    //   id: 10,
    //   text: 'C\'est quoi le plus dur à mixer dans les légumes ?\nLe fauteuil.'
    // },
    // {
    //   id: 11,
    //   text: 'Quelle est la différence entre un lapin et une bouteille en plastique ?\n'
    //     + 'Ils sont tous les deux en plastique, sauf le lapin.'
    // },
    // {
    //   id: 12,
    //   text: 'Tu connais schling-schling la girafe ?\n'
    //     + 'C\'est une girafe qui passe trop près d\'un hélico et schling-schling la girafe.'
    // },
    // {
    //   id: 13,
    //   text: 'Comment appelle-t-on le fait de se retrouver coincé entre une Marine et un Jean-Marie ?\nUne double Pen.'
    // },
    // {
    //   id: 14,
    //   text: 'Pourquoi les bonnes soeurs chinoises aiment les Beatles ?\nParce qu\'elles sont jaunes, les nonnes.'
    // },
    // {
    //   id: 15,
    //   text: 'Un chef de guerre dans un bar : "Nous sommes vaincus !"\nLe barman : "Impossible, nous n\'avons que 19 chaises."'
    // },
    // {
    //   id: 16,
    //   text: 'Combien faut-il de psys pour changer une ampoule ?\n'
    //     + 'Un seul, mais il faut que l\'ampoule veuille vraiment changer.'
    // },
    // {
    //   id: 17,
    //   text: 'Paris, ville de l\'amour.\nC\'est la meilleure blague de toutes.'
    // }]);
  }
}
