import { reactive } from 'vue';

export const store = reactive({
    apiUrl: 'http://127.0.0.1:8000/api/',
    apartments: [],
    tomTomApiUrl: 'https://api.tomtom.com/search/2/geocode/',
    tomTomApiKey: '5SpDBwX41WJf17bsPmyNJnysKu2nuS3l',
    latitude: null,
    longitude: null
});