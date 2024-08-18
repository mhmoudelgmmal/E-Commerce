import { outputAst } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

interface pagesData {
  name: ElementRef<HTMLElement>;
}
interface arrowsData {
  name: ElementRef<HTMLElement>;
}
interface pagesDataVisible {
  name: ElementRef<HTMLElement>;
  value: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  standalone: true,
})
export class PaginationComponent implements OnInit, AfterViewInit {
  @Input() totalItems: number = 194;
  limit: number = 10;
  currentPage: number = 1;
  pagesNumber!: number;
  @Output() filterPage!: number;
  @ViewChild('firstNumber') firstNumber!: ElementRef<HTMLElement>;
  @ViewChild('secondNumber') secondNumber!: ElementRef<HTMLElement>;
  @ViewChild('dotts') dotts!: ElementRef<HTMLElement>;
  @ViewChild('thirdNumber') thirdNumber!: ElementRef<HTMLElement>;
  @ViewChild('fourthNumber') fourthNumber!: ElementRef<HTMLElement>;
  @ViewChild('arrowActiveLeft') arrowActiveLeft!: ElementRef<HTMLElement>;
  @ViewChild('arrowInactiveLeft') arrowInactiveLeft!: ElementRef<HTMLElement>;
  @ViewChild('arrowActiveRight') arrowActiveRight!: ElementRef<HTMLElement>;
  @ViewChild('arrowInactiveRight') arrowInactiveRight!: ElementRef<HTMLElement>;
  @ViewChildren('activeButtons') activeButtons!: QueryList<ElementRef<HTMLDivElement>>
  increaseAndDecreasePagesNumber(type:string) {    
    this.activeButtons.forEach((element)=>element.nativeElement.classList.remove('active'))

    if(type == 'decrease' && this.firstNumber.nativeElement.innerHTML != "1"){
        if (this.firstNumber.nativeElement.innerHTML != "2") {
            this.setDisplayedArrowAndHiddenArrows(
              [
              { name: this.arrowInactiveLeft },
              { name: this.arrowInactiveRight },
            ],
              [
              { name: this.arrowActiveLeft },
              { name: this.arrowActiveRight },
            ],
          );
          this.setElementOfPagination(
            [],
            [
              {
                name: this.firstNumber,
                value: Number(this.firstNumber.nativeElement.innerHTML) - 2,
              },
              {
                name: this.secondNumber,
                value: Number(this.secondNumber.nativeElement.innerHTML) - 2,
              },
              {
                name: this.thirdNumber,
                value: this.pagesNumber - 1,
              },
              {
                name: this.fourthNumber,
                value: this.pagesNumber,
              },
            ]
          );
          return
        }else{
          this.setDisplayedArrowAndHiddenArrows(
            [
            { name: this.arrowActiveLeft },
            { name: this.arrowInactiveRight },
          ],
            [
            { name: this.arrowInactiveLeft },
            { name: this.arrowActiveRight },
          ],
        );
        this.setElementOfPagination(
          [],
          [
            {
              name: this.firstNumber,
              value: 1,
            },
            {
              name: this.secondNumber,
              value: 2,
            },
            {
              name: this.thirdNumber,
              value: this.pagesNumber - 1,
            },
            {
              name: this.fourthNumber,
              value: this.pagesNumber,
            },
          ]
        );
        return
        }
      
    } 
    
    if (type == 'decrease' && this.firstNumber.nativeElement.innerHTML == "1") {
      debugger
      this.setDisplayedArrowAndHiddenArrows(
        [
        { name: this.arrowActiveLeft },
        { name: this.arrowInactiveRight },
      ],
        [
        { name: this.arrowInactiveLeft },
        { name: this.arrowActiveRight },
      ],
    );
   
    return
    }
    
    if (type == 'decrease' && this.firstNumber.nativeElement.innerHTML == "2") {
      
      this.setDisplayedArrowAndHiddenArrows(
        [
        { name: this.arrowActiveLeft },
        { name: this.arrowInactiveRight },
      ],
        [
        { name: this.arrowInactiveLeft },
        { name: this.arrowActiveRight },
      ],
    );
   
    return
    }
    if (
      (this.firstNumber.nativeElement.innerHTML == this.pagesNumber.toString() && type != "decrease") ||
      (this.secondNumber.nativeElement.innerHTML == this.pagesNumber.toString() &&  type != "decrease")
    ) {
      return;
    }
    let thesubtractedNumber =
      this.pagesNumber - Number(this.secondNumber.nativeElement.innerHTML);
      if (thesubtractedNumber == 0 && type == 'decrease') {
        this.setElementOfPagination(
          [],
          [
            {
              name: this.firstNumber,
              value: Number(this.firstNumber.nativeElement.innerHTML) - 2,
            },
            {
              name: this.secondNumber,
              value: Number(this.secondNumber.nativeElement.innerHTML) - 2,
            },
            {
              name: this.thirdNumber,
              value: this.pagesNumber - 1,
            },
            {
              name: this.fourthNumber,
              value: this.pagesNumber,
            },
          ]
        );
      }
          
    if (thesubtractedNumber == 1) {        
      this.setElementOfPagination(
        [
          { name: this.fourthNumber },
          { name: this.thirdNumber },
          { name: this.dotts },
        ],
        [
          {
            name: this.firstNumber,
            value: type == 'increase'? Number(this.firstNumber.nativeElement.innerHTML) + 1 : Number(this.firstNumber.nativeElement.innerHTML) - 1,
          },
          {
            name: this.secondNumber,
            value: type == 'increase'? Number(this.secondNumber.nativeElement.innerHTML) + 1 : Number(this.secondNumber.nativeElement.innerHTML) + 1,
          },
        ]
      );
      if (Number(this.firstNumber.nativeElement.innerHTML) > 1 && Number(this.secondNumber.nativeElement.innerHTML) < this.pagesNumber) {
      this.setDisplayedArrowAndHiddenArrows(
        [
        { name: this.arrowInactiveRight },
        { name: this.arrowActiveLeft },
      ],
        [
        { name: this.arrowActiveRight },
        { name: this.arrowInactiveLeft },
      ],
    );
      }
      
      if (Number(this.firstNumber.nativeElement.innerHTML) > 1 && Number(this.secondNumber.nativeElement.innerHTML) == this.pagesNumber) {
        this.setDisplayedArrowAndHiddenArrows(
          [
          { name: this.arrowActiveRight },
          { name: this.arrowInactiveLeft },
        ],
          [
          { name: this.arrowInactiveRight },
          { name: this.arrowActiveLeft },
        ],
      );
      }
    }
    if (thesubtractedNumber == 2) {
      if (type == 'decrease') {
        this.setElementOfPagination(
          [
            
          ],
          [
            {
              name: this.firstNumber,
              value:Number(this.firstNumber.nativeElement.innerHTML) - 2,
            },
            {
              name: this.secondNumber,
              value:Number(this.secondNumber.nativeElement.innerHTML) - 2,
            },
            {
              name: this.thirdNumber,
              value:this.pagesNumber - 1,
            },
            {
              name: this.secondNumber,
              value:this.pagesNumber,
            },
          ]
        );
        if (Number(this.firstNumber.nativeElement.innerHTML) > 1 && Number(this.secondNumber.nativeElement.innerHTML) < this.pagesNumber) {
          this.setDisplayedArrowAndHiddenArrows(
            [
            { name: this.arrowInactiveRight },
            { name: this.arrowActiveLeft },
          ],
            [
            { name: this.arrowActiveRight },
            { name: this.arrowInactiveLeft },
          ],
        );
          }
          if (Number(this.firstNumber.nativeElement.innerHTML) > 1 && Number(this.secondNumber.nativeElement.innerHTML) == this.pagesNumber) {
            this.setDisplayedArrowAndHiddenArrows(
              [
              { name: this.arrowActiveRight },
              { name: this.arrowInactiveLeft },
            ],
              [
              { name: this.arrowInactiveRight },
              { name: this.arrowActiveLeft },
            ],
          );
          }
      }
      this.setElementOfPagination(
        [
          { name: this.fourthNumber },
          { name: this.thirdNumber },
          { name: this.dotts },
        ],
        [
          {
            name: this.firstNumber,
            value: type == 'increase'? Number(this.firstNumber.nativeElement.innerHTML) + 2: Number(this.firstNumber.nativeElement.innerHTML) - 2,
          },
          {
            name: this.secondNumber,
            value: type == 'increase'? Number(this.secondNumber.nativeElement.innerHTML) + 2:Number(this.secondNumber.nativeElement.innerHTML) - 2,
          },
        ]
      );
      if (Number(this.firstNumber.nativeElement.innerHTML) > 1 && Number(this.secondNumber.nativeElement.innerHTML) < this.pagesNumber) {
        this.setDisplayedArrowAndHiddenArrows(
          [
          { name: this.arrowInactiveRight },
          { name: this.arrowActiveLeft },
        ],
          [
          { name: this.arrowActiveRight },
          { name: this.arrowInactiveLeft },
        ],
      );
        }
        if (Number(this.firstNumber.nativeElement.innerHTML) > 1 && Number(this.secondNumber.nativeElement.innerHTML) == this.pagesNumber) {
          this.setDisplayedArrowAndHiddenArrows(
            [
            { name: this.arrowActiveRight },
            { name: this.arrowInactiveLeft },
          ],
            [
            { name: this.arrowInactiveRight },
            { name: this.arrowActiveLeft },
          ],
        );
        }
    }
    
    if (thesubtractedNumber > 2) {
      if (type == 'decrease') {
        
      }
      this.setElementOfPagination(
        [],
        [
          {
            name: this.firstNumber,
            value: type == 'increase'? Number(this.firstNumber.nativeElement.innerHTML) + 2:Number(this.firstNumber.nativeElement.innerHTML) - 1,
          },
          {
            name: this.secondNumber,
            value:  type == 'increase'? Number(this.secondNumber.nativeElement.innerHTML) + 2:Number(this.secondNumber.nativeElement.innerHTML) - 1,
          },
        ]
      );
        this.setDisplayedArrowAndHiddenArrows(
        [
        { name: this.arrowInactiveRight },
        { name: this.arrowInactiveLeft },
      ],
        [
        { name: this.arrowActiveRight },
        { name: this.arrowActiveLeft },
      ],

    )
      }
      ;
  }
  setDisplayedArrowAndHiddenArrows(
    arrowsHidden: arrowsData[],
    arrowsDisplay: arrowsData[]
  ) {
    for (let arrow of arrowsHidden) {
      arrow.name.nativeElement.style.display = 'none';
    }
    for (let arrow of arrowsDisplay) {
      arrow.name.nativeElement.style.display = 'block';
    }
  }
  setElementOfPagination(
    hiddenElements: pagesData[],
    displayElements: pagesDataVisible[]
  ) {
    
    if (hiddenElements.length != 0) {
      for (let element of hiddenElements) {
        element.name.nativeElement.style.display = 'none';
      }
    }else{
      for (let element of displayElements) {
        element.name.nativeElement.style.display = 'block';
      }
      this.dotts.nativeElement.style.display = 'block'
    }
    if (displayElements) {
      for (let element of displayElements) {
        element.name.nativeElement.innerHTML = element?.value?.toString();
      }
    }
  }
  initPaginationpagesNumber() {
    
    this.pagesNumber = Math.ceil(this.totalItems / this.limit);
    

    if (this.pagesNumber === 1) {
      this.setDisplayedArrowAndHiddenArrows(
        [
        { name: this.arrowActiveLeft },
        { name: this.limit <= 10 ? this.arrowActiveRight : this.arrowInactiveRight },
      ],
        [
        { name: this.arrowInactiveLeft },
        { name: this.limit <= 10 ? this.arrowInactiveRight : this.arrowActiveRight },
      ],
    );
      this.setElementOfPagination(
        [
          { name: this.secondNumber },
          { name: this.dotts },
          { name: this.thirdNumber },
          { name: this.fourthNumber },
        ],
        [{ name: this.firstNumber, value: 1 }]
      );
      return;
    }
    if (this.pagesNumber === 2) {
      this.setDisplayedArrowAndHiddenArrows(
        [
        { name: this.arrowActiveLeft },
        { name: this.limit <= 10 ? this.arrowActiveRight : this.arrowInactiveRight },
      ],
        [
        { name: this.arrowInactiveLeft },
        { name: this.limit <= 10 ? this.arrowInactiveRight : this.arrowActiveRight },
      ],
    );
      this.setElementOfPagination(
        [
          { name: this.dotts },
          { name: this.thirdNumber },
          { name: this.fourthNumber },
        ],
        [
          { name: this.firstNumber, value: 1 },
          { name: this.secondNumber, value: 2 },
        ]
      );
      return;
    }
    if (this.pagesNumber === 3) {
      this.setDisplayedArrowAndHiddenArrows(
        [
        { name: this.arrowActiveLeft },
        { name: this.arrowInactiveRight },
      ],
        [
        { name: this.arrowInactiveLeft },
        { name: this.arrowActiveRight },
      ],
    );
      this.setElementOfPagination(
        [{ name: this.fourthNumber }],
        [
          { name: this.firstNumber, value: 1 },
          { name: this.secondNumber, value: 2 },
          { name: this.thirdNumber, value: 3 },
        ]
      );
      return;
    }
    if (this.pagesNumber == 4) {
      this.setDisplayedArrowAndHiddenArrows(
        [
        { name: this.arrowActiveLeft },
        { name: this.arrowInactiveRight },
      ],
        [
        { name: this.arrowInactiveLeft },
        { name: this.arrowActiveRight },
      ],
    );
      this.setElementOfPagination(
        [],
        [
          { name: this.firstNumber, value: 1 },
          { name: this.secondNumber, value: 2 },
          { name: this.thirdNumber, value: 3 },
          { name: this.fourthNumber, value: 4 },
        ]
      );
      return;
    }
    if (this.pagesNumber > 4) {
      this.setDisplayedArrowAndHiddenArrows(
        [
        { name: this.arrowActiveLeft },
        { name: this.arrowInactiveRight },
      ],
        [
        { name: this.arrowInactiveLeft },
        { name: this.arrowActiveRight },
      ],
    );
      this.setElementOfPagination(
        [],
        [
          { name: this.firstNumber, value: 1 },
          { name: this.secondNumber, value: 2 },
          { name: this.thirdNumber, value: this.pagesNumber - 1 },
          { name: this.fourthNumber, value: this.pagesNumber },
        ]
      );
      return;
    }
  }
  selectPageAndSetFilteration(event: HTMLDivElement) {
        this.activeButtons.forEach((element)=>element.nativeElement.classList.remove('active'))
        event.classList.add('active')
    if (Number(this.firstNumber.nativeElement.innerHTML) > 1) {
      this.setDisplayedArrowAndHiddenArrows(
        [
        { name: this.arrowInactiveLeft },
        { name: this.arrowActiveRight },
      ],
        [
        { name: this.arrowActiveLeft },
        { name: this.arrowInactiveRight },
      ],
    );
    }
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initPaginationpagesNumber();
  }
}
