import React from 'react';
import ReactDOM from 'react-dom';

import { observe, startDefaultStorage, getStorage, setActual } from './Game';

import {PuzzleProvider} from './PuzzleContext';
import Consumer from './Consumer';
const root = document.getElementById('root');

export default function run()
{
    //startDefaultStorage();
    setActual(1);
    
    observe(pieceStorage => 
    {
        ReactDOM.render(
            <PuzzleProvider value={{pieceStorage:pieceStorage}}>
            
            <Consumer />

            </PuzzleProvider>
            ,
            root);
    }
    );
        
    

    
}