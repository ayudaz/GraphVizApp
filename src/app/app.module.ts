import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { GraphvizComponent } from './graphviz/graphviz.component';
import { HeaderComponent } from './header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDividerModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import {AngularSplitModule} from 'angular-split';
import {AceEditorModule} from 'ng2-ace-editor';
import {DataService} from './data.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    GraphvizComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatDividerModule,
    AngularSplitModule,
    AceEditorModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
