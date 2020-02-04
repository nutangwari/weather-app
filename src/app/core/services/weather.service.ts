import { Injectable } from "@angular/core";
import { Observable, of, from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { filter, map, switchMap, first } from 'rxjs/operators';
import { CityMeta } from "../app.model";

@Injectable({
  providedIn: "root"
})

export class WeatherService {

  endpoint = environment.weatherApi;

  constructor(private http: HttpClient) {

  }

  /**
   * get weather for the passed city
   * @param cityName string city name
   */
  getCityWeather(cityName): Observable<any> {
    return this.http.get(environment.weatherApi + cityName);
  }

  /**
   * get forecast for passed city name
   * @param cityName string city name
   */
  getCityForecast(cityName): Observable<any> {
    return this.http.get(environment.forecastApi + cityName);
  }

  /**
   * get list of cities added to the users dashboard
   */
  getCities(): Observable<any> {
    return of(
      [
        {
          cityName: 'London',
          cityId: 2643743,
          country: 'GB',
          coverImage: '../../../assets/images/london-bg.jpg'
        },
        {
          cityName: 'Paris',
          cityId: 2988507,
          country: 'FR',
          coverImage: '../../../assets/images/paris-bg.jpg'
        },
        {
          cityName: 'Rome',
          cityId: 6539761,
          country: 'IT',
          coverImage: '../../../assets/images/rome-bg.jpg'
        },
        {
          cityName: 'Amsterdam',
          cityId: 2759794,
          country: 'NL',
          coverImage: '../../../assets/images/amsterdam-bg.jpg'
        },
        {
          cityName: 'Berlin',
          cityId: 2950159,
          country: 'DE',
          coverImage: '../../../assets/images/berlin-bg.jpg'
        },
      ]
    )
  }

  /**
   *get city meta for passed city name
   * @param cityName city name
   */
  getCityMeta(cityName): Observable<CityMeta> {
    return this.getCities().pipe(
      map(cities => cities.filter(city => city.cityName == cityName))
    )
  }
}
