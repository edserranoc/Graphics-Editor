import { App } from '../controller/app';

import { MenuHelper } from './menu-helper';

export class MainWindow {
    
    // NEW -------------------------------------------
    private menu: MenuHelper;
    // NEW -------------------------------------------

    private canvas: DrawingCanvas;
    private feedback: FeedbackCanvas;

    constructor() {
        this.menu = new MenuHelper();
        this.canvas = new DrawingCanvas();
        this.feedback = new FeedbackCanvas();
    }

    init(): void {
        // NEW
        this.menu
            .init();

        this.canvas
            .init();
        this.feedback
            .init();
    }

    repaint(): void {
        this.canvas
            .repaint();
    }

    getContext(): CanvasRenderingContext2D {
        return this.canvas
            .getContext();
    }

    getFeedback(): CanvasRenderingContext2D {
        return this.feedback
            .getContext();
    }

    clearFeedback(): void {
        this.feedback
            .clear();
    }

    setCursor(
        cursor: string ): void {
            
        this.feedback
            .setCursor(
                cursor
            );
    }
            
    // NEW
    setActiveTool( 
        t: number ) {

        this.feedback
            .setActiveTool(
                t
            );
    }
}

// module private -----------------------------------------------------------

abstract class Canvas {

    abstract init(): void;

    protected htmlElement: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D | null;

    static readonly PAGE_WIDTH: number = 2000;
    static readonly PAGE_HEIGHT: number = 2000;

    constructor() {
        this.htmlElement = document.createElement(
            'canvas'
        );
        this.htmlElement.width = Canvas.PAGE_WIDTH;
        this.htmlElement.height = Canvas.PAGE_HEIGHT;

        this.htmlElement.style.position = 'absolute';
        this.htmlElement.style.left   = '0';
        this.htmlElement.style.top    = '28px';
        this.htmlElement.style.width  = `${Canvas.PAGE_WIDTH}px`;
        this.htmlElement.style.height = `${Canvas.PAGE_HEIGHT}px`;

        const content: HTMLElement = document.getElementById(
            'content'
        );
        content.style.position = 'fixed'; 
        content.style.left = '0'; 
        content.style.top = '0'; 
        content.style.width = `${Canvas.PAGE_WIDTH}px`;
        content.style.height = `${Canvas.PAGE_HEIGHT}px`;

        content.appendChild( 
            this.htmlElement 
        );

        this.ctx = this.htmlElement
            .getContext(
                '2d'
            );
    }

    getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }
    
    get width(): number {
        return this.htmlElement.width;
    }
    
    get height(): number {
        return this.htmlElement.height;
    }
}

class DrawingCanvas extends Canvas {

    static readonly GRID_SIZE: number = 100;
    static readonly GRID_COLOR: string = '#DDD0DD';

    constructor() {
        super();
    }

    init(): void {
        this.htmlElement.style.backgroundColor = '#FAFAFA';
    }

    repaint(): void {
        this.drawGrid(
            this.ctx
        );

        App.getInstance()
            .paint(
                this.ctx
            );
    }

    // private methods ------------------------------------------------------

    private clear( ctx: CanvasRenderingContext2D ): void {
        ctx.fillStyle = this.htmlElement.style.backgroundColor;
        ctx.fillRect( 0, 0, this.width, this.height );
    }

    private drawGrid(
        ctx: CanvasRenderingContext2D | null ): void {
            
        if ( ctx ) {
            this.clear(
                ctx
            );

            ctx.lineWidth = 1;
            ctx.strokeStyle = DrawingCanvas.GRID_COLOR;

            // TODO: use document size
            const numVerticals: number = this.width / DrawingCanvas.GRID_SIZE;
            const numHorizontals: number = this.height / DrawingCanvas.GRID_SIZE;

            // verticals
            for ( let v: number = 1; v < numVerticals; v++ ) {
                ctx.beginPath();
                ctx.moveTo( 
                    v * DrawingCanvas.GRID_SIZE, 
                    0 
                );
                ctx.lineTo(
                    v * DrawingCanvas.GRID_SIZE, 
                    Canvas.PAGE_HEIGHT 
                );
                ctx.stroke();
            }

            // horizontals
            for ( let h: number = 1; h < numHorizontals; h++ ) {
                ctx.beginPath();
                ctx.moveTo( 
                    0, 
                    h * DrawingCanvas.GRID_SIZE 
                );
                ctx.lineTo(
                    Canvas.PAGE_WIDTH, 
                    h * DrawingCanvas.GRID_SIZE 
                );
                ctx.stroke();
            }
        }
    }
}

