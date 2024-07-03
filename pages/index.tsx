import MineGrid from "components/minegrid";
import { MinesweeperWrapper } from "components/minesweeper-wrapper";
export default function Home(){
    return (<div>
        <h1 style={{fontSize: "50px", backgroundColor: "magenta"}}>Minesweeper!</h1>
        <MinesweeperWrapper width={20} height={18}/>
    </div>);
}