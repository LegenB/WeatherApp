import { createSignal } from 'solid-js';
import { Meteor } from "meteor/meteor";




export const SearchForm = () => {
    const [text, setText] = createSignal("");
    const handleSubmit = (event) => {
        event.preventDefault();
        //setIsLoading(true);
          
        Meteor.call('getWeatherNow', text(), (error, result) => {
          if (error) {
            console.error('Error obtaining weather data:', error);
          } else {
            console.log('DataRreceived Today:', result);
            
          }
        });
      
        Meteor.call('getLatLot', text(), (error, result) => {
          //setIsLoading(false);
          if (error) {
            console.error('Error obtaining weather data:', error);
          } else {
            console.log('DataRreceived:', result);
      
      
            setText(''); // Limpiar el campo de entrada
            document.getElementById('text').value = ''; // Vaciar el input por el id
          }
        });
    };
    
    return (
        <div className="relative col-span-2 md:col-span-1 bg-Pur-card rounded-md drop-shadow-lg overflow-hidden"> 
            
            <div className="absolute -bottom-24 -left-24 scale-75 sm:scale-100">
                <img src="images/sunFill.png" alt="sun" />
            </div>
            <div className="absolute -bottom-24 -right-24 scale-75 sm:scale-100">
                <img src="images/cloud.png" alt="cloud" />-
            </div>  
                
            <div className="flex justify-center items-center  h-[40px] bg-[#5e5ea1] shadow-sm ">
                <h1 className="text-white text-lg sm:text-2xl">Search the weather in your city</h1>
            </div>
            
            <div className="flex items-center justify-center h-60 ">
                <form onSubmit={handleSubmit} className="text-white flex flex-col ">
                    <input 
                        className=" bg-slate-700 border border-orange-700  h-9 w-52 rounded-md px-2 mb-5 drop-shadow-sm"
                        type="text" 
                        name="text"
                        id='text'
                        onChange={(e) => {
                        setText(e.target.value) 
                        console.log(text())}}
                        placeholder="Enter city name" 
                        required 
                    />

                    <div className="flex justify-center ">
                        <button type="submit" className=" h-9 w-48 rounded-full bg-orange-700 border-orange-900 drop-shadow-sm">Get Weather</button>

                    </div>
                    
                </form>

            </div>
            
       


        </div>
    );
};
