import React from "react";
import MineGrid from "components/minegrid";
interface PropsInterface {
    rowIndex: number;
    count: number;
    clickHandler?: () => any;
}

const MineRow = (props: PropsInterface): JSX.Element => {
    const {rowIndex: index, count, clickHandler } = props;
    const components: JSX.Element[] = [];

    {
        for (let columnIndex = 0; columnIndex < count; columnIndex++) {
            components.push(<MineGrid rowIndex={index} columnIndex={columnIndex} clickHandler={clickHandler}/>);
        }
    }
    return (
        <div style={{display: "block"}}>
            {components}
        </div>
    );
};

export default MineRow;
