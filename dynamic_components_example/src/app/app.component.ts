import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core'
import {ModalComponent} from "./modal/modal.component";
import {RefDirective} from './ref.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    @ViewChild(RefDirective, {static: false}) refDir: RefDirective;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    showModal() {
        const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
        this.refDir.containerRef.clear();
        const component = this.refDir.containerRef.createComponent(modalFactory);

        component.instance.title = 'Dynamic Component';
        component.instance.close.subscribe(() => {
            this.refDir.containerRef.clear();
        });
    }
}

