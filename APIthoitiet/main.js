document.addEventListener('DOMContentLoaded',function(){
    var body = document.querySelector('body')
var content = document.querySelector('.content')
var weather = document.querySelector('#weather')
var search = document.querySelector('.search')
var city = document.querySelector('.city')
var country = document.querySelector('.country')
var time = document.querySelector('.time')
var value = document.querySelector('.value')
var shortDescripton = document.querySelector('.short-desc')
var visibility = document.querySelector('.visibility span')
var wind = document.querySelector('.wind span')
var sun = document.querySelector('.sun span')

async function chanceWeatherUI(choiceCapital) {
    try {
        let urlAPi = `https://api.openweathermap.org/data/2.5/weather?q=${choiceCapital}&appid=21490b440f242c6c404cf35476de9808`
        let data = await fetch(urlAPi).then(res => res.json())
        if (data.cod == 200) {
            content.classList.remove('hiden');
            city.innerText = data.name
            country.innerText = data.sys.country
            visibility.innerText = data.visibility + 'm'
            wind.innerText = data.wind.speed + 'm/s'
            sun.innerText = data.main.humidity + '%'
            let unittemp = document.createElement("sup")
            let temp = Math.round((data.main.temp - 273.15)) 
            value.innerText = temp + '°C'
            shortDescripton.innerText = data.weather[0] ? data.weather[0].main : ''
            time.innerText = new Date().toLocaleString('vi')
            console.log(temp)
            if (temp < 20)
                body.setAttribute('class', 'winter')
            else if (temp >=20 && temp <= 23 )
                body.setAttribute('class', 'spring')
            else if (temp >=24 &&temp <= 27)
                body.setAttribute('class', 'autumn')
            else 
                body.setAttribute('class', 'summer')
        }
        else{
            content.classList.add('hiden')
        }
    } catch (error) {
        console.error('Error fetch api : ' , error)
    }
}
search.addEventListener('keypress' , function(e){
    if(e.code === 'Enter'){
    let capitalSearch = search.value.trim()
    chanceWeatherUI(capitalSearch)
    }
})
chanceWeatherUI('abc')
})