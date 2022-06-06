import { Pipe, PipeTransform } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../../Model/Product';

@Pipe({
  name: 'foo',
  pure: false

})
export class FooPipe implements PipeTransform {
  private spinner: NgxSpinnerService

  transform(list_product: Product[], searchTerm: string): Product[] {
    this.spinner.show()
    if (!list_product || !searchTerm) {
      this.spinner.hide()
        return list_product;
    }
    return list_product.filter(list_product =>
      list_product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
}



}

export class AutocompletePipeStartsWith implements PipeTransform {
    public transform(collection: any[], term = "") {
        return collection.filter((item) => item.toString().toLowerCase().startsWith(term.toString().toLowerCase()));
    }
}
