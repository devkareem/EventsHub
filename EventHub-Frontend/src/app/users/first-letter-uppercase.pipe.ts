import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CapitalizeFL'
})
export class FirstLetterUppercasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var uppercaseFirstLetter = value.charAt(0).toUpperCase();
    return uppercaseFirstLetter;
  }

}
