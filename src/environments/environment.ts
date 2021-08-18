// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
  hostUrl: 'http://localhost:4200',
  config: null,
  google: {
    verified: false,
    id: null
  },
  options: [
    { key: 'COVISHIELD', value: 'Covishield' },
    { key: 'COVAXIN', value: 'Covaxin' },
    { key: 'SPUTNIK V', value: 'Sputnik V' }
  ],
  default: 'COVISHIELD',
  about: 'This is a search engine optimized (SEO) angular v12 progressive web application (PWA) to get live covid-19 vaccination slots, using CoWin public APIs, in Karnataka, Bengal and Maharashtra.'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
