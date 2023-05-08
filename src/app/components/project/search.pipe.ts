import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val:any) => {
      let rVal = (val.proje_adi.toLocaleLowerCase().includes(args)) || (val.firma_adi.toLocaleLowerCase().includes(args)) || (val.durum.toLocaleLowerCase().includes(args))|| (val.must_yet_kisi.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}
