import {Component, Input, OnInit} from '@angular/core';
import {SummaryForList} from "./SummaryForList";

@Component({
  selector: 'app-list-summary',
  templateUrl: './list-summary.component.html',
  styleUrls: ['./list-summary.component.css']
})
export class ListSummaryComponent implements OnInit {

  @Input() listSummary: SummaryForList[]

  constructor() { }

  ngOnInit(): void {
  }

}
