import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
    standalone: true,
    selector: 'popup',
    templateUrl: './popup.template.html',
    styleUrl: './popup.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(window:keydown.esc)': 'onEsc()',
    },
})
export class PopupComponent {
    @Output()
    public readonly closed = new EventEmitter<void>();

    protected onEsc(): void {
        this.closed.emit();
    }
}
