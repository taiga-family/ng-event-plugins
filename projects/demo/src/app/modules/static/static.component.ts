import {AsyncPipe, NgIf} from '@angular/common';
import {type AfterViewChecked, ChangeDetectionStrategy, Component} from '@angular/core';
import {Highlight} from 'ngx-highlightjs';

import {PopupComponent} from '../popup/popup.component';
import {SelectComponent} from '../select/select.component';

@Component({
    standalone: true,
    selector: 'static',
    imports: [AsyncPipe, Highlight, NgIf, PopupComponent, SelectComponent],
    templateUrl: './static.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticComponent implements AfterViewChecked {
    protected readonly typescript = import('!!raw-loader!../select/select.component.ts');

    protected readonly html = import('!!raw-loader!../select/select.template.html');

    protected readonly items = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    protected popup = false;

    public ngAfterViewChecked(): void {
        console.info('change detection cycle', Date.now());
    }

    protected onOpened(): void {
        this.popup = true;
    }

    protected onClosed(): void {
        this.popup = false;
    }
}
