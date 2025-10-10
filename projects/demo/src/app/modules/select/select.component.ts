import {DOCUMENT} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    input,
    linkedSignal,
    Output,
    viewChild,
    viewChildren,
} from '@angular/core';
import {shouldCall} from '@taiga-ui/event-plugins';

@Component({
    selector: 'custom-select',
    templateUrl: './select.template.html',
    styleUrl: './select.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class._open]': 'open',
        '[class._focused]': 'focused',
        '(keydown.esc.zoneless)': 'onEsc($event, open)',
        '(focusout.zoneless)': 'onBlur($event.relatedTarget, elementRef.nativeElement)',
    },
})
export class SelectComponent {
    private readonly input = viewChild.required<ElementRef>('input');
    private readonly options = viewChildren<ElementRef>('option');

    private readonly document = inject(DOCUMENT);
    protected readonly elementRef = inject(ElementRef);
    protected open = false;

    protected readonly state = linkedSignal(() => this.value());

    public readonly items = input<readonly string[]>([]);
    public readonly value = input('');

    @Output()
    public readonly valueChange = new EventEmitter<string>();

    protected get focused(): boolean {
        return this.elementRef.nativeElement.contains(this.document.activeElement);
    }

    @shouldCall((_, open) => open)
    protected onEsc(event: KeyboardEvent, _open: boolean): void {
        event.stopPropagation();
        this.input().nativeElement.focus();
        this.open = false;
    }

    @shouldCall(
        (relatedTarget: Element, nativeElement: HTMLElement) =>
            !nativeElement.contains(relatedTarget),
    )
    protected onBlur(_relatedTarget: Element, _nativeElement: HTMLElement): void {
        this.open = false;
    }

    @shouldCall((element) => element !== document.activeElement)
    protected onMouseMove(element: HTMLElement): void {
        element.focus();
    }

    @shouldCall((currentIndex, length) => currentIndex < length - 1)
    protected onArrowDown(currentIndex: number, _length?: number): void {
        this.options()
            .find((_, index) => index === currentIndex + 1)
            ?.nativeElement.focus();
    }

    @shouldCall((currentIndex) => !!currentIndex)
    protected onArrowUp(currentIndex: number): void {
        this.options()
            .find((_, index) => index === currentIndex - 1)
            ?.nativeElement.focus();
    }

    protected onClick(): void {
        this.open = !this.open;
    }

    protected onSelect(value: string): void {
        this.input().nativeElement.focus();
        this.state.set(value);
        this.valueChange.emit(value);
        this.open = false;
    }

    protected onInputArrowDown(): void {
        if (!this.options()[0]) {
            this.open = true;
        } else {
            this.options()[0]?.nativeElement.focus();
        }
    }
}
