import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';

export const flyInOutTrigger =  trigger('flyInOut', [
  state('*', style({transform: 'translateX(0)'})),
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate(150)
  ]),
  transition(':leave', [
    animate(150, style({transform: 'translateX(-100%)'}))
  ])
]);

export const shakeFormTrigger =  trigger('shakeForm', [
  state('stop', style({left : '0px'})),
  transition('stop => *', [
    animate("300ms", keyframes([
      style({ left : '10px', offset: 0.2 }),
      style({ left : '-10px', offset: 0.4 }),
      style({ left : '10px', offset: 0.6}),
      style({ left : '-10px', offset: 0.8 }),
      style({ left : '0px', offset: 1 }),
    ]))
  ]),
]);
