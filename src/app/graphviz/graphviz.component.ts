import {AfterViewInit, Component, ElementRef, ErrorHandler, OnInit, ViewChild} from '@angular/core';
import 'viz.js';
import * as SvgPanZoom from 'svg-pan-zoom';
import {DataService} from '../data.service';
import {MatSelectChange, MatSnackBar} from '@angular/material';

declare var Viz: any;

@Component({
  selector: 'app-graphviz',
  templateUrl: './graphviz.component.html',
  styleUrls: ['./graphviz.component.css']
})
export class GraphvizComponent implements OnInit, AfterViewInit, ErrorHandler {


  @ViewChild('graph') graph: ElementRef;


  selectedEngine: string;
  selectedFormat: string;

  engines = [
    {value: 'circo', viewValue: 'circo'},
    {value: 'dot', viewValue: 'dot'},
    {value: 'fdp', viewValue: 'fdp'},
    {value: 'neato', viewValue: 'neato'},
    {value: 'osage', viewValue: 'osage'},
    {value: 'twopi', viewValue: 'twopi'}
  ];

  formats = [
    {value: 'svg', viewValue: 'svg'},
    {value: 'png-image-element', viewValue: 'png'},
    {value: 'json', viewValue: 'json'},
    {value: 'xdot', viewValue: 'xdot'},
    {value: 'plain', viewValue: 'plain'},
    {value: 'ps', viewValue: 'ps'}
  ];

  private result;
  private parser: DOMParser;
  private graphTxt: string;

  constructor(private data: DataService, public snackBar: MatSnackBar) {
    this.parser = new DOMParser();
  }

  ngOnInit(): void {
    this.selectedEngine = 'dot';
    this.selectedFormat = 'svg';
    this.data.currentGraphSrc.subscribe(graphSrcTxt => this.updateGraphContent(graphSrcTxt));
  }

  ngAfterViewInit() {
  }

  updateGraphContent(graphSrcTxt: string) {
    this.graphTxt = graphSrcTxt;
    this.updateGraph();
  }

  updateGraph() {

    try {
      this.result = Viz(this.graphTxt, {engine: this.selectedEngine, format: this.selectedFormat});
    } catch (error) {
      this.handleError(error);
    }

    this.cleanOutput();
    if (this.selectedFormat === 'svg') {
      this.svgOutput();
    } else if (this.selectedFormat === 'png-image-element') {
      this.pngOutput();
    } else {
      this.snackBar.open('not yet implemented !', 'Fermer', {duration: 2000});
    }
  }

  handleError(error: any): void {
    console.log(error.message);
    this.snackBar.open(error.message, 'Fermer', {duration: 2000});
  }

  changeEngine(event: MatSelectChange) {
    this.selectedEngine = event.value;
    this.updateGraph();
  }

  changeFormat(event: MatSelectChange) {
    this.selectedFormat = event.value;
    this.updateGraph();
  }

  downloadImage() {
    this.snackBar.open('not yet implemented !', 'Fermer', {duration: 2000});
  }
  private svgOutput() {
    const svg = this.parser.parseFromString(this.result, 'image/svg+xml').documentElement;
    svg.id = 'graph_svg';
    const origWidth = svg.getAttribute('width');
    const origHeigth = svg.getAttribute('height');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 ' + origWidth + ' ' + origHeigth);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    this.graph.nativeElement.appendChild(svg);

    const svgPanZoom: SvgPanZoom.Instance = SvgPanZoom(svg);
    svgPanZoom.enableZoom();
    svgPanZoom.enablePan();
    svgPanZoom.enableControlIcons();
    svgPanZoom.fit();
    svgPanZoom.center();
    svgPanZoom.setMinZoom(0.1);
  }

  private pngOutput() {
    const png = this.result;
    png.setAttribute('class', 'img-center');
    this.graph.nativeElement.appendChild(png);
  }

  private cleanOutput() {
    const svg = this.graph.nativeElement.querySelector('svg');
    if (svg) {
      this.graph.nativeElement.removeChild(svg);
    }
    const png = this.graph.nativeElement.querySelector('img');
    if (png) {
      this.graph.nativeElement.removeChild(png);
    }
  }
}
