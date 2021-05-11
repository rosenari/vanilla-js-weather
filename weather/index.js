import Options from "./options";
/* Singleton */
let instance = null;

export default class Weather {
    constructor() {
        if (instance) return instance;

        instance = this;
    }


    getWeather = async (city) => {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Options.APIKEY}&units=metric`);

        if (!response.ok) {
            throw new Error("검색결과 없음");
        }

        return await response.json();
    }
};