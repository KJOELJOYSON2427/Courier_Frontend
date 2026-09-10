import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ShowAllParcelComponent } from '../components/show-all-parcel/show-all-parcel.component';
import { ShowUsersComponent } from '../components/show-users/show-users.component';
import { NewParcelComponent } from '../components/new-parcel/new-parcel.component';
import { ShowParcelComponent } from '../components/show-parcel/show-parcel.component';
import { RegisterUserComponent } from '../components/register-user/register-user.component';
import { LoginComponent } from '../components/login/login.component';
import { PageNotFoundComponentComponent } from '../components/page-not-found-component/page-not-found-component.component';
import { MainLayoutComponent } from '../components/main-layout/main-layout.component';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';
import { UserEditViewComponent } from '../components/user-edit-view/user-edit-view.component';

export const routes: Routes = [

    {
        path: "",
        component: MainLayoutComponent,
        children: [

            {
                path: "", component: HomeComponent
            },
            {
                path: 'parcels',
                component: ShowAllParcelComponent
            },
 {path: 'users/:id', component: UserEditViewComponent },
  { path: 'users/:id/edit', component: UserEditViewComponent },
            {
                path: 'users',
                component: ShowUsersComponent
            },
            {
                path: 'newParcel',
                component: NewParcelComponent
            },
            {
                path: 'newuser',
                component: RegisterUserComponent
            },
            {
                path: 'parcel/:trackingNumber',
                component: ShowParcelComponent
            },

            {
                path: 'parcel/view/:trackingNumber',
                component: ShowParcelComponent,
                data: { mode: 'view' }
            },
            {
                path: 'parcel/edit/:trackingNumber',
                component: ShowParcelComponent,
                data: { mode: 'edit' }
            }

        ]
    },


    // 🔹 Layout WITHOUT header/footer (for login)
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent }
        ]
    },
    {
        path: "**",
        component: PageNotFoundComponentComponent
    }
];
