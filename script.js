const API_KEY = 'a6ade53015ed47ee8e120459240812';

async function getWeather() {
    const dateInput = document.getElementById('dateInput').value;
    const location = document.getElementById('locationInput').value;
    const weatherResult = document.getElementById('weatherResult');

    if (!location || !dateInput) {
        weatherResult.innerHTML = '<p class="error">날짜와 도시를 모두 입력해주세요.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&dt=${dateInput}`);
        const data = await response.json();

        if (data.error) {
            weatherResult.innerHTML = '<p class="error">날씨 정보를 찾을 수 없습니다.</p>';
            return;
        }

        const forecast = data.forecast.forecastday[0];
        const weather = `
            <div class="weather-info">
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>날짜: ${forecast.date}</p>
                <img src="https:${forecast.day.condition.icon}" alt="날씨 아이콘">
                <p>날씨: ${forecast.day.condition.text}</p>
                <p>최고 기온: ${forecast.day.maxtemp_c}°C</p>
                <p>최저 기온: ${forecast.day.mintemp_c}°C</p>
                <p>평균 기온: ${forecast.day.avgtemp_c}°C</p>
                <p>강수량: ${forecast.day.totalprecip_mm}mm</p>
                <p>습도: ${forecast.day.avghumidity}%</p>
            </div>
        `;

        weatherResult.innerHTML = weather;
    } catch (error) {
        weatherResult.innerHTML = '<p class="error">날씨 정보를 가져오는 중 오류가 발생했습니다.</p>';
        console.error('Error:', error);
    }
}
