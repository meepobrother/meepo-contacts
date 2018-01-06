import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactAddComponent } from './contact-add/contact-add';
import { ContactListComponent } from './contact-list/contact-list';
import { Routes, RouterModule } from '@angular/router';
let routes: Routes = [{
    path: 'contact/index',
    component: ContactListComponent
}, {
    path: 'contact/add',
    component: ContactAddComponent
}];
import { StoreModule } from 'meepo-store';
import { MeepoFormsModule } from 'meepo-forms';
import { EmptyModule } from 'meepo-empty';
import { MinirefreshModule } from 'meepo-minirefresh';
import { IconsModule } from 'meepo-icons';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule,
        MeepoFormsModule,
        EmptyModule,
        MinirefreshModule,
        IconsModule
    ],
    exports: [
    ],
    declarations: [
        ContactListComponent,
        ContactAddComponent
    ],
    providers: [
    ],
})
export class ContactsModule { }
