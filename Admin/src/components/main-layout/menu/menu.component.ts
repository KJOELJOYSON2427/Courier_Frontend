import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faUser,
  faBox,
  faUsers,
  faClipboardList,
  faLayerGroup,
  faCog,
  faHdd,
  faChartBar,
  faClipboard,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    FontAwesomeModule

  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  faHome = faHome;
  faUser = faUser;
  faBox = faBox;
  faUsers = faUsers;
  faClipboardList = faClipboardList;
  faLayerGroup = faLayerGroup;
  faCog = faCog;
  faHdd = faHdd;
  faChartBar = faChartBar;
  faClipboard = faClipboard;
  faCalendar = faCalendar;
}
