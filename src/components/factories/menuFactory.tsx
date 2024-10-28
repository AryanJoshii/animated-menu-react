import { FC } from "react";
import { IStyles, MenuProps } from "../../types";

export default (styles: IStyles) => {
    if (!styles) {
        throw new Error("No styles provided!");
    }

    const ARROW_DOWN = 'ArrowDown';
    const ARROW_UP = 'ArrowUp';
    const ESCAPE = 'Escape';
    const SPACE = ' ';
    const HOME = 'Home';
    const END = 'End';

    const Menu: FC<MenuProps> = (props) => {
        return (
            <>HELLO WORLD, MY NAME IS CARLO</>
        )
    }

    return Menu;
}