import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export type recentUsers=
  {
  name: string;
  role: string;
  joined: string;
  avatar: string;

}

const avatarUrl ='https://i.pravatar.cc/150?img=';

@Component({
  selector: 'app-recent-users',
  imports: [
    CommonModule
  ],
  templateUrl: './recent-users.component.html',
  styleUrl: './recent-users.component.css'
})
export class RecentUsersComponent {
      recentUsers:recentUsers[]=[
        {
          name: "Sarah Johnson",
          role: "Customer",
          joined: "2 days ago",
          avatar: "https://i.pravatar.cc/150?img=3"
        },
        {
          name: "Emily Wilson",
          role: "Customer",
          joined: "1 week ago",
          avatar: "https://i.pravatar.cc/150?img=7"
        },
        {
          name: "David Anderson",
          role: "Merchant",
          joined: "2 weeks ago",
          avatar: "https://i.pravatar.cc/150?img=15"
        }
      ]
}
