import { Mongo } from 'meteor/mongo';

export const WeatherData = new Mongo.Collection('weatherData');

export const WeatherDataToday = new Mongo.Collection('weatherDataToday');
