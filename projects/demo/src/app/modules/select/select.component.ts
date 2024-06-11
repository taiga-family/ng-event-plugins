import {DOCUMENT} from '@angular/common';
import type {QueryList} from '@angular/core';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    inject,
    Input,
    Output,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import {shouldCall} from '@taiga-ui/event-plugins';

@Component({
    selector: 'custom-select',
    templateUrl: './select.template.html',
    styleUrls: ['./select.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
    @ViewChild('input')
    private readonly input!: ElementRef;

    @ViewChildren('option')
    private readonly options!: QueryList<ElementRef>;

    private readonly document = inject(DOCUMENT);
    private readonly elementRef = inject(ElementRef);

    @HostBinding('class._open')
    protected open = false;

    @Input()
    public items: readonly string[] = [];

    @Input()
    public value = '';

    @Output()
    public readonly valueChange = new EventEmitter<string>();

    @HostBinding('class._focused')
    protected get focused(): boolean {
        return this.elementRef.nativeElement.contains(this.document.activeElement);
    }

    // Only react to Esc if dropdown is open
    @shouldCall((_, open) => open)
    @HostListener('keydown.esc.silent', ['$event', 'open'])
    protected onEsc(event: KeyboardEvent): void {
        event.stopPropagation();
        this.input.nativeElement.focus();
        this.open = false;
    }

    // Only react to focusout if focus leaves component boundaries
    @shouldCall((relatedTarget, nativeElement) => !nativeElement.contains(relatedTarget))
    @HostListener('focusout.silent', ['$event.relatedTarget', 'elementRef.nativeElement'])
    protected onBlur(): void {
        this.open = false;
    }

    // Only react to mousemove if focus is required
    @shouldCall(element => element !== document.activeElement)
    protected onMouseMove(element: HTMLElement): void {
        element.focus();
    }

    // Only react to arrow down if we are not on the last item
    @shouldCall((currentIndex, length) => currentIndex < length - 1)
    protected onArrowDown(currentIndex: number, _length?: number): void {
        this.options
            ?.find?.((_item, index) => index === currentIndex + 1)
            ?.nativeElement.focus();
    }

    // Only react to arrow up if we are not on the first item
    @shouldCall(currentIndex => !!currentIndex)
    protected onArrowUp(currentIndex: number): void {
        this.options
            ?.find?.((_item, index) => index === currentIndex - 1)
            ?.nativeElement.focus();
    }

    protected onClick(): void {
        this.open = !this.open;
    }

    protected onSelect(value: string): void {
        this.input.nativeElement.focus();
        this.value = value;
        this.valueChange.emit(value);
        this.open = false;
    }

    protected onInputArrowDown(): void {
        if (!this.options.first) {
            this.open = true;
        } else {
            this.options.first.nativeElement.focus();
        }
    }
}
