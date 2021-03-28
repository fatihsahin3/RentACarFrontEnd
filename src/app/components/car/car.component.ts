import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  cars: Car[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  currentCar: Car;
  selectedBrand: Brand;
  selectedBrandId: number;
  selectedColor: Color;
  selectedColorId: number;
  dataLoaded = false;
  templateUrl: string = 'https://localhost:4200';
  filterText = '';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        if (params['brandId'] === 'all') {
          this.getCars();
        } else {
          this.getCarsByBrand(params['brandId']);
        }
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.getBrandsofListedCars(this.cars);
      this.getColorsofListedCars(this.cars);
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrandAndColor(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }

  getBrandsofListedCars(cars: Car[]) {
    let itemExists: boolean;

    cars.forEach((c) => {
      let brand: Brand = { id: c.brandId, brandName: c.brandName };
      itemExists = false;

      this.brands.forEach((item) => {
        if (brand.id === item.id) {
          itemExists = true;
        }
      });

      if (!itemExists) {
        this.brands.push(brand);
      }
    });
  }

  getColorsofListedCars(cars: Car[]) {
    let itemExists: boolean;

    cars.forEach((c) => {
      let color: Color = { id: c.colorId, colorName: c.colorName };
      itemExists = false;

      this.colors.forEach((item) => {
        if (color.id === item.id) {
          itemExists = true;
        }
      });

      if (!itemExists) {
        this.colors.push(color);
      }
    });
  }

  getCarClass(car: Car) {
    if (car == this.currentCar) {
      return 'table-info cursorPointer';
    } else {
      return 'cursorPointer';
    }
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
  }

  setSelectedBrandId(brandId: number) {
    this.selectedBrandId = brandId;
  }

  setSelectedColorId(colorId: number) {
    this.selectedColorId = colorId;
  }
}
