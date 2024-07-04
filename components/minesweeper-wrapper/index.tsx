import React, { useContext, useState } from "react";

import Minesweeper from "components/minesweeper";
import { createContext } from "react";
import { ZCOOL_KuaiLe } from "next/font/google";

interface PropsInterface {
    width: number;
    height: number;
}

type Callback = ((newTile: number)=>void) | null;
interface ContextInterface
{
    tiles: number[][]; // the view tile status (hidden, flagged, empty, 1-8, bomb)
    setTiles: Callback[][];
    tileClicked: (rowIndex: number, columnIndex: number) => void;
}

const dummyTileClicked = (rowIndex: number, columnIndex: number)=>{alert('Dummy triggered')};

const MinesweeperContext = createContext<ContextInterface>({tiles: [], setTiles: [], tileClicked: dummyTileClicked});

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

const tupleToString = (tuple: [number, number]): string => JSON.stringify(tuple);
const stringToTuple = (str: string): [number, number] => JSON.parse(str);
export const MinesweeperWrapper = (props: PropsInterface): JSX.Element => {
    const { width,height } = props;
    const tiles: number[][] = [];
    const setTiles: Callback[][] = [];
    for (let i = 0; i < height; i++) {
        let row: number[] = [];
        let setRow: Callback[] = [];
        for (let j = 0; j < width; j++) {
            row.push(9);
            setRow.push(null);
        }
        tiles.push(row);
        setTiles.push(setRow);
    }
    let bombs = new Set<string>();
    let numBombs: number = Math.floor(width * height / 10);
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
        tiles[rowIndex][columnIndex] = newTile;
        let setTile = setTiles[rowIndex][columnIndex];
        if (setTile){
            setTile(newTile); 
        }
    }
    let inBound = (rowIndex: number, columnIndex: number): boolean=>{
        return rowIndex >= 0 && rowIndex < height && columnIndex >= 0 && columnIndex < width;
    }
    let isBomb = (rowIndex: number, columnIndex: number) =>{
        if (!inBound(rowIndex, columnIndex)){
            return 0;
        }
        let tupleStr = tupleToString([rowIndex, columnIndex]);
        if (bombs.has(tupleStr)){
            return 1;
        }
        return 0;
    }
    // guaranteed to be within grid
    let calculateNum = (rowIndex: number, columnIndex: number): number=>{
        if (rowIndex < 0 || rowIndex >= height || columnIndex < 0 || columnIndex >= width){
            return -1;
        }
        let num: number = 0;

        [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(
            ([rowOffset, columnOffset])=>{
                num += isBomb(rowIndex + rowOffset, columnIndex + columnOffset);
            }
        )
        return num;
    }

    let exposeAllBombs = () =>{
        bombs.forEach((str)=>{
            let [rowIdx, columnIdx] = stringToTuple(str);
            changeTile(rowIdx, columnIdx, 11);
        });
    }
    let calculateAndExpose = (rowIndex: number, columnIndex: number)=>{
        if (!inBound(rowIndex, columnIndex)){
            return;
        }
        let tile = tiles[rowIndex][columnIndex];
        if (exposed(tile)){
            return;
        }
        if (isBomb(rowIndex, columnIndex)){
            exposeAllBombs();
            return;
        }
        let num: number = calculateNum(rowIndex, columnIndex);
        changeTile(rowIndex, columnIndex, num);
        if (num == 0){
            exposeSurrounding(rowIndex, columnIndex);
        }
    }
    let exposed = (tile: number): boolean =>{
        return tile <=8 || tile == 11;
    }
    let exposeSurrounding = (rowIndex: number, columnIndex: number) =>{
        [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(
            ([rowOffset, columnOffset])=>{
                let newRowIndex = rowIndex + rowOffset;
                let newColumnIndex = columnIndex + columnOffset;
                calculateAndExpose(newRowIndex, newColumnIndex);
            }
        )
    }

    let tileClicked = (rowIndex: number, columnIndex: number) =>{
        console.log(bombs);
        calculateAndExpose(rowIndex, columnIndex);
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
