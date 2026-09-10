import { Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { HomeComponent } from '../components/home/home.component';
import { MyParcelsComponent } from '../components/my-parcels/my-parcels.component';
import { ParcelComponent } from '../components/parcel/parcel.component';
import { ParcelsComponent } from '../components/parcels/parcels.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';

export const routes: Routes = [

  // Auth layout (login)
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ]
  },

  // Main app layout
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'myParcels',
        component: MyParcelsComponent,
      },
      {
        path: 'parcel/:trackingNumber',
        component: ParcelComponent,
      },
      {
        path: 'parcels',
        component: ParcelsComponent,
      },
    ],
  },

  // 404
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
