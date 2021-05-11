import "./css/main.css";
import Weather from "./weather";
import Options from "./weather/options";

console.log("Load - index.js")

/* Singleton */
let app = null;

class App {
    constructor($elem, $icon, $content) {
        if (app) return app;

        this._elem = $elem;
        this._icon = $icon;
        this._content = $content;
        this._weather = new Weather();

        this._elem.addEventListener('click', this.clickHandler);
        this._elem.addEventListener('keypress', this.keyPressHandler);

        app = this;
    }

    /* Event Delegation - All ClickEvent Handler */
    clickHandler = (e) => {
        let target = e.target.id;
        if (target == "search-btn") {
            this.searchHandler();
        }
    }

    keyPressHandler = (e) => {
        if (e.target.id == 'search-text' && e.key == 'Enter') {
            this.searchHandler();
        }
    }

    searchHandler = async () => {
        let search = document.getElementById("search-text") || "";
        let city = search.value;
        if (!city) {
            alert("도시이름을 입력해주세요 !");
            return;
        }
        search.value = '';

        try {
            let weather = await this._weather.getWeather(city);
            console.log(weather);

            /* 표시할 정보 : 날짜 아이콘 , 도시이름 , 최고최저온도
             , 현재온도 , 체감온도 , 풍속 , 기압 , 습도 */
            this._icon.innerText = Options[weather.weather[0].main].icon;

            let contents = [];
            contents.push({ label: '도시', content: weather.name });
            contents.push({ label: '최고온도', content: weather.main.temp_max + '°C' });
            contents.push({ label: '최저온도', content: weather.main.temp_min + '°C' });
            contents.push({ label: '현재온도', content: weather.main.temp + '°C' });
            contents.push({ label: '체감온도', content: weather.main.feels_like + '°C' });
            contents.push({ label: '풍속', content: weather.wind.speed + 'm/s' });
            contents.push({ label: '기압', content: weather.main.pressure + 'hPa' });
            contents.push({ label: '습도', content: weather.main.humidity + '%' });

            this._content.innerHTML = '';
            for (let content of contents) {
                let elem = this.createWeatherContent(content);
                this._content.append(elem);
            }

        } catch (e) {
            alert(e.message);
        }

    }

    createWeatherContent = (content) => {
        let elem = document.createElement('div');

        elem.classList.add('weather__item');
        elem.innerHTML = `<div class="weather__item-label">${content.label}</div>
                <div class="weather__item-content">${content.content}</div>`;

        return elem;
    }
}


new App(document.getElementById("main")
    , document.getElementById("weather__icon")
    , document.getElementById("weather__content"));