import React from 'react';

import Piece from './Piece';

export default function Board(pieceStorage){
    const spaces = [];

        spaces.push(renderPieces(pieceStorage))
    
    return(
        <div style={{
            width:'10cm',
            height:'10cm'
        }}>
        <div style={{
            width:"100%",
            height:"100%",
            position:"relative"
        }}>
        {spaces}
        </div>
        </div>
    );
}

function renderPieces(pieceStorage)
{
    let arr = pieceStorage.PieceArray;
    let pieces =[];
    console.log(arr);
    for(let i=0; i<arr.length; i++)
    {
        let id = arr[i].id;
        pieces.push(Piece(id));
    }
    return pieces;
}