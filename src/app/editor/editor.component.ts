import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AceEditorComponent} from 'ng2-ace-editor';
import {DataService} from '../data.service';
import {saveAs} from 'file-saver';
import {FileUploader} from 'ng2-file-upload';
import {MatSnackBar} from '@angular/material';

const URL = '/api/';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit, OnInit {

  @ViewChild('editor') editor: AceEditorComponent;
  content: string;

  uploader = new FileUploader({url: URL});

  constructor(private data: DataService, public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.data.currentGraphSrc.subscribe(graphSrcTxt => this.content = graphSrcTxt);
  }

  ngAfterViewInit() {
    this.editor.setTheme('chrome');
    this.editor.setMode('dot');
    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
    });
    this.editor.getEditor().commands.addCommand({
      name: 'showOtherCompletions',
      bindKey: 'Ctrl-.',
      exec: function (editor) {

      }
    });
  }

  onChangeEditor(txt) {
    this.data.changeGraph(txt);
  }

  download() {
    saveAs(new Blob([this.content], {type: 'text'}), 'graph.dot');
  }

  upload() {
    this.snackBar.open('not yet implemented !', 'Fermer', {duration: 2000});
  }
}
