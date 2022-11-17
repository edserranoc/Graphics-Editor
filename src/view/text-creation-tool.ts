// import { BoundBox } from '../model/bound-box';
// import { CreationTool } from './creation-tool';
// import { Figure } from '../model/figure';
// import { Text } from '../model/text';

// export class TextCreationTool extends CreationTool {

//     getName(): string {
//         return 'TextCreationTool';
//     }
        
//     // non-public members ------------------------------------

//     protected showFeedback(
//         ctx: CanvasRenderingContext2D,
//         ev: MouseEvent ): void {

//         ctx.beginPath();
//         ctx.strokeRect(
//             ev.offsetX, 
//             ev.offsetY,
//             this.evDown.offsetX, 
//             this.evDown.offsetY,
//         ); 
//         ctx.stroke();
//     }
    
//     protected createFigure(): Figure {
//         return new Text(
//             new BoundBox(
//                 { 
//                     x: this.evDown.offsetX, 
//                     y: this.evDown.offsetY 
//                 },
//                 { 
//                     w: this.evUp.offsetX - this.evDown.offsetX, 
//                     h: this.evUp.offsetY - this.evDown.offsetY
//                 }
//             ),
//             { 
//                 r: 0, g: 0, b: 0, a: 255   // color ?
//             },
//         );
//     }    
// }