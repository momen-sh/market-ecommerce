import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { TranslationService } from 'src/app/services/translation.service';
import { Categories } from '../../enums';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() categories: (Categories | string)[] = [];
  @Input() selected: Categories | string = Categories.All;
  @Output() selectCategory = new EventEmitter<Categories | string>();

  constructor(
    private categoriesService: CategoriesService,
    private i18n: TranslationService
  ) { }

  ngOnInit(): void {
    if (!this.categories || this.categories.length === 0) {
      this.categories = this.categoriesService.getCategories();
    }
  }

  onSelect(cat: Categories | string): void {
    this.selected = cat;
    this.selectCategory.emit(cat);
  }

  displayCategory(cat: Categories | string): string {
    const key = `categories.${cat}`;
    const translated = this.i18n.translate(key);
    return translated === key ? String(cat) : translated;
  }
}
