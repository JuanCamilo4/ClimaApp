const API_KEY = '84957808f8c887c691e1e63ffc9d4997';
const txtCiudad = $('#txt_nombre_ciudad');
const btnBuscar = $('#btn_buscar');

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
            alert('No se encontraron datos de la ciudad seleccionada');
        });
}

const showData = (data, ciudad) =>{
    console.log(data);
    const datos = {
        name: ciudad,
        temp: data.main.temp,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
    }

    $('.container-main').prepend(
        `<div class="card">
            <div class="container-title-city">
                <i class='${datos['temp'] > 25 ? 'far fa-sun' : "fas fa-cloud-sun"}'></i>
                <p id="nombreCiudad">
                    ${datos['name']}
                </p>
            </div>
            <div class="container-data">
                <p class="data-item" id="dataTemp">
                    <b>Temperatura: </b>
                    ${datos['temp']} °C
                </p>
                <p class="data-item" id="dataHumedad">
                    <b>Humedad: </b>
                    ${datos['humidity']}
                </p>
                <p class="data-item" id="dataPresion">
                    <b>Presión: </b>
                    ${datos['pressure']} Torr
                </p>
            </div>
        </div>`
    );

    txtCiudad.val('');
}