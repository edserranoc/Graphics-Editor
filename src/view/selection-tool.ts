import { ControlPoint } from '../model/control-point';
import { Figure } from '../model/figure';
import { Tool } from './tool';

import app from '../index';

export class SelectionTool extends Tool {
    
    getName(): string {
        return 'SelectionTool';
    }

    // private methods ------------------------------------------------------

    private fSelected: Figure;
    private fCtrlPoint: ControlPoint;

    // NEW
    // override
    onMouseDown(
        ev: MouseEvent ): void {

        if ( this.fSelected || this.fCtrlPoint ) {
            // NOOP
        }
        else {
            app.deselectAll();
        }

        super.onMouseDown(
            ev
        );
    }

    // override
    protected getCursor( 
        ev: MouseEvent ): string {

        this.fCtrlPoint = app.getControlPoint(
            ev
        );

        this.fSelected = app.getSelectedFigure(
            ev
        );

        if ( this.fCtrlPoint ) {
            return this.fCtrlPoint
                .getCursor()
        }

        return this.fSelected
            ? 'move'
            : super.getCursor( ev );
    }

    protected showFeedback(
        ctx: CanvasRenderingContext2D,
        ev: MouseEvent ): void {

        if ( this.fCtrlPoint ) {
            this.moveControlPoint(
                ev
            );
        }
        else {
            if ( this.fSelected ) {
                this.moveSelected(
                    ev
                );
            }
            else {
                this.drawFeedback(
                    ctx,
                    ev
                );
            }
        }
    }

    protected drawFeedback(
        ctx: CanvasRenderingContext2D,
        ev: MouseEvent ): void {

        ctx.beginPath();
        ctx.rect(
            this.evDown.offsetX, 
            this.evDown.offsetY,
            ev.offsetX - this.evDown.offsetX, 
            ev.offsetY - this.evDown.offsetY
        );
        ctx.stroke();
    }

    protected processMouseUp(): void {
        
        if ( this.fSelected || this.fCtrlPoint ) {
            // moving or resizing
        }
        else {
            if ( this.equal( this.evDown, this.evUp ) ) {
                // point selection
                app.select(
                    this.evUp
                );
            }
            else {
                // bound box selection
                app.select(
                    this.evDown,
                    this.evUp
                );
            }
        }

        this.cleanUp();
    }

    protected cleanUp() {
        this.fSelected = null;
        this.fCtrlPoint = null;
    }

    protected moveSelected(
        ev: MouseEvent ): void {
            
        this.fSelected
            .move(
                ev.offsetX - this.evDown.offsetX,
                ev.offsetY - this.evDown.offsetY
            );

        this.evDown = ev;

        app.repaint();
    } 

    protected moveControlPoint(
        ev: MouseEvent ): void {
        
        this.fCtrlPoint
            .move(
                ev.offsetX - this.evDown.offsetX,
                ev.offsetY - this.evDown.offsetY,
                this.fSelected
            );

        this.evDown = ev;

        app.repaint();
    }
}