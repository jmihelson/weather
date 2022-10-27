const https = require('https');



let request = https.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.5&lon=0', (res) => {
  if (res.statusCode != 200) {
    console.error(`Error code: ${res.statusCode}`);
    res.resume();
    return;
  }

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('close', () => {
    let formatedData = JSON.parse(data)
    console.log(`Kellaaeg: ${formatedData.properties.timeseries[0].time}`)
    console.log(`Temperatuur: ${formatedData.properties.timeseries[0].data.instant.details.air_temperature}C`)

  });
}); 