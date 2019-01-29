import {PieceProp} from './PieceProp';
import {PieceStorage} from './PieceStorage';

import {LEFT_SIGNS, RIGHT_SIGNS} from './Constants';

let size = 4;

let PieceArray = 
    [
    new PieceProp(1, 0, 0),
    new PieceProp(2, 1, 0),
    new PieceProp(3, 2, 0),
    new PieceProp(4, 3, 0),

    new PieceProp(5, 0, 1),
    new PieceProp(6, 1, 1),
    new PieceProp(7, 2, 1),
    new PieceProp(8, 3, 1),

    new PieceProp(9, 0, 2),
    new PieceProp(10, 1, 2),
    new PieceProp(11, 2, 3),
    new PieceProp(12, 3, 2),

    new PieceProp(13, 0, 3),
    new PieceProp(14, 1, 3),
    new PieceProp(15, 3, 3)
];

let actualPiece = 1;

let pieceStorage = new PieceStorage(actualPiece, PieceArray);

let observer = null;

let direction = Object.freeze(
    {
        "UNDEFINED":0,
        "TOP"   :1,
        "BOTTOM":2,
        "LEFT"  :3,
        "RIGHT" :4
    }
);

export function observe(o)
{
    if(observer)
    {
        throw new Error('Multiple observers not implemented');
    }

    observer = o;
    emitChange();
}

export function emitChange()
{
    observer(pieceStorage);
}

export function startPositions(){
    PieceArray = [];
    for(let i=0; i<15; i++){
        let x = i%size;
        let y = Math.floor( i/size );

        let pieceProp = new PieceProp(i + 1, x, y);
        if(i>-1)
        PieceArray.push(pieceProp);
    }
    return PieceArray;
}

export function startDefaultStorage(){
    startPositions();
    pieceStorage = new PieceStorage(-1, PieceArray);
    return pieceStorage;
}

export function canMove()
{
    return (getCurrentCol().length<size) ||
           (getCurrentRow().length<size);
}

export function move()
{
    let direction = getDirection();
}

export function getDirection()
{
    if(!canMove())
    {
        console.log("UNDEFINED")
        return direction.UNDEFINED;
    }

    let col = getCurrentCol();
    let row = getCurrentRow();

    if(col.length < row.length){
        console.log("vertical");
        return getVerticalDirection();
    }
    console.log("horizontal");
    return getHorizontalDirection();

}

function getHorizontalDirection()
{
    let row = getCurrentRow();
    console.log("row")
    console.log(row);
    let p = getCurrentPiece();
    
    let spaces = [0,0,0,0]; //firma

    for(let i = 0; i < row.length; i++)
    {
        spaces[ row[i].x ] = 1;

        if(row[i].x === p.x)
          spaces[row[i].x] = 2;
    }

    console.log(spaces);
    console.log(spaces === [2,1,1,0]); //no se puede comparar arrays directamente
    let control = 0;
    for(let i = 0; i < LEFT_SIGNS.length; i++)
    {
        let ls = LEFT_SIGNS[i];

        for(let j=0; j<ls.length; j++)
        {
            if(spaces[j]===ls[j])
            {
                control++;
            }

            if(control===size)
            {
                console.log("LEFT");
                return direction.LEFT;
            }
        }
        control = 0;

    }

    for(let i = 0; i < RIGHT_SIGNS.length; i++)
    {
        let rs = RIGHT_SIGNS[i];

        for(let j = 0; j<size; j++)
        {
            if(spaces[j] === rs[j])
            {
                control++;
            }
            if(control === size)
            {
                console.log("RIGHT");
                return direction.RIGHT;
            }
        }
    }

    return direction.UNDEFINED;

}

function getVerticalDirection()
{
    let col = getCurrentCol();

    let p = getCurrentPiece();
    
    let spaces = [0,0,0,0];

    for(let i = 0; i < col.length; i++)
    {
        spaces[ col[i].y ] = 1;

        if(col[i].y === p.y)
        spaces[col[i].y] = 2;
    }

    let control = 0;

    for(let i = 0; i < LEFT_SIGNS.length; i++)
    {
        let ls = LEFT_SIGNS[i];

        for(let j=0; j<ls.length; j++)
        {
            if(spaces[j]===ls[j])
            {
                control++;
            }

            if(control===size)
            {
                console.log("TOP");
                return direction.TOP;
            }
        }
        control = 0;

    }

    for(let i = 0; i < RIGHT_SIGNS.length; i++)
    {
        let rs = RIGHT_SIGNS[i];

        for(let j = 0; j<size; j++)
        {
            if(spaces[j] === rs[j])
            {
                control++;
            }
            if(control === size)
            {
                console.log("BOTTOM");
                return direction.BOTTOM;
            }
        }
    }

    return direction.UNDEFINED;
}

export function getStorage()
{
    return pieceStorage;
}

export function getCurrentPiece(){

    for(let i = 0; i < pieceStorage.PieceArray.length; i++)
    {
        let p = pieceStorage.PieceArray[i];

        if(p.id === getActual().id)
        {
            return p;
        }
    }
}

export function setActual(id)
{
    actualPiece = id;
    pieceStorage.actualPiece = id;
}

export function getActual()
{
    return pieceStorage.actualPiece;
}

function getCurrentRow()
{
    let p = getCurrentPiece();

    let arr = pieceStorage.PieceArray;
    let row = [];

    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i].y === p.y)
        {
            row.push(arr[i]);
        }
    }

    return row;
}

function getCurrentCol()
{
    let p = getCurrentPiece();
    let arr = pieceStorage.PieceArray;
    let col = [];

    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i].x === p.x)
        {
            col.push(arr[i]);
        }
    }

    return col;
}