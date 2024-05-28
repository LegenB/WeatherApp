import { createSignal, onCleanup } from "solid-js";
import { Tracker } from 'meteor/tracker';
import { Meteor } from "meteor/meteor";
import { WeatherDataToday } from "../api/WeatherDB";



export const Today = () => {
    const [weatherToday, setWeatherToday] = createSignal({});
    
    Meteor.subscribe('weatherDataToday');

    Tracker.autorun(() => {
        //console.log('AutoRun Today')
        const data = WeatherDataToday.find({}).fetch();
        setWeatherToday(data[0]);
    });

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="order-last sm:order-first col-span-2 md:col-span-1 bg-Pur-card rounded-md drop-shadow-lg overflow-hidden"> 
           
            <div className="flex justify-center items-center  h-[40px] bg-[#5e5ea1] shadow-sm ">
                <h1 className="text-white text-lg sm:text-2xl">Current weather</h1>
            </div>
            <div className='grid grid-cols-2 grid-rows-2 '>
                              
                <div className="relative flex items-center justify-center overflow-hidden h-[130px]">
                    <div className="relative h-[130px] w-full">
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherToday()?.icon || '01d'}@2x.png`}
                            alt="icon"
                            className={`absolute top-0 left-1/2 transform -translate-x-1/2 drop-shadow-sm ${weatherToday()?.icon === '50d' || weatherToday()?.icon === '13d' || weatherToday()?.icon === '13n' || weatherToday()?.icon === '50n' ? 'invert' : ''}`}
                        />
                        <p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-lg sm:text-2xl text-gray-100 text-center w-full">
                            {capitalizeFirstLetter(weatherToday()?.desc || '')}
                        </p>
                    </div>
                </div>      
                <div className="py-5">
                    <div>
                        <h1 className="text-center sm:text-left text-2xl sm:text-4xl text-gray-100">{weatherToday()?.cityName || ''}</h1>
                        <div className=" mt-2 sm:mt-4">
                            <h2 className="text-center sm:text-left text-2xl sm:text-4xl text-gray-100">{weatherToday()?.temp !== undefined ? Math.round(weatherToday().temp) : ''}°C</h2>
                            
                        </div>
                        
                    </div>
                    
                </div>
                <div className="col-span-2  flex items-center justify-center  ">
                    
                    <ul>
                        <li className="text-sm sm:text-base text-gray-100 flex mt-2">
                            <span className="mr-3"><img src="/images/wind.png" alt="wind"  className="size-5 sm:size-6 drop-shadow-sm"/> </span> 
                            <span className="mr-2 text-gray-300">Wind Speed </span>{weatherToday()?.windSpeed !== undefined ? Math.round(weatherToday().windSpeed) : ''}km/hr
                        </li>
                        <li className="text-sm sm:text-base text-gray-100 flex mt-2">
                            <span className="mr-3"><img src="/images/droplet.png" alt="droplet"  className="size-5 sm:size-6 drop-shadow-sm"/> </span> 
                            <span className="mr-2 text-gray-300">Humidity </span>{weatherToday()?.humidity || ''}%
                        </li>
                        <li className="text-sm sm:text-base text-gray-100 flex mt-2">
                            <span className="mr-3"><img src="/images/temperature.png" alt="temp"  className="size-5 sm:size-6 drop-shadow-sm"/> </span> 
                            <span className="mr-2 text-gray-300">It feels like </span>{weatherToday()?.feelsLike !== undefined ? Math.round(weatherToday().feelsLike) : ''}°C
                        </li>
                    </ul>
                </div>
            </div>
          
        </div>
    );
};