import { Tool } from './tool';
import { SelectionTool } from './selection-tool';
import { LineCreationTool } from './line-creation-tool';
import { RectangleCreationTool } from './rectangle-creation-tool';
import { EllipseCreationTool } from './ellipse-creation-tool';
import { HexagonCreationTool } from './hexagon-creation-tool';
// import { TextCreationTool } from './text-creation-tool';

// NEW
export const LINE_CREATION: number = 0;
export const RECT_CREATION: number = 1;
export const ELLI_CREATION: number = 2;
export const TEXT_CREATION: number = 3;
export const SELECTION:     number = 4;
export const HEXA_CREATION: number = 5;

class FeedbackCanvas extends Canvas {

    private tools: Tool[] = [];
    private activeTool: Tool;

    constructor() {
        super();
    }

    init(): void {

        this.buildTools();
        
        // NEW
        this.setActiveTool(
            LINE_CREATION
        );

        // TODO: register for mouse events
        // down, up, move, drag, doubleclick
        // enter, exit

        window.addEventListener( 
            'mousedown', 
            this.handleMouseDown
                .bind(
                    this
                )
        );

        window.addEventListener( 
            'mouseup', 
            this.handleMouseUp
                .bind(
                    this
                )
        );

        // NEW
        window.addEventListener( 
            'mousemove', 
            this.handleMouseMove
                .bind(
                    this
                )
        );

        // NEW
        window.addEventListener( 
            'keyup', 
            this.handleKeyPressed
                .bind(
                    this
                )
        );
    }

    setActiveTool( t: number ) {
        this.activeTool = this.tools[t];
        console.log(
            `TOOL => ${t}`
        );
        // if (Object.keys(this.activeTool).length >= 2){
        //     this.activeTool = this.tools[t];
        //     console.log(
        //         `Entre a este if, el valor de t es: ${t}`
        //     );
        // }
        
        
        console.log("El valor de activeTool"+this.activeTool);
        console.log(typeof(this.activeTool));
        console.log(Object.keys(this.activeTool).length);
        // for (let i =0; i>1; i++){
        //     if(this.activeTool[i]){
            
        //     }
        
        // }
        

        App.getInstance()
            .setToolTitle(
                this.activeTool
                    .getName()
            );
    }

    clear(): void {
        const ctx: CanvasRenderingContext2D = this.getContext();

        this.ctx
            .clearRect( 
                0, 0, this.width, this.height
            );
    }

    // NEW
    setCursor(
        cursor: string ): void {

        this.htmlElement
            .style
            .cursor = cursor;
    }

    // private methods ------------------------------------------------------

    // TODO: add remaining tools
    private buildTools(): void {

        this.tools[ LINE_CREATION ] = new LineCreationTool();
        this.tools[ RECT_CREATION ] = new RectangleCreationTool();
        this.tools[ ELLI_CREATION ] = new EllipseCreationTool();
        this.tools[ HEXA_CREATION ] = new HexagonCreationTool();
        // this.tools[ TEXT_CREATION ] = new TextCreationTool();
        
        this.tools[ SELECTION ] = new SelectionTool();
    }

    // State Pattern
    private handleMouseDown(
        ev: MouseEvent ): void {

        this.activeTool
            .onMouseDown(
                ev
            );
    }

    // State Pattern
    private handleMouseUp(
        ev: MouseEvent ): void {

        this.activeTool
            .onMouseUp(
                ev
            );
    }

    private handleMouseMove(
        ev: MouseEvent ): void {

        this.activeTool
            .onMouseMove(
                ev
            );
    }

    private handleKeyPressed(
        ke: KeyboardEvent ): void {

        if ( ke.ctrlKey ) {
            ke.preventDefault();         // do not bubble
        
            if ( ke.code === 'KeyL' ) {
                this.setActiveTool(
                    LINE_CREATION    
                );
            }
            else if ( ke.code === 'KeyS' ) {
                this.setActiveTool(
                    SELECTION    
                );
            }
        }
    }
}
