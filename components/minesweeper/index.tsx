import React from "react";
import MineRow from "components/minerow";
import {useState} from "react";
import styles from "./index.module.css";

interface PropsInterface {
    width: number;
    height: number;
}


const Minesweeper = (props: PropsInterface): JSX.Element => {
    const { width,height } = props;
    const components: JSX.Element[] = [];
    for (let index = 0; index < height; index++) {
        components.push(<MineRow rowIndex={index} count={width}/>)
    }
    return (
        <div className={styles.minesweeper}>
            {components}
        </div>
    );
};

export default Minesweeper;
