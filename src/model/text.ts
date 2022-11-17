import { BoundBox } from './bound-box';
import { Color, ColorHelper } from '../util/color-helper';
import { Figure } from './figure';

export class Text extends Figure {

    static readonly className: string = 'Text';

    constructor(
        bbox: BoundBox,
        color: Color,
        protected userText: string,
        protected userSizeText: string,
        protected userTextSerif?: string) {

        super(
            bbox,
            color
        );
    }

    get name(): string {
        return Text.className;
    }
        
    protected doPaint( ctx: CanvasRenderingContext2D ): void {

        ctx.strokeStyle = ColorHelper.colorAsString(
            this.color
        );

        // ctx.font = `${this.userSizeText} ${this.userTextSerif ? this.userTextSerif : "serif"}`;
        // ctx.font = this.userSizeText + ' serif';
        ctx.font = '48px serif';
        /*ctx.textBaseline = "hanging";*/
        ctx.strokeText(this.userText, 10, 50);
        // ctx.fillText(this.userText, 10, 50);
        // ctx.strokeText('Hello world', 10, 50);

    }
}