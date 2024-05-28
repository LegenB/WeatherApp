import { Meteor } from 'meteor/meteor';
//DB
import { WeatherData, WeatherDataToday } from "../imports/api/WeatherDB";
//Methods
import '../imports/api/WeatherMethod'



Meteor.startup(async () => {

  // We publish the entire weatherData collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish('weatherData', function () {
    return WeatherData.find();
  });
  Meteor.publish('weatherDataToday', function () {
    return WeatherDataToday.find();
  });

});
