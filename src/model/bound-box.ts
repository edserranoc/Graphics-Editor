import { ControlPoint } from './control-point';
import { ColorHelper } from '../util/color-helper';
import { GraphicsObject } from './graphics-object';

export interface  Position {
    x: number;
    y: number;
}

export interface Dimension {
    w: number;
    h: number;
}

export class BoundBox implements GraphicsObject {

    static readonly color: string = ColorHelper.colorAsString({
        r: 28,
        g: 116,
        b: 232,
        a: 255,
    });

    // public interface -------------------------------

    constructor(
        private position: Position,
        private size: Dimension ) {
    }

    paint( 
        ctx: CanvasRenderingContext2D ): void {

        // draw bound box
        ctx.strokeStyle = BoundBox.color;
        ctx.beginPath();
        ctx.rect( 
            this.position.x, this.position.y, 
            Math.abs(this.size.w),     Math.abs(this.size.h) 
        );
        ctx.stroke();
    }

    get x(): number {
        return this.position.x;
    }

    get y(): number {
        return this.position.y;
    }

    get w(): number {
        return this.size.w;
    }

    get h(): number {
        return this.size.h;
    }

    select(
        evDown: MouseEvent,
        evUp?: MouseEvent ): boolean {
         
        if ( evUp ) {
            // bound box selection
            return this.contained(
                evDown, evUp
            );
        }

        // point selection
        return this.contains(
            evDown
        );
    }

    contains(
        ev: MouseEvent ): boolean {

        const left:   number = this.x - ControlPoint.HSIZE;
        const right:  number = this.x + this.w + ControlPoint.HSIZE;
        const top:    number = this.y - ControlPoint.HSIZE;
        const bottom: number = this.y + this.h + ControlPoint.HSIZE;
                
        return left <= ev.offsetX && ev.offsetX <= right
            && top <= ev.offsetY && ev.offsetY <= bottom;
    }
    
    move(
        dx: number, 
        dy: number ): void {
        
        this.position.x += dx;
        this.position.y += dy;
    }

    // NEW
    moveTo(
        x: number, 
        y: number ): void {

        this.position.x = x;
        this.position.y = y;
    }

    resize(
        dx: number, 
        dy: number ): void {

        this.size.w += dx;
        this.size.h += dy;
    }

    // non-public members -----------------------------
    
    // TODO
    private contained(
        evDown: MouseEvent,
        evUp: MouseEvent ): boolean {

        return false;
    }
}
