// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true
  //apiKey: "coloca aq"
  //authDomain: "coloca aq"
  //projectId: "coloca aq"
  //storageBucket: "coloca aq"
  //messagingSenderId: "coloca aq"
  //appId: "coloca aq"
  //measurementId: "coloca aq"
};

//const app = initializeApp(environment);
//const analytics = getAnalytics(app);

import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import { producerAccessed } from '@angular/core/primitives/signals';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
