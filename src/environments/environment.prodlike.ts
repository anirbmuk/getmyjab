export const environment = {
  production: true,
  calendarByDistrictRoot: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict',
  calendarByPinRoot: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin',
  covid19Root: 'https://data.covid19india.org/data.json',
  minimumAge: 18,
  BBMP: 294,
  BANGALORE_URBAN: 265,
  BANGALORE_RURAL: 276,
  KOLKATA: 725,
  KOLHAPUR: 371,
  CHIKKABALLAPUR: 291,
  N24PARGANAS: 730,
  MUMBAI: 395,
  CHENNAI: 571,
  minimumCapacity: 0,
  dose: 'first',
  fee: 'All',
  mapper: {
    first: 'available_capacity_dose1',
    second: 'available_capacity_dose2'
  },
  vaccineDoseGap: 84,
  tabState: {
    index: 0,
    label: 'Karnataka'
  },
  hostUrl: 'https://getmyjab.el.r.appspot.com',
  config: {
    apiKey: "AIzaSyCOWrd0n_ODeHrCVvOqqXUwRZU7dlvcCK4",
    authDomain: "getmyjab.firebaseapp.com",
    projectId: "getmyjab",
    storageBucket: "getmyjab.appspot.com",
    messagingSenderId: "915839162344",
    appId: "1:915839162344:web:dcab3c44866f498b57b65d",
    measurementId: "G-Y7TZW19QEH"
  },
  google: {
    verified: true,
    id: 'W2ZbsaQgL_QYRXPjJcxtVWXVY5cg6ZbVnibWMOngoj4'
  },
  options: [
    { key: 'COVISHIELD', value: 'Covishield' },
    { key: 'COVAXIN', value: 'Covaxin' },
    { key: 'SPUTNIK V', value: 'Sputnik V' }
  ],
  default: 'COVISHIELD',
  about: 'This is a search engine optimized (SEO) angular v12 progressive web application (PWA) to get live covid-19 vaccination slots, using CoWin public APIs, in Karnataka, Bengal and Maharashtra.'
};
