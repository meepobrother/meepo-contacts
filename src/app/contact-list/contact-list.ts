import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { MeepoHistory } from 'meepo-base';
import { StoreService } from 'meepo-store';
import { EventService } from 'meepo-event';

import { FOOTER_HIDDEN, FOOTER_SHOWN } from 'meepo-footer';

import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
    selector: 'contact-list',
    templateUrl: './contact-list.html',
    styleUrls: ['./contact-list.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactListComponent extends MeepoHistory {
    key: string = 'contact.list';
    data: any[] = [];
    page: number = 1;
    psize: number = 10;

    constructor(
        public store: StoreService,
        public cd: ChangeDetectorRef,
        public title: Title,
        public router: Router,
        public event: EventService
    ) {
        super(store, cd, title);
    }

    meepoInit() {
        this.event.publish(FOOTER_HIDDEN, '');
    }

    add() {
        this.router.navigate(['/contact/add'], { queryParams: { key: this.key } });
    }

    edit(item: any) {
        this.router.navigate(['/contact/add'], { queryParams: { key: this.key, uid: item.uid } });
    }

    delete(item: any) {
        this.removeItem(item);
    }

    up(e: any) {
        this.page++;
        let items = this.store.getList(this.key, this.page, this.psize);
        if (items.length > 0) {
            this.data = [...this.data, ...items];
            e.next(true);
        } else {
            e.next(true);
        }
    }

    down(e: any) {
        this.page = 1;
        this.data = this.store.getList(this.key, this.page, this.psize);
        e.next(false);
    }
}