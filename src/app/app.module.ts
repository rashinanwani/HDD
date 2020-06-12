import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { GetDataServiceService } from './services/get-data-service.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './SharedModule/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'Login', pathMatch: 'full' },
      { path: 'Login', component: LoginComponent },
      { path: 'Dashboard', component: DashboardComponent },
    ]),
    // { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [GetDataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
