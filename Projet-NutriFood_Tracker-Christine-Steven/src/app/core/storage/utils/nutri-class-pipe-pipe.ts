import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nutriClassPipe'
})
export class NutriClassPipe implements PipeTransform {
  transform(grade: string | null | undefined): string {
    switch ((grade ?? '').toLowerCase()) {
      case 'a': return 'nutri-a';
      case 'b': return 'nutri-b';
      case 'c': return 'nutri-c';
      case 'd': return 'nutri-d';
      case 'e': return 'nutri-e';
      default:  return 'nutri-unknown';
    }
  }
}