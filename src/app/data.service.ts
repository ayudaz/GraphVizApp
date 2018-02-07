import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private graphSrc = new BehaviorSubject<string>('digraph G {\n' +
    '\n' +
    '\tsubgraph cluster_0 {\n' +
    '\t\tstyle=filled;\n' +
    '\t\tcolor=lightgrey;\n' +
    '\t\tnode [style=filled,color=white];\n' +
    '\t\ta0 -> a1 -> a2 -> a3;\n' +
    '\t\tlabel = "process #1";\n' +
    '\t}\n' +
    '\n' +
    '\tsubgraph cluster_1 {\n' +
    '\t\tnode [style=filled];\n' +
    '\t\tb0 -> b1 -> b2 -> b3;\n' +
    '\t\tlabel = "process #2";\n' +
    '\t\tcolor=blue\n' +
    '\t}\n' +
    '\tstart -> a0;\n' +
    '\tstart -> b0;\n' +
    '\ta1 -> b3;\n' +
    '\tb2 -> a3;\n' +
    '\ta3 -> a0;\n' +
    '\ta3 -> end;\n' +
    '\tb3 -> end;\n' +
    '\n' +
    '\tstart [shape=Mdiamond];\n' +
    '\tend [shape=Msquare];\n' +
    '}');
  currentGraphSrc = this.graphSrc.asObservable();

  constructor() {}

  changeGraph(graphSrcTxt: string) {
    // console.log(graphSrcTxt);
    this.graphSrc.next(graphSrcTxt);
  }
}
