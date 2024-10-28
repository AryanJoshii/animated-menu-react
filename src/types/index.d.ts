export interface IStyles {
    overlay?: (isOpen?: boolean, width?: string, right?: boolean) => Record<string, string | number>;
    menuWrap?: (isOpen?: boolean, width?: string, right?: boolean) => Record<string, string | number>;
    pageWrap?: (isOpen?: boolean, width?: string, right?: boolean) => Record<string, string | number>;
    menu?: () => Record<string, string | number>;
    itemList?: () => Record<string, string | number>;
    item?: (isOpen?: boolean, width?: string, right?: boolean, nthChild?: number) => Record<string, string | number>;
    outerContainer?: (isOpen?: boolean) => Record<string, string | number>;
    burgerIcon?: (isOpen?: boolean, width?: string, right?: boolean) => Record<string, string | number>;
}
export interface MenuProps {
}
