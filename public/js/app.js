var backgrounds = {
    113: '../img/bg/bg.jpg',
    116: '../img/bg/cloudy-bg.jpg',
    119: '../img/bg/cloudy-bg.jpg',
    122: '../img/bg/cloudy-bg.jpg',
    176: '../img/bg/drizzle-bg.jpg',
    179: '../img/bg/drizzle-bg.jpg',
    182: '../img/bg/drizzle-bg.jpg',
    185: '../img/bg/drizzle-bg.jpg',
    200: '../img/bg/drizzle-bg.jpg',
    263: '../img/bg/drizzle-bg.jpg',
    266: '../img/bg/drizzle-bg.jpg',
    281: '../img/bg/drizzle-bg.jpg',
    284: '../img/bg/drizzle-bg.jpg',
    293: '../img/bg/drizzle-bg.jpg',
    296: '../img/bg/drizzle-bg.jpg',
    353: '../img/bg/drizzle-bg.jpg',
    362: '../img/bg/drizzle-bg.jpg',
    143: '../img/bg/mist-bg.jpg',
    248: '../img/bg/mist-bg.jpg',
    260: '../img/bg/mist-bg.jpg',
    305: '../img/bg/rain-bg.jpg',
    299: '../img/bg/rain-bg.jpg',
    302: '../img/bg/rain-bg.jpg',
    308: '../img/bg/rain-bg.jpg',
    311: '../img/bg/rain-bg.jpg',
    314: '../img/bg/rain-bg.jpg',
    356: '../img/bg/rain-bg.jpg',
    359: '../img/bg/rain-bg.jpg',
    365: '../img/bg/rain-bg.jpg',
    227: '../img/bg/snow-strong-bg.jpg',
    230: '../img/bg/snow-strong-bg.jpg',
    338: '../img/bg/snow-strong-bg.jpg',
    350: '../img/bg/snow-strong-bg.jpg',
    335: '../img/bg/snow-strong-bg.jpg',
    371: '../img/bg/snow-strong-bg.jpg',
    377: '../img/bg/snow-strong-bg.jpg',
    317: '../img/bg/snow-bg.jpg',
    320: '../img/bg/snow-bg.jpg',
    332: '../img/bg/snow-bg.jpg',
    326: '../img/bg/snow-bg.jpg',
    329: '../img/bg/snow-bg.jpg',
    368: '../img/bg/snow-bg.jpg',
    374: '../img/bg/snow-bg.jpg',
    386: '../img/bg/storm-bg.jpg',
    389: '../img/bg/storm-bg.jpg',
    392: '../img/bg/snow-storm-bg.jpg',
    395: '../img/bg/snow-storm-bg.jpg',
};

document.addEventListener("DOMContentLoaded", function(){
    let now = new Date();
    document.querySelector('.location-time span').insertAdjacentText('beforeend', `${now.getHours()}:${now.getMinutes()}`);

    var seacrhInput = document.querySelector('.weather-search input');

    document.querySelector('.search-btn').onclick = function(){

        document.querySelectorAll('.node-icon').forEach((el) => {
            el.classList.remove('node-icon-small');
        });
        document.querySelectorAll('.node-content').forEach((el) => {
            el.style.display = 'none';
        });

        fetch(`/weather?address=${seacrhInput.value}`).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    seacrhInput.value = data.error;
                }
                else {
                    console.log(data);
                    document.querySelector('.location-place span').innerHTML = data.location;
                    document.querySelector('.location-time span').innerHTML = data.forecast.time.split(' ')[1];

                    document.querySelector('#weather-icon').style.backgroundImage = `url(${data.forecast.general.icon})`;
                    document.querySelector('#description').innerHTML = data.forecast.general.description.split(',')[0];
                    document.querySelector('#temperature span').innerHTML = data.forecast.general.temperature + '&#8451;';
                    document.querySelector('#feelslike span').innerHTML = data.forecast.general.feelslike + '&#8451;';

                    document.querySelector('#humidity span').innerHTML = data.forecast.rain.humidity + '%';
                    document.querySelector('#cloudcover span').innerHTML = data.forecast.rain.cloudcover + '%';
                    document.querySelector('#precip span').innerHTML = data.forecast.rain.precip + 'mm';

                    document.querySelector('#wind-dir span').innerHTML = data.forecast.wind.dir + ', ' + data.forecast.wind.degree + '&#176;';
                    document.querySelector('#wind-speed span').innerHTML = data.forecast.wind.speed + ' km/h';
                    document.querySelector('#pressure span').innerHTML = data.forecast.wind.pressure + ' mb';

                    document.querySelectorAll('.node-icon').forEach((el) => {
                        el.classList.add('node-icon-small');
                    });
                    document.querySelectorAll('.node-content').forEach((el) => {
                        el.style.display = 'flex';
                    });

                    let bgImg = new Image();
                    bgImg.onload = () => {
                        document.querySelector('.main-bg').style.backgroundImage = `url(${backgrounds[data.forecast.general.code]})`;
                        if(data.forecast.is_day == 'no') document.querySelector('.main-bg').style.filter = 'blur(2px) grayscale(0.9) brightness(0.5)';
                        else document.querySelector('.main-bg').style.filter = 'blur(2px)';
                    }
                    bgImg.src = backgrounds[data.forecast.general.code];
                } 
            });
        });
    }
});

