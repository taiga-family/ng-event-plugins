import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    inject,
} from '@angular/core';
import type {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';
import {By, EventManager} from '@angular/platform-browser';
import {BehaviorSubject, identity} from 'rxjs';

import {shouldCall} from '../decorators/should-call';
import {EventPluginsModule} from '../module';
import {BindEventPlugin} from '../plugins/bind.plugin';
import {SilentEventPlugin} from '../plugins/silent.plugin';
import {asCallable} from '../utils/as-callable';

describe('EventManagers', () => {
    @Component({
        template: `
            <div
                class="wrapper"
                (click)="onWrapper($any($event))"
            >
                <div
                    id="stopped-clicks"
                    class="element"
                    (click.stop)="onStoppedClick()"
                ></div>
                <div
                    id="prevented-clicks"
                    class="element"
                    (click.prevent)="onPreventedClick()"
                ></div>
                <div
                    id="filtered-clicks"
                    class="element"
                    (click.silent)="onFilteredClicks($event.bubbles)"
                ></div>
            </div>
            <div
                class="wrapper"
                (click.capture.stop)="(0)"
            >
                <div
                    id="captured-clicks"
                    class="element"
                    (click)="onCaptured()"
                ></div>
            </div>
            <div
                class="wrapper"
                (click.self)="onBubbled()"
            >
                <div
                    id="bubbled-clicks"
                    class="element"
                    (click)="(0)"
                ></div>
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        @HostBinding('$.data-value.attr')
        @HostListener('$.data-value.attr')
        @HostBinding('$.tabIndex')
        @HostListener('$.tabIndex')
        @HostBinding('$.style.marginTop.%')
        @HostListener('$.style.marginTop.%')
        @HostBinding('$.class.active')
        @HostListener('$.class.active')
        public readonly test = asCallable(new BehaviorSubject<number | null>(1));

        public flag = false;
        public custom = false;
        public onStoppedClick = jasmine.createSpy('onStoppedClick');
        public onPreventedClick = jasmine.createSpy('onPreventedClick');
        public onWrapper = jasmine.createSpy('onWrapper');
        public onCaptured = jasmine.createSpy('onCaptured');
        public onBubbled = jasmine.createSpy('onBubbled');
        public readonly elementRef = inject(ElementRef<HTMLElement>);

        @shouldCall(bubbles => bubbles)
        @HostListener('document:click.silent.stop.prevent')
        public onFilteredClicks(_bubbles: boolean): void {
            this.flag = true;
        }

        @HostListener('document>custom')
        public onCustom(): void {
            this.custom = true;
        }
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [EventPluginsModule],
            declarations: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();

        testComponent.onWrapper.calls.reset();
        testComponent.onStoppedClick.calls.reset();
        testComponent.onPreventedClick.calls.reset();
        testComponent.onBubbled.calls.reset();
    });

    it('Global events work', () => {
        const event = new CustomEvent('custom');

        document.dispatchEvent(event);
        fixture.detectChanges();

        void expect(testComponent.custom).toBe(true);
    });

    it('Clicks are stopped', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(
            By.css('#stopped-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        void expect(testComponent.onWrapper).not.toHaveBeenCalled();
        void expect(testComponent.onStoppedClick).toHaveBeenCalled();
    });

    it('Clicks go through with default prevented', () => {
        const event = new Event('click', {bubbles: true, cancelable: true});
        const element = fixture.debugElement.query(
            By.css('#prevented-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        void expect(testComponent.onPreventedClick).toHaveBeenCalled();
        void expect(testComponent.onWrapper).toHaveBeenCalled();
        void expect(
            testComponent.onWrapper.calls.mostRecent().args[0].defaultPrevented,
        ).toBe(true);
    });

    it('Clicks are filtered', () => {
        const event = new Event('click');
        const element = fixture.debugElement.query(
            By.css('#filtered-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        void expect(testComponent.flag).toBe(false);
    });

    it('Clicks go through filtered', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(
            By.css('#filtered-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        void expect(testComponent.flag).toBe(true);
    });

    it('Clicks are captured', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(
            By.css('#captured-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        void expect(testComponent.onCaptured).not.toHaveBeenCalled();
    });

    it('Self listeners not triggered on bubbled events', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(
            By.css('#bubbled-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        void expect(testComponent.onBubbled).not.toHaveBeenCalled();
    });

    it('Self listeners triggered on events originated on the same element', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(By.css('#bubbled-clicks'))
            .nativeElement.parentElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        void expect(testComponent.onBubbled).toHaveBeenCalled();
    });

    it('Observable bindings work', () => {
        void expect(
            testComponent.elementRef.nativeElement.getAttribute('data-value'),
        ).toBe('1');
        void expect(testComponent.elementRef.nativeElement.tabIndex).toBe(1);
        void expect(testComponent.elementRef.nativeElement.style.marginTop).toBe('1%');
        void expect(
            testComponent.elementRef.nativeElement.classList.contains('active'),
        ).toBe(true);
    });

    it('Observable bindings are updated', () => {
        testComponent.test.next(null);

        void expect(
            testComponent.elementRef.nativeElement.getAttribute('data-value'),
        ).toBeNull();
        void expect(testComponent.elementRef.nativeElement.tabIndex).toBe(0);
        void expect(testComponent.elementRef.nativeElement.style.marginTop).toBe('1%');
        void expect(
            testComponent.elementRef.nativeElement.classList.contains('active'),
        ).toBe(false);
    });

    it('bind plugin doesnt crash if observable is missing', () => {
        const bind = new BindEventPlugin();
        const element: any = document.createElement('div');

        bind.manager = TestBed.inject(EventManager);

        void expect(() => bind.addEventListener(element, 'test')).not.toThrow();
    });

    describe('shouldCall does not crash without zone', () => {
        class Test {
            public flag = false;

            @shouldCall(identity)
            public test(flag: boolean): void {
                this.flag = flag;
            }
        }

        it('and calls the method', () => {
            const test = new Test();

            test.test(true);

            void expect(test.flag).toBe(true);
        });

        it('and doesnt call the method', () => {
            const test = new Test();

            test.flag = true;
            test.test(false);

            void expect(test.flag).toBe(true);
        });
    });

    it('@shouldCall works without NgZone', () => {
        class Test {
            public flag = false;

            @shouldCall(identity)
            public test(flag: boolean): void {
                this.flag = flag;
            }
        }

        const test = new Test();
        const zone = SilentEventPlugin.ngZone;

        SilentEventPlugin.ngZone = undefined;
        test.test(true);
        SilentEventPlugin.ngZone = zone;

        void expect(test.flag).toBe(true);
    });
});
