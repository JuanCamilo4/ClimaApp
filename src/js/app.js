const API_KEY = '84957808f8c887c691e1e63ffc9d4997';
const txtCiudad = $('#txt_nombre_ciudad');
const btnBuscar = $('#btn_buscar');
const containerInformacion = $('.container_informacion');

let ciudad;

btnBuscar.click(function (e) { 
    e.preventDefault();
    fetchData();
});

const fetchData = () =>{
    ciudad = txtCiudad.val();
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${ciudad}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => showData(data, ciudad))
        .catch(err => {
            alert('Ingrese el nombre de una ciudad');
        });
}

const showData = (data, ciudad) =>{
    console.log(data);
    const datos = {
        name: ciudad,
        temp: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        sea_level: data.main.sea_level
    }

    $('.txt-nombre').text(datos['name']);
    $('#temp').text(`${datos['temp']}°C`);
    $('#temp-min').text(`${datos['temp_min']}°C`);
    $('#temp-max').text(`${datos['temp_max']}°C`);
    $('#humidity').text(`${datos['humidity']}%`);
    $('#pressure').text(`${datos['pressure']}`);
    $('#sea_level').text(datos['sea_level']==undefined ? 'No se encuentra disponible' : datos['sea_level']);

    showTermometro(datos['temp']);
}

const showTermometro = temp =>{
    let temperaturaProcentaje = (temp*100)/50;
    const termometro = $('.container-termometro div');
    
    if (temp > 50) {
        termometro.css({
            height: '100%'
        });
    } else {
        let colorTermometro;

        if (temp > 0.99 && temp < 15.99) {
            colorTermometro = '#326bd4';
        } else if (temp > 15.99 && temp < 35.99) {
            colorTermometro = '#d4bc32';
        } else if (temp > 35.99 && temp <= 50.99) {
            colorTermometro = '#d43232';
        }

        termometro.css({
            height: `${temperaturaProcentaje}%`,
            backgroundColor: colorTermometro
        });
    }
}