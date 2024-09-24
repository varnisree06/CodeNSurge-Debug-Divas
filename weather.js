var inputvalue = document.querySelector('#cityinput')
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')
var chennai = document.querySelector('#chennai')
apik ="e671d1ddcf3ad7c42a4499ccd6e976cb"
function convertion(val)
{
    return (val - 273).toFixed (3)
}
console.log(chennai.innerHTML);

fetch('https://api.openweathermap.org/data/2.5/weather?q='+chennai.innerHTML+'&appid='+apik)
    .then(res => res.json())

    .then(data =>
        {
            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var tempature = data['main']['temp']
            var wndspeed = data['wind']['speed'] 
            
            // city.innerHTML=Weather of <span>${nameval}<span>
            temp.innerHTML = `Temperature: <span>${ convertion (tempature)} C</span>`
            description.innerHTML = `Sky Conditions: <span>${descrip}<span>`
            wind.innerHTML = `Wind Speed: <span>${wndspeed} km/h<span>`
        })
    
        .catch(err => alert('You entered Wrong city name'))
btn.addEventListener('click', function()
{

    
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputvalue.value+'&appid='+apik)
    .then(res => res.json())

    .then(data =>
        {
            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var tempature = data['main']['temp']
            var wndspeed = data['wind']['speed'] 
            
            // city.innerHTML=Weather of <span>${nameval}<span>
            temp.innerHTML = `Temperature: <span>${ convertion (tempature)} C</span>`
            description.innerHTML = `Sky Conditions: <span>${descrip}<span>`
            wind.innerHTML = `Wind Speed: <span>${wndspeed} km/h<span>`
        })
    
        .catch(err => alert('You entered Wrong city name'))
    })