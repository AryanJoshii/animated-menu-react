import { FC, HTMLAttributes, ReactElement } from "react";
import { Styles } from "../../types";
interface CrossIconProps {
    styles?: Partial<Styles>;
    onClick?: () => void;
    customIcon?: ReactElement;
    className?: HTMLAttributes<HTMLDivElement>['className'];
    crossClassName?: string;
    isOpen?: boolean;
}
declare const CrossIcon: FC<CrossIconProps>;
export default CrossIcon;
