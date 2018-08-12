import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WeatherProvider} from "../../providers/weather/weather";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  location: {
    city: string,
    state: string
  };

  constructor(
    public navCtrl: NavController,
    private weatherProviser: WeatherProvider,
    private storage: Storage) {

  }

  ionViewWillEnter() {
    this.storage.get('location').then((val) => {
      if(val !== null) {
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Miami',
          state: 'FL'
        };
      }

      this.weatherProviser
        .getWeather(this.location.city, this.location.state)
        .subscribe(val => {
          console.log(val);
          this.weather = val;
        });

    });
  }

}
