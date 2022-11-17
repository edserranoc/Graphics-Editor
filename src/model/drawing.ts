import app from '../index';
import {ApiService } from '../api/api-service';
import {BoundBox} from './bound-box';
import {ControlPoint} from './control-point';
import {Figure} from './figure';
import {Line} from './line';

export class Drawing {

    private figures: Figure[] = [];
    private modified = false;
    private name: string | null = null;

    constructor() {
    }

    // polymorphism in action
    paint(
        ctx: CanvasRenderingContext2D): void {

        this.figures.forEach(
            (f: Figure) => f.paint(ctx)
        );
    }

    // TODO: delete this
    addTestFigures(): void {
        const redLine: Line = new Line(
            new BoundBox({ x: 100, y: 100 }, { w: 400, h: 100 }),   // NEW
            { r: 255, g: 0, b: 0, a: 255 }, 16, [5, 15]
        );
        this.figures
            .push(
                redLine
            );

        const greenLine: Line = new Line(
            new BoundBox({ x: 100, y: 100 }, { w: 400, h: 200 }),   // NEW
            { r: 0, g: 255, b: 0, a: 255 }, 16, [5, 15]
        );
        this.figures
            .push(
                greenLine
            );

        const blackLine: Line = new Line(
            new BoundBox({ x: 100, y: 100 }, { w: 400, h: 300 }),   // NEW
            { r: 0, g: 0, b: 0, a: 255 }, 16, [5, 15]
        );
        this.figures
            .push(
                blackLine
            );
    }

    selectAll(): void {
        this.figures.forEach(
            (f: Figure) => f.selected = true
        );
    }

    // NEW
    deselectAll() {
        this.figures.forEach(
            (f: Figure) => f.selected = false
        );
    }

    select(
        evDown: MouseEvent,
        evUp?: MouseEvent): void {

        for (let i = this.figures.length - 1; i >= 0; i--) {
            const f: Figure = this.figures[
                i
            ];

            f.select(
                evDown,
                evUp
            );

            if (f.selected) {
                break;
            }
        }

        // TODO: something selected?
        app.repaint();
    }

    addFigure(
        f: Figure): void {

        this.figures
            .push(
                f
            );

        app.repaint();
    }

    getControlPoint(
        ev: MouseEvent): ControlPoint {

        let cp: ControlPoint;

        for (let i = this.figures.length - 1; i >= 0; i--) {
            const f: Figure = this.figures[
                i
            ];

            if (f.selected) {
                cp = f.getControlPoint(
                    ev
                );

                if (cp) {
                    break;
                }
            }
        }

        return cp;
    }

    getSelectedFigure(
        ev: MouseEvent): Figure {

        for (let i = this.figures.length - 1; i >= 0; i--) {
            const f: Figure = this.figures[
                i
            ];

            if (f.selected && f.contains(ev)) {
                return f;
            }
        }
    }

    clear(): void {
        this.figures = [
        ];

        app.repaint();
    }

    private getFirstSelected(): Figure | null{
        for (let i = 0; i< this.figures.length; i++ ){
            if( this.figures[i].selected){
                return this.figures[i]
            }
        }
        return 
    }

    group():void{
        const first: Figure= this.getFirstSelected();
        if (first){
            for (let i = 0; i< this.figures.length; i++ ){
                if (this.figures[i] != first){
                    if( this.figures[i].selected){
                        first.addChild
                    }
                }
                return null
            }
        }
    }

    // NEW ------------------------------------------------------------------

    async save(
        account: string,
        fname: string): Promise<boolean> {

        const api: ApiService = ApiService.getInstance();

        const result: { value: string, error: string } = await api.store(
            account,
            fname,
            this.figures
        );

        if (result.error) {
            console.error(
                `Drawing::save(): ERROR => ${result.error}`
            );

            return false;
        }

        if (result.value) {
            console.log(
                `Drawing::save(): BYTES WRITTEN => ${result.value}`
            );

            return true;
        }

        return false;
    }

    async list(
        account: string): Promise<string[]> {

        const api: ApiService = ApiService.getInstance();

        const result: { value: string, error: string } = await api.list(
            account
        );

        if (result.error) {
            console.error(
                `Drawing::list(): ERROR => ${result.error}`
            );
        }

        if (result.value) {
            const fnames: string[] = [
            ];

            const names: string[] = JSON.parse(
                result.value
            );

            names.forEach((fname: string) => {
                fnames.push(
                    fname
                );
            });

            return fnames;
        }
    }

    async open(
        account: string,
        fname: string): Promise<boolean> {

        const api: ApiService = ApiService.getInstance();

        return await api.load(
            account,
            fname
        )
            .then((figures: Figure[]) => {
                this.figures = figures;

                return (this.figures.length > 0);
            })
            .catch((error) => {
                alert(
                    `Drawing::open(): ERROR => ${error.message}`
                );
                return false;
            });
    }
}
