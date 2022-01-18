import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullifyIfEmpty'
})
export class NullifyIfEmptyPipe implements PipeTransform {

  transform(value: any): any {
    ;
    if (value==null)
    {
      return null;
    }
    else
    {
      return value.toString().trim()==''?null:value;
    }
    
  }

}
