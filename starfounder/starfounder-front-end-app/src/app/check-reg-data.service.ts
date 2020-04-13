import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckRegDataService { // замени  потом на CheckFieldService

  constructor() { }

  checkField(fieldData){
    if(fieldData == undefined){return false;}
    else{return true;}
  };
}
