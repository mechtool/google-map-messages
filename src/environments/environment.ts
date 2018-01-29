// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const fireBaseConfig = {
  apiKey: "AIzaSyANdoXC0pXgwavYarGIt_E2ptScC-QsulU",
  authDomain: "gis-message-bdccb.firebaseapp.com",
  databaseURL: "https://gis-message-bdccb.firebaseio.com",
  projectId: "gis-message-bdccb",
  storageBucket: "gis-message-bdccb.appspot.com",
  messagingSenderId: "226145250276"
};
export const environment = {
  production: false,
  fireBaseConfig : fireBaseConfig
};
