import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';

declare var p5: any;

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit, OnDestroy {

  private p5;
  private origin = { x: 0, y: 0 };
  private toggle = true;

  constructor() {
    console.log('digital-constructed');
    window.onresize = this.onWindowResize;
  }

  ngOnInit() {
    console.log('digital-init');
    this.createCanvas();
  }

  ngOnDestroy(): void {
    this.createCanvas();
    console.log('audio-destroy');
  }

  private onWindowResize = (e) => {
    this.p5.resizeCanvas(this.p5.windowWidth, this.p5.windowHeight);
  }

  private createCanvas = () => {
    console.log('creating canvas');
    if (this.toggle) {
      this.p5 = new p5(this.drawing);
      this.toggle = !this.toggle;
    } else {
      this.p5.noCanvas();
      this.toggle = !this.toggle;
    }
  }

  private drawing = function (p: any) {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent('digital-watch-canvas');
      p.background(0);
    };

    p.draw = () => {
      const time = {
        hr: p.hour(),
        mn: p.minute(),
        sc: p.second(),
        ms: p.millis()
      };
      const center = {
        x: p.width / 2,
        y: p.height / 2
      };

      p.background(0);

      const clock = time.hr + ':' + time.mn + ':' + time.sc;
      p.fill(255);
      p.noStroke();
      p.textSize(50);
      p.text(clock, center.x, center.y);
    };
  };

}
