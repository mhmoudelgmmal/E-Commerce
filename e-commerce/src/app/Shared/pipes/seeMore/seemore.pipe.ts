import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seemore',
  standalone:true
})
export class SeemorePipe implements PipeTransform {

  transform(overView:string): string {
    return overView.split(" ").slice(0,5).join(" ");
  }

}
