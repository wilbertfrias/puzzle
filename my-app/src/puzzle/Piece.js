import React from 'react';

import { canMove, move, setActual, getDirection, getPieceById} from './Game';

export default function Piece(id)
{
    let _Self = getPieceById(id);
    
    let _left = String(_Self.x * 25) + "%";
    let _top  = String(_Self.y * 25) + "%";
    console.log(_left);
    return(
        <div key={id}
        onClick={
            ()=>{
                _move({id});
                
            }
        }
        style={{
            left:_left,
            top: _top,
            position:'absolute',
            width:'25%',
            height:'25%',

            transition: 'all 0.3s',

            borderRadius:'15%',
            backgroundColor:'gray',
            borderColor:'#555',
            borderWidth:2,
            textAlign:'center',
            verticalAlign:'middle'
        }}
        >
        {id}
        </div>
    );
}

function _move(id)
{
    setActual(id);
    if(canMove())
    move();
}