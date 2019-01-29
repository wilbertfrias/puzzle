import React from "react";

const PuzzleContext = React.createContext();

export const PuzzleProvider = PuzzleContext.Provider;
export const PuzzleConsumer = PuzzleContext.Consumer;