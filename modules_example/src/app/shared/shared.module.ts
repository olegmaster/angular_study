import {NgModule} from '@angular/core';
import {ColorDirective} from './color.directive';
import {PageNamePipe} from './page-name.pipe';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        ColorDirective,
        PageNamePipe
    ],
    exports: [
        ColorDirective,
        PageNamePipe,     
    ]
})
export class SharedModule {

}
