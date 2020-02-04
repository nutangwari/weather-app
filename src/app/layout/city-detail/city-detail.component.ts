import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CityMeta } from 'src/app/core/app.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bb-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {

  cityName: string;
  cityInfo: CityMeta;
  forecast;
  scrollDelta = 200;
  currentMeta;
  forecast$: Subscription;
  cityMeta$: Subscription;

  constructor(private actRoute: ActivatedRoute,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.actRoute.params.subscribe(data => {
      this.cityName = data.cityName;
      this.loadWeatherData(this.cityName);
      this.getCityMeta(this.cityName);
    })
  }

  /**
   * load weather forecast data for passed city
   * @param cityName city name (string)
   */
  loadWeatherData(cityName) {
    this.forecast$ = this.weatherService.getCityForecast(cityName).subscribe(data => {
      this.forecast = data;
      this.currentMeta = data.list[0];
    });
  }

  /**
   * get city information for the passed city name
   * @param cityName city name (string)
   */
  getCityMeta(cityName) {
    this.cityMeta$ = this.weatherService.getCityMeta(cityName).subscribe((cityMeta: CityMeta) => {
      this.cityInfo = cityMeta[0];
    });
  }

  /**
   * display selected timeslot weather on main screen
   */
  showWeather(timeSlot) {
    this.currentMeta = timeSlot;
  }

  /**
   * scroll based on direction, -1 is for backward and 1 for forward direction
   * @param dir scroll direction
   */
  scroll(dir: 1|-1) {
    window.scrollBy({
      behavior: 'smooth',
      top: this.scrollDelta*dir
    });
  }

  ngOnDestroy() {
    this.forecast$.unsubscribe();
    this.cityMeta$.unsubscribe();
  }

}
