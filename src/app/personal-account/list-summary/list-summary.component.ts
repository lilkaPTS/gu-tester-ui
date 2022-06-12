import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SummaryForList} from "./SummaryForList";

@Component({
  selector: 'app-list-summary',
  templateUrl: './list-summary.component.html',
  styleUrls: ['./list-summary.component.css']
})
export class ListSummaryComponent implements OnInit {

  @Input() listSummary: SummaryForList[]
  @Input() header: string
  @Output() output = new EventEmitter<SummaryForList>();

  printArray: SummaryForList[];
  constructor() {

  }

  ngOnInit(): void {
  }


  select(summary: SummaryForList, content?: any): void {
    this.output.emit(summary);
  }

}
