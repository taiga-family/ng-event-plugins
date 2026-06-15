import {ChangeDetectionStrategy, Component, output} from '@angular/core';

@Component({
    standalone: true,
    selector: 'popup',
    templateUrl: './popup.template.html',
    styleUrl: './popup.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {'(window:keydown.esc)': 'onEsc()'},
})
export class PopupComponent {
    protected readonly closed = output();

    protected onEsc(): void {
        this.closed.emit();
    }
}
