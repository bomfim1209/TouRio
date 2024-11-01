// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';

export const environment = {
  production: false,
  apiKey: "AIzaSyDivXsHVAABGRG9Jtk5tYQlXVJyfmLzXs0",
  authDomain: "tourio-20368.firebaseapp.com",
  projectId: "tourio-20368",
  storageBucket: "tourio-20368.firebasestorage.app",
  messagingSenderId: "894586811710",
  appId: "1:894586811710:web:70211c8fa3ad5c5130286f"
};

const app = initializeApp(environment);
const analytics = getAnalytics(app);


import { producerAccessed } from '@angular/core/primitives/signals';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
