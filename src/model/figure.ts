import { BoundBox } from './bound-box';
import { Color } from '../util/color-helper';
import { Cardinal, ControlPoint } from './control-point';
import { GraphicsObject } from './graphics-object';

export interface Factory {
    create( obj: any ): Figure;
}

export abstract class Figure implements GraphicsObject {

    // NEW
    abstract get name(): string;

    protected abstract doPaint( 
        ctx: CanvasRenderingContext2D ): void;

    // public interface -------------------------------
    
    constructor(
        protected bbox: BoundBox,
        protected color: Color ) {

        if ( Figure.ctrlPoints.length === 0 ) {
            this.addControlPoints();
        }
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected( s: boolean ) {
        this._selected = s;
    }


    addChild(
        f: Figure): void
        {
            this.figures
                .push(f)
        }

    remChild(
        f: Figure): void {
            const idx: number  = this.figures
                .indexOf( f );
            
            if (idx >= 0 ){
                this.figures = this.figures
                .slice( idx , 1)
            }
        }
    
    // Template Method
    paint( 
        ctx: CanvasRenderingContext2D ): void {

        // 1. paint figure
        this.doPaint(
            ctx
        );

        /*this.children.forEach()*/

        // 2. paint bounding box
        if ( this.selected ) {
            if (this.children.length > 0 ) {

            }
            else {
                this.bbox
                .paint(
                    ctx
                );
            }
            // this.bbox
            //     .paint(
            //         ctx
            //     );

            // 3. draw control points
            Figure.ctrlPoints
                .forEach( 
                    (cp: ControlPoint) => cp.paint( ctx, this ) 
                );
        }
    }

    select( 
        evDown: MouseEvent,
        evUp?: MouseEvent ): void {
        
        this.selected = this.bbox
            .select( 
                evDown, 
                evUp 
            );
    }

    contains(
        ev: MouseEvent ): boolean {
        
        return this.bbox
            .contains(
                ev
            );
    }

    getControlPoint(
        ev: MouseEvent ): ControlPoint | undefined {
    
        for ( let i: number = 0; i < Figure.ctrlPoints.length; i++ ) {
            const cp: ControlPoint = Figure.ctrlPoints[
                i
            ];
            if ( cp.contains( ev, this ) ) {
                return cp;
            }
        }
    }

    move(
        dx: number, 
        dy: number) {
        
        this.bbox
            .move(
                dx, 
                dy
            );
    }

    resize(
        dx: number, 
        dy: number ): void {

        this.bbox
            .resize( 
                dx,
                dy
            );
    }

    get x(): number {
        return this.bbox.x;
    }
    get y(): number {
        return this.bbox.y;
    }
    get w(): number {
        return this.bbox.w;
    }
    get h(): number {
        return this.bbox.h;
    }

    // NEW
    toJSON(): any {
        return {
            bbox: this.bbox,
            color: this.color
        };
    }

    // non-public members -----------------------------

    protected _selected: boolean = false;
    
    static readonly ctrlPoints: ControlPoint[] = [
    ];

    private addControlPoints(): void {

        // target = ES2017+
        //
        // Object.values(
        //     Cardinal
        // )
        // .map( (cardinal: Cardinal) =>
        //     this.ctrlPoints
        //         .push(
        //             new ControlPoint(
        //                 this,
        //                 cardinal
        //             )
        //         )
        // );

        // target = ES5
        //
        Object.keys(
            Cardinal
        )
        .map( (key: string) => {
            const cardinal: number = Number( 
                key 
            );

            if ( !isNaN( cardinal ) ) {
                Figure.ctrlPoints
                    .push(
                        new ControlPoint(
                            cardinal
                        )
                    );
                }
        });
    }
}
