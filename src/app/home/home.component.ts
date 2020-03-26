import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../services/weather.service';
import { Observable, timer, Subject, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  link: string = 'home';
  clock$: Observable<string>;
  temperature$: Observable<any>;

  constructor(private weather: WeatherService) {
  }

  ngOnInit() {

    this.clock$ = timer(0, 500)
      .pipe(map(_ => new Date().toLocaleTimeString("en-US", { timeZone: "America/Denver" })))

    this.temperature$ = timer(0, 1000 * 60 * 10)
      .pipe(
        flatMap(_ => this.weather.getWeather()),
        map((data: any) => data.currently.temperature)
      );
  }


}