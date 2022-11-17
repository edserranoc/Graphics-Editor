import app from '../index';

import { 
    LINE_CREATION,
    RECT_CREATION,
    ELLI_CREATION,
    TEXT_CREATION,
    HEXA_CREATION,
    SELECTION,
} from './main-window';

export class MenuHelper {

    init(): void {
        // FILE
        const clear: HTMLElement = document.getElementById(
            'new'
        );
        if ( clear ) clear.addEventListener( 
            'click', 
            () => app.clear()
        );

        const open: HTMLElement = document.getElementById(
            'open'
        );
        if ( open ) open.addEventListener( 
            'click', 
            () => app.open()
        );

        const save: HTMLElement = document.getElementById(
            'save'
        );
        if ( save ) save.addEventListener( 
            'click', 
            () => app.save()
        );

        // TOOL
        const line: HTMLElement = document.getElementById(
            'line'
        );
        if ( line ) line.addEventListener( 
            'click', 
            () => app.setActiveTool( LINE_CREATION )
        );

        const rect: HTMLElement = document.getElementById(
            'rect'
        );
        if ( rect ) rect.addEventListener( 
            'click', 
            () => app.setActiveTool( RECT_CREATION )
        );

        const elli: HTMLElement = document.getElementById(
            'elli'
        );
        if ( elli ) elli.addEventListener( 
            'click', 
            () => app.setActiveTool( ELLI_CREATION )
        );

        const hexa: HTMLElement = document.getElementById(
            'hexa'
        );
        if ( hexa ) hexa.addEventListener( 
            'click', 
            () => app.setActiveTool( HEXA_CREATION )
        );

        const text: HTMLElement = document.getElementById(
            'text'
        );
        if ( text ) text.addEventListener( 
            'click', 
            () => app.setActiveTool( TEXT_CREATION )
        );

        const sele: HTMLElement = document.getElementById(
            'sele'
        );
        if ( sele ) sele.addEventListener( 
            'click', 
            () => app.setActiveTool( SELECTION )
        );

        // NEW
        const test: HTMLElement = document.getElementById(
            'test'
        );
        if ( test ) test.addEventListener( 
            'click', 
            () => app.testBackEnd()
        );

        const list: HTMLElement = document.getElementById(
            'list'
        );
        if ( list ) list.addEventListener( 
            'click', 
            () => app.list()
        );

        // ----------------------------------------------------------------
        const group: HTMLElement = document.getElementById(
            'group'
        );
        if ( group ) list.addEventListener( 
            'click', 
            () => app.group()
        );

        const unGroup: HTMLElement = document.getElementById(
            'ungroup'
        );
        if ( unGroup ) list.addEventListener( 
            'click', 
            () => app.unGroup()
        );

    }
}

/*

composite
observer 
COMMAND
Dolientes (canvas, menu helper)
*/ 