import type {EventManager} from '@angular/platform-browser';

import type {EventManagerPlugin} from '../types/event-manager-plugin';
import {LongtapEvent} from '../types/longtap.event';
import {isIos} from '../utils/is-ios';

const TAP_DELAY = 700;
const SAFE_NAVIGATOR = typeof navigator === 'undefined' ? null : navigator;
const MOVE_THRESHOLD = 15;

export class LongtapEventPlugin implements EventManagerPlugin {
    private readonly isIOS = !!SAFE_NAVIGATOR && isIos(SAFE_NAVIGATOR);

    public readonly manager!: EventManager;

    public addEventListener(
        element: HTMLElement,
        _event: string,
        handler: (event: Event) => void,
    ): Function {
        const removeLongtapEventPolyfill = this.isIOS
            ? this.listenTouchEvents(element)
            : this.listenContextmenuEvent(element);

        element.addEventListener('longtap', handler);

        return () => {
            removeLongtapEventPolyfill();

            element.removeEventListener('longtap', handler);
        };
    }

    public supports(event: string): boolean {
        return event === 'longtap';
    }

    private listenContextmenuEvent(element: HTMLElement): Function {
        return this.manager.addEventListener(
            element,
            'contextmenu.prevent.stop',
            ({clientX, clientY}: MouseEvent) => {
                this.dispatchLongtapEvent(element, clientX, clientY);
            },
        );
    }

    private listenTouchEvents(element: HTMLElement): Function {
        let longTapTimeout: any = null;
        let touchStartCoords: {
            clientX: number;
            clientY: number;
        } | null = null;

        const reset = (): void => {
            clearTimeout(longTapTimeout);
            touchStartCoords = null;
            longTapTimeout = null;
        };

        const removeTouchstartListener = this.manager.addEventListener(
            element,
            'touchstart.zoneless.passive',
            ({touches}: TouchEvent) => {
                const touch = touches[0];

                if (!touch) {
                    return;
                }

                const {clientX, clientY} = touch;

                touchStartCoords = {clientX, clientY};

                longTapTimeout = setTimeout(() => {
                    this.dispatchLongtapEvent(element, clientX, clientY);
                    reset();
                }, TAP_DELAY);
            },
        );

        const removeTouchmoveListener = this.manager.addEventListener(
            element,
            'touchmove.zoneless.passive',
            ({touches}: TouchEvent) => {
                const touch = touches[0];

                if (!touch || !touchStartCoords) {
                    return;
                }

                const {clientX, clientY} = touch;

                if (
                    Math.hypot(
                        clientX - touchStartCoords.clientX,
                        clientY - touchStartCoords.clientY,
                    ) <= MOVE_THRESHOLD
                ) {
                    return;
                }

                reset();
            },
        );

        const removeTouchcancelListener = this.manager.addEventListener(
            element,
            'touchcancel.zoneless.passive',
            reset,
        );

        const removeTouchendListener = this.manager.addEventListener(
            element,
            'touchend.zoneless.passive',
            reset,
        );

        return () => {
            removeTouchstartListener();
            removeTouchmoveListener();
            removeTouchcancelListener();
            removeTouchendListener();
        };
    }

    private dispatchLongtapEvent(
        element: HTMLElement,
        clientX: number,
        clientY: number,
    ): void {
        element.dispatchEvent(
            new LongtapEvent('longtap', {
                clientX,
                clientY,
                bubbles: false,
                cancelable: false,
                composed: false,
            }),
        );
    }
}
