import { createSignal } from "solid-js";
import { Tracker } from 'meteor/tracker';
import { Meteor } from "meteor/meteor";
import { WeatherData } from "../api/WeatherDB";
import { DayCard } from "./DayCard";

export const NextDays = () => {

    const [weatherData, setWeatherData] = createSignal([]);

    // Suscribirse a la publicación en el cliente
    Meteor.subscribe('weatherData');

    Tracker.autorun(() => {
      console.log('AutoRun')
      const data = WeatherData.find({}).fetch();
      setWeatherData(data);
    });

    return (

        <div className=" w-full bg-Pur-card mt-4 rounded-md overflow-hidden">

            <div className="flex justify-center items-center  h-[40px] bg-[#5e5ea1] shadow-sm ">
                {weatherData()[0]?.cityName ? (
                    <h1 className="text-white text-lg sm:text-2xl">Weather of the week in {weatherData()[0].cityName}</h1>
                ) : (
                    <h1 className="text-white text-lg sm:text-2xl">Weather of the week</h1>
                )}
            </div>
           
            <div className="flex flex-wrap justify-center items-center py-2 px-1  sm:gap-4 md:gap-6 lg:gap-12">
                {weatherData().length > 0 ? (
                    weatherData().map((data, index) => (
                        <DayCard
                            key={index}
                            date={data.date}
                            temp={data.temp}
                            wind={data.speed}
                            hum={data.humidity}
                            time={data.time.slice(0, -3)}
                            icon={data.icon}
                            desc={data.desc}
                        />
                    ))
                ) : (
                    <p className="text-white">No weather data available</p>
                )}
            </div>

        
              
        </div>

    )
}
