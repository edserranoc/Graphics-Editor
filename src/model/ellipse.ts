import { BoundBox } from './bound-box';
import { Color, ColorHelper } from '../util/color-helper';
import { ClosedFigure } from './closed-figure';

export class Ellipse extends ClosedFigure {

    constructor(
        bbox: BoundBox,
        color: Color,
        lineThickness: number,
        lineStyle: Array<number>,
        fillColor: boolean,
        private initialPointX: number,
        private initialPointY: number,
        private radiusX: number,
        private radiusY: number,
        private rotation: number,
        private startAngle: number,
        private endAngle: number,
    ) {

        super(
            bbox,
            color,
            lineThickness,
            lineStyle,
            fillColor
        );
    }

    doPaint(ctx: CanvasRenderingContext2D): void {

        ctx.strokeStyle = ColorHelper.colorAsString(
            this.color
        );

        // ctx.lineWidth=this.lineThickness;
        // ctx.setLineDash(this.lineStyle);

        ctx.beginPath();
        ctx.ellipse(
            this.initialPointX,
            this.initialPointY,
            this.radiusX,
            this.radiusY,
            this.rotation,
            this.startAngle,
            this.endAngle
        );

        if(this.fillColor){
            ctx.fillStyle = ColorHelper.colorAsString(
                this.color
            );
            ctx.fill();
        }

        
        
        ctx.stroke();
    }
}