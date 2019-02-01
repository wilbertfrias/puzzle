import React from 'react';

import Piece from './Piece';

export default function Board(pieceStorage){
    const spaces = [];
        //console.log(pieceStorage);
    for(let i=0; i<16; i++)
    {
        spaces.push(renderSpace(i, pieceStorage));
    }
    return(
        <div style={{
            width:'10cm',
            height:'10cm',
            display:'flex',
            flexWrap:'wrap'
        }}>
        {spaces}
        </div>
    );
}

function renderSpace(i, pStg){
    let x = i%4;
    let y = Math.floor(i/4);
    return(
        <div x={x} y={y} key = {i}
        style={{
            width:'25%',
            height:'25%',
            position:'relative',
            borderColor:'#d6d7da',
            borderWidth:'1'
        }}>
            {renderPiece(x, y, pStg)}
        </div>
    )
}

function renderPiece(x, y, pStg){

    let arr = pStg.PieceArray;

    
    for(let i = 0; i< arr.length; i++)
    {
        let p = arr[i];

        if(p.id !== 0 && p.x === x && p.y === y)
        {
            return Piece(p.id);
        }
    
    }
    
}