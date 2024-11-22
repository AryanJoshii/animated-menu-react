import { FC, HTMLAttributes, ReactElement } from "react";
import { MenuProps, Styles } from "../../types";
interface BurgerIconProps {
    styles?: Partial<Styles>;
    customIcon?: ReactElement;
    barClassName?: string;
    className?: HTMLAttributes<HTMLDivElement>['className'];
    onClick?: () => void;
    onIconHoverChange?: MenuProps['onIconHoverChange'];
}
declare const BurgerIcon: FC<BurgerIconProps>;
export default BurgerIcon;
