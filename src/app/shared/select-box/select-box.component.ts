import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
export class SelectBoxComponent implements OnInit {

  selectBoxTitle: string = "Выбор устройств"

  constructor() { }

  ngOnInit(): void {
  }

}
