import {NgModule} from '@angular/core'
import {PreloadAllModules, RouterModule, Routes} from '@angular/router'
import {HomePageComponent} from './home-page/home-page.component'

// ./about-page/about-page.module#AboutPageModule

const routes: Routes = [
    {path: '', component: HomePageComponent, pathMatch: 'full'},
    {
        path: 'about',
        loadChildren: () => import('./about-page/about-page.module').then(m => m.AboutPageModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}