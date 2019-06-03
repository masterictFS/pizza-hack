import {Component, Input} from '@angular/core';
import {Pizza} from '../models/pizza.model';
import {FormControl} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PizzasCompareComponent} from '../pizzas-compare/pizzas-compare.component';

@Component({
  selector: 'app-pizzas-list',
  templateUrl: './pizzas-list.component.html',
  styleUrls: ['./pizzas-list.component.css']
})
export class PizzasListComponent {
  @Input() pizzas: Pizza[];
  @Input() originalPizzas: Pizza[];
  @Input() isDefaultPizza: boolean;

  filter = new FormControl('');

  constructor(private modalService: NgbModal) {
    this.filter.valueChanges.subscribe(
      (response) => {
        this.pizzas = this.originalPizzas.filter(p => p.containsAllMulti(response.split('+')));
      },
      (error) => console.log(error)
    );
  }

  openCompareModal(pizza: Pizza) {
    const modalRef = this.modalService.open(PizzasCompareComponent, { size: 'lg' });
    // cloning pizza to get a fresh copy, otherwise i'd change the name of the original
    modalRef.componentInstance.setPizza(pizza.clone());
  }
}
