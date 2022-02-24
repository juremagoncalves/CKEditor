import { CkeditorPageComponent } from './CKEditor/ckeditor-page/ckeditor-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'ckeditor-page', component: CkeditorPageComponent},
  {path: '', redirectTo:'ckeditor-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
