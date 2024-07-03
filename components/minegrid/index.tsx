import React from "react";
import Image from "next/image";
import {useState} from "react";
import { UseMinesweeperContext } from "components/minesweeper-wrapper";
import tile0 from "/public/assets/tile0.png";
import tile1 from "/public/assets/tile1.png";
import tile2 from "/public/assets/tile2.png";
import tile3 from "/public/assets/tile3.png";
import tile4 from "/public/assets/tile4.png";
import tile5 from "/public/assets/tile5.png";
import tile6 from "/public/assets/tile6.png";
import tile7 from "/public/assets/tile7.png";
import tile8 from "/public/assets/tile8.png";
import tile9 from "/public/assets/tile9.png";
import tile10 from "/public/assets/tile10.png";
import tile11 from "/public/assets/tile11.png";

import styles from "./index.module.css";

interface PropsInterface {
    rowIndex: number;
    columnIndex: number;
}


let imageDict:{[key: number]: any}=
{
    0: tile0,
    1: tile1,
    2: tile2,
    3: tile3,
    4: tile4,
    5: tile5,
    6: tile6,
    7: tile7,
    8: tile8,
    9: tile9,
    10: tile10,
    11: tile11,
};

const MineGrid = (props: PropsInterface): JSX.Element => {
    const { rowIndex, columnIndex} = props;
    
    let minesweeperContext = UseMinesweeperContext();
    let [localTile, setTile] = useState(9);
    let tileClicked = minesweeperContext.tileClicked;
    minesweeperContext.setTiles[rowIndex][columnIndex] = setTile;
    let currentTileClicked = ()=>{
        if (tileClicked)
            tileClicked(rowIndex, columnIndex);
    }
    return (
        <div className={styles.container} onClick={currentTileClicked}>
            <Image
                src={imageDict[localTile]}
                alt="Descriptive text for screen readers"
                layout="responsive"
                width={30}
                height={30}
            />
        </div>
    );
};

export default MineGrid;
