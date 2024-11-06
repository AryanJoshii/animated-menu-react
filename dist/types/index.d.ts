import { CSSProperties, ReactElement } from "react";
export interface State {
    isOpen: boolean;
}
export interface HoverState {
    isMouseIn: boolean;
}
export interface Styles {
    bmBurgerButton: Partial<CSSProperties>;
    bmBurgerBars: Partial<CSSProperties>;
    bmBurgerBarsHover: Partial<CSSProperties>;
    bmCrossButton: Partial<CSSProperties>;
    bmCross: Partial<CSSProperties>;
    bmMenuWrap: Partial<CSSProperties>;
    bmMenu: Partial<CSSProperties>;
    bmMorphShape: Partial<CSSProperties>;
    bmIcon: Partial<CSSProperties>;
    bmItemList: Partial<CSSProperties>;
    bmItem: Partial<CSSProperties>;
    bmOverlay: Partial<CSSProperties>;
}
export interface AnimationStyles {
    overlay?: (isOpen?: boolean, width?: string, right?: boolean) => CSSProperties;
    menuWrap?: (isOpen?: boolean, width?: string, right?: boolean) => CSSProperties;
    pageWrap?: (isOpen?: boolean, width?: string, right?: boolean) => CSSProperties;
    menu?: () => CSSProperties;
    itemList?: () => CSSProperties;
    item?: (isOpen?: boolean, width?: string, right?: boolean, nthChild?: number) => CSSProperties;
    outerContainer?: (isOpen?: boolean) => CSSProperties;
    burgerIcon?: (isOpen?: boolean, width?: string, right?: boolean) => CSSProperties;
    morphShape?: (isOpen?: boolean, width?: string, right?: boolean) => CSSProperties;
    closeButton?: (isOpen?: boolean, width?: string, right?: boolean) => CSSProperties;
    svg?: {
        pathInitial?: string;
        pathOpen?: string;
        animate?: () => void;
    };
}
export interface MenuProps {
    bodyClassName?: string | undefined;
    burgerBarClassName?: string | undefined;
    burgerButtonClassName?: string | undefined;
    children?: React.ReactNode;
    className?: string | undefined;
    crossButtonClassName?: string | undefined;
    crossClassName?: string | undefined;
    customBurgerIcon?: ReactElement | false | undefined;
    customCrossIcon?: ReactElement | false | undefined;
    customOnKeyDown?: ((event: KeyboardEvent) => void) | undefined;
    disableAutoFocus?: boolean | undefined;
    disableCloseOnEsc?: boolean | undefined;
    disableOverlayClick?: boolean | (() => boolean) | undefined;
    htmlClassName?: string | undefined;
    id?: string | undefined;
    open?: boolean | undefined;
    itemClassName?: string | undefined;
    itemListClassName?: string | undefined;
    itemListElement?: "div" | "nav" | undefined;
    menuClassName?: string | undefined;
    morphShapeClassName?: string | undefined;
    noOverlay?: boolean | undefined;
    noTransition?: boolean | undefined;
    onClose?: (() => void) | undefined;
    onIconHoverChange?: ((state: HoverState) => void) | undefined;
    onOpen?: (() => void) | undefined;
    onStateChange?: ((state: State) => void) | undefined;
    outerContainerId?: string | undefined;
    overlayClassName?: string | undefined;
    pageWrapId?: string | undefined;
    right?: boolean | undefined;
    styles?: Partial<Styles> | undefined;
    width?: number | string | undefined;
}
export interface ToggleOptions {
    isOpen?: boolean;
    noStateChange?: boolean;
    focusOnLastItem?: boolean;
}
