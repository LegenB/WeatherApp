import { Meteor } from 'meteor/meteor';
//Methods
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
//DB
import { WeatherData, WeatherDataToday } from "./WeatherDB";
import {  insertWeather,insertWeatherToday} from "./SaveInData";


Meteor.methods({
    getLatLot(cityName){ // Get City 5 days of Weather
        check(cityName, String);
        //console.log(cityName);
          
        const apiKey = Meteor.settings.API_KEY;
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
        
        try {
        const response = HTTP.get(url);
        
        
        if (response.data.length === 0) {
            throw new Meteor.Error('no-results', 'No results found for the given city name');
        }
        
        let lat = response.data[0].lat;
        let lon = response.data[0].lon;
        //console.log(lat)
        //console.log(lon)
        const GetDays = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        try {
            const resp = HTTP.get(GetDays);
            
            // Limit the list for the first 40 items, Filter to get one item for every 8 items -> get 5 days
            const weatherData = resp.data.list.slice(3, 40).filter((data, index) => index % 8 === 0).map(data => ({
                cityName: cityName,
                temp: data.main.temp,
                humidity: data.main.humidity,
                speed: data.wind.speed,
                date: data.dt_txt,
                icon: data.weather[0].icon,
                desc: data.weather[0].description
            }));
            
            

            insertWeather(weatherData)
            
        } catch (error) {
            console.error('Error al obtener datos del clima:', error);
            throw new Meteor.Error('api-call-failed', 'Error al obtener datos del clima');
        }
        } 
        catch (error) {
        console.error('Error to get lat & lot:', error);
        throw new Meteor.Error('api-call-failed', 'Error to get lat & lot');
        }
    },
    getWeatherNow(cityName) { // Get One Day Weather
        check(cityName, String);
        
        console.log('Llamo a get Weather Now con el Nombre ' + cityName);

        const apiKey = Meteor.settings.API_KEY; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=metric&exclude=current`;
    
        try {
            const response = HTTP.get(url);
            
            if (response.data.length === 0) {
                throw new Meteor.Error('no-results', 'No results found for the given city name');
            }
            
            const data = {
                cityName: response.data.name,
                windSpeed: response.data.wind.speed,
                temperature: response.data.main.temp,
                feelsLike: response.data.main.feels_like,
                humidity: response.data.main.humidity,
                icon: response.data.weather[0].icon,
                desc: response.data.weather[0].description
            }

            insertWeatherToday(data);
           
                    
        } 
        catch (error) {
            console.error('Error to get Data From Name', error);
            throw new Meteor.Error('api-call-failed', 'Error to get Data From Name');
        }
    },
    getDB(){ // See Data Base (For test)
        console.log('Get DATA BASE')
    
        const res = WeatherData.find().fetch()
        const resNow = WeatherDataToday.find().fetch()
    
        console.log(res)
        console.log("******** ********")
        console.log(resNow)
    },
    getDelete(){ // Delete all Data in Data Base (For test)
        console.log('Get DATA BASE')
        WeatherDataToday.remove({})
        WeatherData.remove({})
    
        console.log('borrado')
        const res = WeatherData.find().fetch()
    
        console.log(res)
    }
  
})