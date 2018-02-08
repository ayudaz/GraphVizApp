import {AfterViewInit, Component, ElementRef, ErrorHandler, OnInit, ViewChild} from '@angular/core';
import 'viz.js';
import * as SvgPanZoom from 'svg-pan-zoom';
import {DataService} from '../data.service';
import {MatSnackBar} from '@angular/material';
declare var Viz: any;

@Component({
  selector: 'app-graphviz',
  templateUrl: './graphviz.component.html',
  styleUrls: ['./graphviz.component.css']
})
export class GraphvizComponent implements OnInit, AfterViewInit, ErrorHandler {


  @ViewChild('graph') graph: ElementRef;
  private result;
  private parser: DOMParser;
  constructor(private data: DataService, public snackBar: MatSnackBar) {
    this.parser = new DOMParser();
  }

  ngOnInit(): void {
    this.data.currentGraphSrc.subscribe(graphSrcTxt => this.updateGraph(graphSrcTxt));
  }

  ngAfterViewInit() { }

  updateGraph(graphSrcTxt: string) {

    let svg: HTMLElement = this.graph.nativeElement.querySelector('svg');
    if (svg) {
      this.graph.nativeElement.removeChild(svg);
    }
    try {
      this.result = Viz(graphSrcTxt);
    } catch (error) {
      this.handleError(error);
    }

    svg = this.parser.parseFromString(this.result, 'image/svg+xml').documentElement;
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

  handleError(error: any): void {
    console.log(error.message);
    this.snackBar.open(error.message, 'Fermer', {duration: 2000});
  }
}
