import MineGrid from "components/minegrid";
import { MinesweeperWrapper } from "components/minesweeper-wrapper";
export default function Home(){
    return (<div>
        <h1>Minesweeper!</h1>
        <MinesweeperWrapper width={6} height={5}/>
    </div>);
}