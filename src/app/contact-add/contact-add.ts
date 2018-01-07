import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UuidService } from 'meepo-uuid';
import { StoreService } from 'meepo-store';
import { EventService } from 'meepo-event';
import { FOOTER_SHOWN, FOOTER_HIDDEN } from 'meepo-footer';

@Component({
    selector: 'contact-add',
    templateUrl: './contact-add.html',
    styleUrls: ['./contact-add.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactAddComponent implements OnInit {
    widget: any = {
        realname: '',
        mobile: '',
        desc: ''
    };
    key: string = '';
    uid: string;
    constructor(
        public route: ActivatedRoute,
        public uuid: UuidService,
        public store: StoreService,
        public router: Router,
        public event: EventService
    ) {
        this.route.queryParams.subscribe((res: any) => {
            this.key = res.key;
            this.uid = res.uid;
            if (this.uid) {
                let items: any[] = this.store.get(this.key, []);
                items.map(r => {
                    if (r.uid === this.uid) {
                        this.widget = r;
                    }
                });
            }
        });
    }

    ngOnInit() {
        this.event.publish(FOOTER_HIDDEN, '');
    }

    save() {
        let items: any[] = this.store.get(this.key, []);
        if (!this.widget.uid) {
            this.widget.uid = this.uuid.v1();
            items = [this.widget, ...items];
            this.store.set(this.key, items);
        } else {
            items.map((item, index) => {
                if (item.uid === this.widget.uid) {
                    items[index] = this.widget;
                    this.store.set(this.key, items);
                }
            });
        }
        this.router.navigate(['/contact/index']);
    }
}