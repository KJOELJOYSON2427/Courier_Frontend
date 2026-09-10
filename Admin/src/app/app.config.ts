import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { InjectionToken } from '@angular/core';
import {
  matHomeOutline,
  matSearchOutline,
  matMenuOutline,
  matPerson2Outline,
  matInboxOutline,
  matBarChartOutline,
  matGroups3Outline
} from '@ng-icons/material-icons/outline';

import { routes } from './app.routes';
import { provideCharts } from 'ng2-charts';
import { BarController, PieController } from 'chart.js';
import { environment } from '../../environment/environment';
import { provideHttpClient } from '@angular/common/http';




// This token provides type safety for the string value
export const BACKEND_URL = new InjectionToken<string>('Backend URL for API requests');


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIcons({ matHomeOutline, matSearchOutline, matMenuOutline, matPerson2Outline, matGroups3Outline, matInboxOutline, matBarChartOutline ,
      
      

    }),

    { 
      provide: BACKEND_URL, // The token we defined
      useValue: environment.backendUrl // The value from the environment file
    },
    provideCharts({
      registerables: [
        PieController,
        BarController
      ]
    }),
    
    provideHttpClient(),
    
  ]
};


