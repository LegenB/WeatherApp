import { WeatherData, WeatherDataToday } from "./WeatherDB";


export function insertWeatherToday(data) {
   
    //console.log(data)
    WeatherDataToday.remove({});

    WeatherDataToday.insert({
        cityName: data.cityName,
        windSpeed: data.windSpeed,
        temp: data.temperature,
        feelsLike: data.feelsLike,
        humidity: data.humidity,
        icon: data.icon,
        desc: data.desc

    }, (error, result) => {
        if (error) {
            console.error('Error Upload data:', error);
        } else {
            console.log('Successful data Upload:', result);
        }
    });
}

export function insertWeather(data) {

    //console.log(data)
    WeatherData.remove({}); // Cleand after adding
   
    
    data.forEach(data => {
        WeatherData.insert({
            cityName: data.cityName,
            temp: data.temp,
            humidity: data.humidity,
            speed: data.speed,
            date: data.date.split(' ')[0], 
            time: data.date.split(' ')[1],
            icon: data.icon,
            desc: data.desc
        
        }, (error, result) => {
            if (error) {
                console.error('Error Upload data:', error);
            } else {
                console.log('Successful data Upload:', result);
            }
        });
    });
}