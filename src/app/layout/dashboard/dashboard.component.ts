import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Subscription } from 'rxjs';
import { CityMeta } from 'src/app/core/app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'bb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cities: CityMeta[];
  cityWeather$: Subscription;
  weatherData;

  constructor(private weatherService: WeatherService, private router: Router) { }

  ngOnInit() {
    this.cityWeather$ = this.weatherService.getCities().subscribe(cities => {
      this.cities = cities;
    });

  }

  /**
   * goto city weather detail page
   * @param city city name (string)
   */
  gotoDetail(city) {
    this.router.navigate(['/weather', city.cityName]);
  }

  /**
   * add new city to the dashboard
   */
  addCity() {
    let newEntry = prompt('Enter city, country & Image (comma separated)');
    if (!newEntry) {
      return;
    }
    let [cityName, country, coverImage] = newEntry.split(',');
    this.cities.push({
      cityId:  123,
      cityName: cityName,
      country: country,
      coverImage: coverImage.trim()
    })
  }

  ngOnDestroy(): void {
    this.cityWeather$.unsubscribe();
  }

}
