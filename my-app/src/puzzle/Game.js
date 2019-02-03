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
    console.log("canMove");
    return (getCurrentCol().length<size) ||
           (getCurrentRow().length<size);
}

export function move()
{
    console.log("move");
    let toDirection = getDirection();

    let col = getCurrentCol(true);
    let row = getCurrentRow(true);

    let current = getCurrentPiece();
    let cM = false;

    let gTM = getGroupToMove(current.id, toDirection, col.length<row.length ? col : row);
    console.log(gTM);

    let fn = function(arr, axis, val)
    {
        for(let i = 0; i<arr.length; i++)
        {
            let p = arr[i];
            pieceStorage.PieceArray[ p.id - 1 ][axis] = p[axis] + val;
        }
    };

    switch(toDirection){
        
        case direction.TOP:
        fn(gTM, "y", -1);
        break;

        case direction.BOTTOM:
        fn(gTM, "y", 1);
        break;

        case direction.LEFT:
        fn(gTM, "x", -1);
        break;

        case direction.RIGHT:
        fn(gTM, "x", 1);
        break;
    }
emitChange();
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
    
    let p = getCurrentPiece();
    
    let spaces = getSign(row, p, "x");// [0,0,0,0]; //firma
    
    let control = 0;

    let left = compareSign(spaces, LEFT_SIGNS, direction.LEFT);
    
    if(left===direction.LEFT)
        return left;
    
    let right = compareSign(spaces, RIGHT_SIGNS, direction.RIGHT);

    if(right === direction.RIGHT)
        return right;

    return direction.UNDEFINED;

}

function getVerticalDirection()
{
    let col = getCurrentCol();

    let p = getCurrentPiece();
    
    let spaces = getSign(col, p, "y");

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

function getSign(arr, curr, key)
{
    let sign=[0,0,0,0];

    for(let i = 0; i < arr.length; i++)
    {
        sign[ arr[i][key] ] = 1;

        if(arr[i][key] === curr[key])
          sign[arr[i][key]] = 2;
    }

    return sign;
}

function compareSign(sign, map, msg)
{
    let control = 0;

    for(let i = 0; i < map.length; i++)
    {
        let ls = map[i];

        for(let j=0; j<ls.length; j++)
        {
            if(sign[j]===ls[j])
            {
                control++;
            }

            if(control===size)
            {
                return msg;
            }
        }
        control = 0;

    }
    return null;
}

export function getStorage()
{
    return pieceStorage;
}

export function getPieceById(id)
{
    let p = pieceStorage.PieceArray.filter(item => item.id === id);
    
    return p[0];
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

//arr debe estar ordenado
function getGroupToMove(id, dir, arr)
{
    let axis = "z";

    let group = [];

    let fnc = null;

    (dir === direction.LEFT || dir === direction.RIGHT) ? axis = "x" : axis = "y";

    (dir === direction.LEFT || dir === direction.TOP) ? 
    
        fnc = function(){
        let start = false;
        for(let i = arr.length-1; i>=0; i--){

            if(start)
            {
                if(arr[i][axis] === ( (group[group.length - 1][axis]) - 1) )
                {
                    group.push(arr[i]);
                }else{break;}
            }

            if(!start)
            if(arr[i].id === id)
            {
                group.push(arr[i]);
                start = true;
            }

        }
    }
      : fnc = function(){

        let start = false;

        for(let i = 0; i<arr.length; i++){

            if(start)
            {
                if(arr[i][axis] === ( (group[group.length - 1][axis]) + 1) )
                {
                    group.push(arr[i]);
                }else{break;}
            }

            if(!start)
            if(arr[i].id === id)
            {
                group.push(arr[i]);
                start = true;
            }

        }

      }
      ;

    fnc();

    return group;
    
}

function getCurrentRow(order = false)
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

    if(order)
    {
        //copiamos la fila
        let buffer = row;
        let buff = [];
        let min = 0;
        
        //la vaciamos
        row = [];
        while(buffer.length>0){

                console.log("filtering");

            for(let i = 0; i<buffer.length; i++)
            {
                buff.push(buffer[i].x);
            }

            min = Math.min(...buff);

            for(let i = 0; i<buffer.length; i++)
            {
                if(buffer[i].x === min){
                    row.push(buffer[i]);
                }
            }
            buff=[];
            buffer=buffer.filter(item => item.x !== min);
            
        }

    }
    console.log(row);
    return row;
}

function getCurrentCol(order = false)
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

    if(order)
    {
        //copiamos la columna
        let buffer = col;
        let buff = [];
        let min = 0;

        //la vaciamos
        col = [];
        while(buffer.length>0){
              
            for(let i = 0; i<buffer.length; i++)
            {
                buff.push(buffer[i].y);
            }

            min = Math.min(...buff);
  
            for(let i = 0; i<buffer.length; i++)
            {
                if(buffer[i].y === min){
                    col.push(buffer[i]);
                }
            }
            buff=[];
            buffer=buffer.filter(item => item.y !== min);

        }

    }

    return col;
}