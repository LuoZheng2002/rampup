import React, { useContext, useState } from "react";

import Minesweeper from "components/minesweeper";
import { createContext } from "react";
import { ZCOOL_KuaiLe } from "next/font/google";

interface PropsInterface {
    width: number;
    height: number;
}

type SetTiles2DType = (React.Dispatch<React.SetStateAction<number>>|null)[][];

interface ContextInterface
{
    tiles: number[][]; // the view tile status (hidden, flagged, empty, 1-8, bomb)
    setTiles: SetTiles2DType;//
    tileClicked: ((rowIndex: number, columnIndex: number) => void) | null;
}

const MinesweeperContext = createContext<ContextInterface>({tiles: [], setTiles: [], tileClicked: null});

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

const tupleToString = (tuple: [number, number]): string => JSON.stringify(tuple);
const stringToTuple = (str: string): [number, number] => JSON.parse(str);
export const MinesweeperWrapper = (props: PropsInterface): JSX.Element => {
    const { width,height } = props;
    let tiles: number[][] = [];
    let setTiles: SetTiles2DType= [];
    for (let i = 0; i < height; i++) {
        let row: number[] = [];
        let setRow: (React.Dispatch<React.SetStateAction<number>> | null)[] = [];
        for (let j = 0; j < width; j++) {
            row.push(9);
            setRow.push(null);
        }
        tiles.push(row);
        setTiles.push(setRow);
    }
    let bombs = new Set<string>();
    let numBombs: number = getRandomInt(width * height / 4);
    console.log(numBombs);
    for (let index = 0; index < numBombs; index++) {
        let randomRow = 0;
        let randomColumn = 0;
        do{
            randomRow = getRandomInt(height);
            randomColumn = getRandomInt(width);
        }
        while(bombs.has(tupleToString([randomRow, randomColumn])));
        bombs.add(tupleToString([randomRow, randomColumn]));
    }

    let changeTile = (rowIndex: number, columnIndex: number, newTile: number) =>{
        let setTile = setTiles[rowIndex][columnIndex];
        if (setTile){
            setTile(newTile);
            tiles[rowIndex][columnIndex] = newTile;
        }
        else
        {
            alert("setTile not set");
        }
    }

    let tileClicked = (rowIndex: number, columnIndex: number) =>{
        console.log(bombs);
        let newTile = 0;
        let tile = tiles[rowIndex][columnIndex];
        if (bombs.has(tupleToString([rowIndex, columnIndex])))
        {
            bombs.forEach((str)=>{
                let [rowIdx, columnIdx] = stringToTuple(str);
                changeTile(rowIdx, columnIdx, 11);
            });
        }
        else
        {
            changeTile(rowIndex, columnIndex, 0);
        }
    };
    
    return (
        <MinesweeperContext.Provider value={{tiles, setTiles, tileClicked}}>
            <Minesweeper width={width} height={height}/>
        </MinesweeperContext.Provider>
    );
};


export function UseMinesweeperContext(){
    return useContext(MinesweeperContext);
}
