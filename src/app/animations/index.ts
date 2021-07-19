import { trigger, transition, style, animate, state, query, animateChild, keyframes, animation, useAnimation, group } from "@angular/animations";
import { reduce } from "rxjs/operators";

export const backgroundAnimations = trigger('backgroundAnimations', [
    state('open', style({
        backgroundColor: '#94DB11',
    })),
    state('close', style({
        backgroundColor: '#FF5E2D',
    })),
    transition('open => close', [
        animate('0.5s'),
    ]),
    transition('close => open', [
        animate('500ms')
    ])
]);

// wildcard: * 用途
export const backgroundAnimations2 = trigger('backgroundAnimations2', [
    state('open', style({
        backgroundColor: '#94DB11',
    })),
    state('close', style({
        backgroundColor: '#FF5E2D',
    })),
    state('mix', style({
        backgroundColor: '#FFCD07',
        borderRadius: '30px',
    })),
    transition('open <=> close', [
        animate('0.5s'),
    ]),
    transition('* => mix, * => open, * => close', [
        animate(300)
    ]),
]);

// 可重用動畫
const reusableBackgroundAnimation = animation([
    style({
        backgroundColor: '{{ backgroundColor }}'
    }),
    animate('{{ time }}')
]);

export const backgroundAnimations3 = trigger('backgroundAnimations3', [
    state('open', style({
        backgroundColor: '#94DB11',
    })),
    state('close', style({
        backgroundColor: '#FF5E2D',
    })),
    transition('open => close', [
        useAnimation(reusableBackgroundAnimation, {
            params: {
                backgroundColor: 'blue',
                time: '1s'
            }
        })
    ]),
    transition('close => open', [
        useAnimation(reusableBackgroundAnimation, {
            params: {
                backgroundColor: 'red',
                time: '1s'
            }
        })
    ])
]);

// void 用途、屬性的 * 代表意思
export const simpleFader = trigger('simpleFader', [
    transition('void => *', [
        style({
            opacity: 0,
        }),
        animate('300ms', style({
            opacity: 1,
        })),
    ]),
    transition('* => void', [
        style({
            opacity: '*',
        }),
        animate('300ms', style({
            opacity: 0,
        }))
    ])
]);

// :enter, :leave 的用途
export const simpleFader2 = trigger('simpleFader2', [
    transition(':enter', [
        style({
            opacity: 0,
        }),
        animate('300ms', style({
            opacity: 1,
        })),
    ]),
    transition(':leave', [
        animate('300ms', style({
            opacity: 0
        }))
    ])
]);

// 父子動畫順序 (animateChild), keyframes
export const parentAnimation = trigger('parentAnimation', [
    // state('0', style({
    //     fontSize: '*',
    // })),
    // state('1', style({
    //     fontSize: '*',
    // })),
    transition('0 => 1', [
        query('*', [
            style({
                fontSize: '3rem',
            }),
            animate(500)
        ]),
        query('@childAnimation', [
            animateChild()
        ])
    ]),
    transition('1 => 0', [
        query('*', [
            style({
                fontSize: '0',
            }),
            animate(500)
        ]),
        query('@childAnimation', [
            animateChild()
        ])
    ]),
]);

export const childAnimation = trigger('childAnimation', [
    transition('0 <=> 1', [
        animate(`500ms cubic-bezier(.17,.67,.27,1.26)`, keyframes([
            style({
                opacity: 0,
                transform: 'scale3d(.1, .1, .1)',
                offset: 0
            }),
            style({
                opacity: 1,
                transform: 'scale3d(1, 1, 1)',
                offset: 1
            }),
        ]))
    ]),
]);

export const routerAnimation = trigger('routerAnimation', [
    transition('* <=> *', [
        style({
            position: 'relative',
        }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
            })
        ]),
        query(':enter', [
            style({ left: '-100%' })
        ]),
        group([
            query(':leave', [
                animate('200ms ease-out', style({ left: '100%' }))
            ]),
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%' }))
            ])
        ]),
    ])
]);