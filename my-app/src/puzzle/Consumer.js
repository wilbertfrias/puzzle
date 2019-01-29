import React from 'react';
import Board from './Board';
import { PuzzleConsumer } from './PuzzleContext';

class Consumer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={};
    }

    render(){
        return(
            <PuzzleConsumer>
                {
                    ({pieceStorage})=>
                    (Board(pieceStorage))
                }
            </PuzzleConsumer>
        );
    }
}

export default Consumer;