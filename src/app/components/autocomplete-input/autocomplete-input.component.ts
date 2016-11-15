import {Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef} from '@angular/core';
import { FormControl } from "@angular/forms";
import {InputLabelComponent} from '../input-label/input-label.component';


@Component({
  selector: 'autocomplete-input',
  templateUrl: 'autocomplete-input.component.html',
  styleUrls: ['autocomplete-input.component.scss'],
})
export class AutocompleteInputComponent implements OnInit {
  @Output() selected = new EventEmitter();
  @Input() searchMethod;
  @Input() search_words:string = "";
  elementSuggestions:any[] = [];

  searchControl:FormControl = new FormControl();

  searchIndexSelection:number = 0;
  searchHidden:boolean = true;
  searching:boolean = false;

  constructor(private elementRef: ElementRef) {
    this.searchControl.valueChanges.debounceTime(250).distinctUntilChanged()
      .subscribe(value => {
        this.search(value)
      });
  }

  ngOnInit() {
  }

  searchEntered($event) {
    if ($event.code == 'Enter') {
      if(this.elementSuggestions.length){
        this.emitElement(this.elementSuggestions[this.searchIndexSelection]);
      }
    } else if($event.code == 'ArrowUp'){
      if(this.searchIndexSelection > 0){
        this.searchIndexSelection--;
      }
    } else if($event.code == 'ArrowDown'){
      if(this.searchIndexSelection <= this.elementSuggestions.length){
        this.searchIndexSelection++;
      }
    } else if($event.code == 'Escape'){
      this.clearSearch();
    } else {
      this.searching = true;
      this.elementSuggestions = [];
    }
    console.log($event);
  }


  search(words){
    if(words.length){
      this.searchMethod(words)
        .subscribe(elements => {
          this.elementSuggestions = elements;
          this.searchIndexSelection = 0;
          this.searching = false;
        })
    } else {
      this.clearSearch();
    }
  }

  clearSearch(){
    this.elementSuggestions = [];
    this.searchIndexSelection = 0;
    this.searching = false;
  }

  showSearch(){
    this.searchHidden = false;
  }

  hideSearch($event){
    let element = $event.srcElement;
    if (!this.elementRef.nativeElement.contains(element)) {
      this.searchHidden = true;
    }
  }

  emitElement(element){
    this.selected.emit(element);
    this.clearSearch();
    this.search_words = "";
  }
}
