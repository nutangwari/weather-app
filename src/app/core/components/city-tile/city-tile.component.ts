import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CityMeta } from '../../app.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bb-city-tile',
  templateUrl: './city-tile.component.html',
  styleUrls: ['./city-tile.component.scss']
})
export class CityTileComponent implements OnInit {

  @Input('cityMeta') cityInfo: CityMeta;

  public weather:any;
  private weather$: Subscription;

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit() {
    // get weather for the passed city
    this.weather$ = this.weatherService.getCityWeather(this.cityInfo.cityName)
    .subscribe((weather: any) => {
      this.weather = weather;
    }, (err: Error) => {
      throw new Error(err.message);
    })
  }

  ngOnDestroy(): void {
    this.weather$.unsubscribe();
  }

}
