import axios from 'axios';
//reqs for TS + Google interaction
declare var google: any;
const Google_API_key = "input_key_here";
//
const form = document.querySelector('form')!;
const address = document.getElementById('address')! as HTMLInputElement;


//expected res
type GeocodingResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
}

function searchHandler(event: Event){
    event.preventDefault();
    const enteredAddress = address.value;

    axios.get<GeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)},+CA&key=${Google_API_key}`)
    .then(res => {
        if (res.data.status !== 'OK'){
            throw new Error('Unable to find location.');
        }
        let coords = res.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById("map"), {
            center: coords,
            zoom: 8
          });
        new google.maps.Marker({position: coords, map: map});
    })
    .catch(err => {
        alert(err.message);
        console.log(err);
    });
}

form?.addEventListener('submit', searchHandler);