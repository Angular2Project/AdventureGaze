import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
			console.log(value);
            return value.filter(function (el: any) {
                return el.city.toLowerCase().indexOf(input) > -1;
            })
        }
        return value;
    }
}