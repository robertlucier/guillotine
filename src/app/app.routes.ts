import { Routes, RouterModule } from '@angular/router';
import { About } from './about';
import { Resize } from './resize';
import { DragBoxComponent } from './drag.component';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: DragBoxComponent },
  { path: 'drag',  component: DragBoxComponent },
  { path: 'resize',  component: Resize },
  { path: 'about', component: About },
  { path: '**',    component: NoContent },
];
