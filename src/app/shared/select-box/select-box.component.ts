import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {SelectBoxService} from "../../services/select-box.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
export class SelectBoxComponent implements OnInit {

  @Input() selectableObject: string;
  @Input() limit: number;
  @Input() modal: any;
  @Output() outputArr = new EventEmitter<string[]>();

  searchExpression: string = '';
  finalArr: string[]
  workingArr: string[]
  startIndex: number = 0;
  endIndex: number = 9;
  selectedItems: string[] = [];

  printArray: Array<Array<string>> = [[],[],[]];

  constructor(
    private selectBoxService: SelectBoxService
  ) { }

  ngOnInit(): void {
    let initObservable: Observable<string[]> = new Observable<string[]>();
    if(this.selectableObject == 'устройства') {
      initObservable = this.selectBoxService.getAllDevice();
    } else if(this.selectableObject == 'ОС') {
      initObservable = this.selectBoxService.getAllOs();
    } else if(this.selectableObject == 'сети') {
      initObservable = this.selectBoxService.getAllNetwork();
    } else if(this.selectableObject == 'оператора') {
      initObservable = this.selectBoxService.getAllMobileOperator();
    }
    initObservable.subscribe((data: string[]) => {
      this.selectableObject = "Выбор " + this.selectableObject;
      this.finalArr = data;
      this.workingArr = this.finalArr;
      this.fillPrintArray();
    })
  }

  focusItem(str: string) {
    if(!this.selectedItems.includes(str)) {
        if(this.selectedItems.length<this.limit) {
          this.selectedItems.push(str);
        } else if(this.limit==-1) {
          this.selectedItems.push(str);
        }
    } else {
      this.selectedItems.splice(this.selectedItems.indexOf(str), 1);
    }
  }

  search(): void {
    let filteredArr: string[] = [];
    for (let i = 0; i < this.finalArr.length; i++) {
      let str: string = this.finalArr[i];
      if(str.toLowerCase().includes(this.searchExpression.toLowerCase())) {
        filteredArr.push(str);
      }
    }
    this.workingArr = filteredArr;
    if(this.searchExpression != '') {
      this.startIndex = 0;
      this.endIndex = 9;
    }
    this.fillPrintArray();
  }

  confirm() {
    this.outputArr.emit(this.selectedItems);
    this.modal.close();
  }

  fillPrintArray(): void {
    let elementsForFilling = this.getElementsForFilling();
    this.printArray = [[],[],[]];
    let size: number = Math.sqrt(elementsForFilling.length);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          this.printArray[i].push(elementsForFilling[i*size+j]);
      }
    }
  }

  private getElementsForFilling(): string[] {
    let result: string[] = new Array(9);
    for (let i = this.startIndex; i < this.endIndex; i++) {
      result[i-this.startIndex] = this.workingArr[i];
    }
    return result;
  }

  pagePrev(): void {
    if(this.startIndex >= 9) {
      this.startIndex-=9;
      this.endIndex-=9;
      this.fillPrintArray();
    }
  }

  pageNext(): void {
    if(this.endIndex <= this.workingArr.length) {
      this.startIndex+=9;
      this.endIndex+=9;
      this.fillPrintArray();
    }
  }
}
