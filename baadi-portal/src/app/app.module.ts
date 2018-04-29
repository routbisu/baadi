import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './components/common/breadcrumb/breadcrumb.component';
import { LoginComponent } from './components/common/login/login.component';
import { LeftNavbarComponent } from './components/common/left-navbar/left-navbar.component';
import { TopNavbarComponent } from './components/common/top-navbar/top-navbar.component';
import { MobileProfileSectionComponent } from './components/common/mobile-profile-section/mobile-profile-section.component';
import { NavListItemComponent } from './components/common/nav-list-item/nav-list-item.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RaiseTicketComponent } from './components/pages/raise-ticket/raise-ticket.component';
import { ManageTicketsComponent } from './components/pages/manage-tickets/manage-tickets.component';

// List of routes used in the application
const appRoutes = [
  // Home Page
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  // Login Page
  { path: 'login', component: LoginComponent },
  // Helpdesk
  { path: 'tickets', data: { breadcrumb: 'Helpdesk' },
    children: [
      // Add a new apartment
      { path: 'raise', component: RaiseTicketComponent, data: { breadcrumb: 'Raise Ticket' } },
      { path: 'manage', component: ManageTicketsComponent, data: { breadcrumb: 'Manage Tickets' } }
    ]
  }
  // Catch all route for undefined routes
  // { path: '**', component: SaHomeComponent, data: { breadcrumb: 'Home' } }
];

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    LoginComponent,
    LeftNavbarComponent,
    TopNavbarComponent,
    MobileProfileSectionComponent,
    NavListItemComponent,
    HomeComponent,
    RaiseTicketComponent,
    ManageTicketsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }