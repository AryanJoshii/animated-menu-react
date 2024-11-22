import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cloneElement, useState } from "react";
const buttonStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    border: 'none',
    fontSize: 0,
    background: 'transparent',
    cursor: 'pointer'
};
const BurgerIcon = (props) => {
    const [hover, setHover] = useState(false);
    const getLineStyle = (index) => {
        return {
            position: 'absolute',
            height: '20%',
            left: 0,
            right: 0,
            top: 20 * (index * 2) + '%',
            opacity: hover ? 0.6 : 1,
            ...(hover && props.styles && props.styles.bmBurgerBarsHover)
        };
    };
    const Icon = () => {
        if (props.customIcon) {
            const extraProps = {
                className: `bm-icon ${props.customIcon.props.className || ''}`.trim(),
                style: {
                    ...{ width: '100%', height: '100%' },
                    ...(props.styles && props.styles.bmIcon)
                }
            };
            return cloneElement(props.customIcon, extraProps);
        }
        else {
            return (_jsx("span", { children: [1, 2, 3].map(bar => (_jsx("span", { className: `bm-burger-bars ${props.barClassName} ${hover ? 'bm-burger-bars-hover' : ''}`.trim(), style: {
                        ...getLineStyle(bar),
                        ...(props.styles && props.styles.bmBurgerBars)
                    } }, bar))) }));
        }
    };
    return (_jsxs("div", { className: `bm-burger-button ${props.className}`.trim(), style: {
            ...{ zIndex: 1000 },
            ...(props.styles?.bmBurgerButton)
        }, children: [_jsx("button", { type: "button", id: "react-burger-menu-btn", onClick: props.onClick, onMouseOver: () => {
                    setHover(true);
                    if (props.onIconHoverChange) {
                        props.onIconHoverChange({ isMouseIn: true });
                    }
                }, onMouseOut: () => {
                    setHover(false);
                    if (props.onIconHoverChange) {
                        props.onIconHoverChange({ isMouseIn: false });
                    }
                }, style: buttonStyle, children: "Open Menu" }), _jsx(Icon, {})] }));
};
export default BurgerIcon;
