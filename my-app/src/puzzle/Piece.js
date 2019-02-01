import React from 'react';

import { canMove, move, setActual, getDirection} from './Game';

export default function Piece(id)
{
    
    return(
        <div key={id}
        onClick={
            ()=>_move({id})
        }
        style={{
            width:'100%',
            height:'100%',
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