import { ApiService } from '../api/api-service';
import { BoundBox } from '../model/bound-box';
import { ControlPoint } from '../model/control-point';
import { Drawing } from '../model/drawing';
import { Figure } from '../model/figure';
import { MainWindow } from '../view/main-window';

// Singleton => Immutable
export class App {
    private static instance: App;

    private drawing: Drawing;
    private mainWindow: MainWindow;
    private title: string;
    private documentName: string;
    
    private constructor() {
        this.drawing = new Drawing();
        this.mainWindow = new MainWindow();

        this.title = document.title = 'Graphics Editor v0.14';
    }

    // lazy initialization (preferred)
    static getInstance(): App {
        if ( App.instance ) {
            // NOOP
        }
        else {
            App.instance = new App();
        }

        return App.instance;
    }

    run(): void {
        this.mainWindow
            .init();

        this.repaint();
    }

    // from model to view 
    repaint(): void {
        this.mainWindow
            .repaint();
    }

    // from view to model
    paint(
        ctx: CanvasRenderingContext2D ): void {

        this.drawing
            .paint(
                ctx
            );
    }

    select( 
        evDown: MouseEvent,
        evUp?: MouseEvent ): void {
            
        this.drawing
            .select(
                evDown,
                evUp
            );
    }
            
    addFigure(
        f: Figure ): void {
    
        this.drawing
            .addFigure(
                f                
            );
    }

    setActiveTool( 
        t: number ) {

        this.mainWindow
            .setActiveTool(
                t
            );
    }

    setToolTitle(
        title: string ) {

        document.title = this.title
            + ' - ' 
            + title;
    }

    getGraphicsContext(): CanvasRenderingContext2D {
        return this.mainWindow
            .getContext();
    }
    
    getFeedbackContext(): CanvasRenderingContext2D {
        return this.mainWindow
            .getFeedback();
    }

    clearFeedbackContext(): void {
        this.mainWindow
            .clearFeedback();
    }

    // NEW
    setCursor(
        cursor: string ): void {

        this.mainWindow
            .setCursor(
                cursor
            );
    }

    getControlPoint(
        ev: MouseEvent ): ControlPoint {
        
        return this.drawing
            .getControlPoint(
                ev
            );
    }

    getSelectedFigure(
        ev: MouseEvent ): Figure {
        
        return this.drawing
            .getSelectedFigure(
                ev
            );
    }

    clear(): void {
        this.drawing
            .clear();
    }

    // NEW ------------------------------------------------------------------
    static readonly _MY_ID_: string = '0000000000'; // cada uno debe colocar su cedula 

    testBackEnd(): void {
        this.testServlet();
    }


    group() :void {
        this.drawing
            .group()
        this.repaint();
    }

    unGroup() :void {
        this.drawing
            .unGroup()
        this.repaint();
    }

    save(): void {
        this.drawing
            .save(
                App._MY_ID_,
                this.documentName = prompt("Ingrese el nombre del archivo")
                
                //'TEST'           // TODO #55: let the user specify this name  
            )
            .then( (r: boolean) => {
                if ( r ) {
                    // OK
                }
                else {
                    console.error(
                        'App::save() => FAILED'
                    );
                }
            });
            /*console.log(this.documentName);
            console.log(typeof(this.documentName));*/

    }

    list(): void {
        this.drawing
            .list(
                App._MY_ID_
            )
            .then( (fnames: string[]) => {
                if ( fnames ) {
                    console.log(fnames)
                    console.log(typeof(fnames))
                    const list: HTMLElement = document.getElementById(
                        'list'
                    );

                    /*for (const val of fnames)
                    {
                        let option = document.createElement("x-menuitem");
                        option.value = val;
                        option.text = val.charAt(0).toUpperCase() + val.slice(1);
                        select.appendChild(option);
                    }*/
                    // TODO: do something with the file names ...
                }
                else {
                    console.error(
                        'Drawing::list() => FAILED'
                    );
                }
            });
    }

    open(): void {
        // 1. list file names
        // 2. let the user choose one

        // 3. use name chosen
        this.drawing
            .open(
                App._MY_ID_,
                'TEST'          // TODO: let the user choose which one
            )
            .then( (r: boolean) => {
                if ( r ) this.repaint();
            });
    }

    // NEW
    deselectAll() {
        this.drawing
            .deselectAll();

        this.repaint();
    }

    selectAll() {
        this.drawing
            .selectAll();

        this.repaint();
    }


    

    // private members ------------------------------------------------------
    
    protected testServlet(): void {
        const api: ApiService = ApiService.getInstance();

        api.get(
        )
        .then( (read: string) => {
            alert(
                `App::test(): GET => ${read}`
            );
        })
        .catch( (error) => {
            alert(
                `App::test(): ERROR => ${error.message}`
            );
        });
    }
}
