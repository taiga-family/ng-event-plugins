import {AsyncPipe} from '@angular/common';
import {type AfterViewChecked, ChangeDetectionStrategy, Component} from '@angular/core';
import {HighlightAuto} from 'ngx-highlightjs';

import {PopupComponent} from '../popup/popup.component';
import {SelectComponent} from '../select/select.component';

@Component({
    selector: 'static',
    imports: [AsyncPipe, HighlightAuto, PopupComponent, SelectComponent],
    templateUrl: './static.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticComponent implements AfterViewChecked {
    protected readonly typescript = import('../select/select.component.ts?raw', {
        with: {loader: 'text'},
    });

    protected readonly html = import('../select/select.template.html?raw', {
        with: {loader: 'text'},
    });

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
