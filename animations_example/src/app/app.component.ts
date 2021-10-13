import {Component} from '@angular/core';
import {trigger, state, style, transition, animate, query, keyframes} from "@angular/animations";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        trigger('box', [
            state('start', style({background: 'blue'})),
            state('end', style({background: 'yellow', transform: 'scale(1.2)'})),
            state('special', style({
                background: 'orange',
                transform: 'scale(0.5)',
                borderRadius: '50%'
            })),
            state('special2', style({
                background: 'red',
                transform: 'scale(0.5)',
                borderRadius: '50%'
            })),
            transition('start => end', animate(1000)),
            transition('end => start', animate(600)),
            transition('* => special', animate(500)),
            transition(':enter', [
                animate('20s', keyframes([
                    style({background: 'yellow', offset: 0}),
                    style({background: 'pink', offset: 0.1}),
                    style({background: 'orange', offset: 0.15}),
                    style({background: 'red', offset: 0.17}),
                    style({background: 'white', offset: 0.5}),
                    style({background: 'black', offset: 0.6}),
                    style({background: 'blue', offset: 0.67}),
                    style({background: 'green', offset: 0.8}),
                    style({background: 'gray', offset: 0.88}),
                    style({background: 'orange', offset: 1})
                ]))
            ]),
            transition('special => *', [
                query('h4', animate(1500, style({
                    fontSize: '.5rem'
                })))
            ]),
            transition('special2 <=> *', [
                style({background: 'green'}),
                animate('1s', style({background: 'pink'})),
                animate(750)
            ]),
            transition('void => *', [
                style({opacity: 1, background: 'pink'}),
                animate('1150ms ease-out')
            ]),
            transition('* => void', [
                style({opacity: 0, transform: 'scale(2.5)', border: '50px'}),
                animate(2000)
            ])

        ])
    ]
})
export class AppComponent {
    boxState = 'start';
    visible = true;

    animate() {
        this.boxState = this.boxState === 'start' ? 'end' : 'start';
    }

    animationStarted(event: AnimationEvent) {
        console.log('animation started', event);
    }

    animationDone(event: AnimationEvent) {
        console.log('animation done', event);
    }
}
