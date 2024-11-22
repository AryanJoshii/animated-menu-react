import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cloneElement } from "react";
const buttonWrapperStyle = {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 8,
    top: 8
};
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
const CrossIcon = (props) => {
    const getCrossStyle = (type) => {
        return {
            position: 'absolute',
            width: 3,
            height: 14,
            transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)'
        };
    };
    const Icon = () => {
        if (props.customIcon) {
            const extraProps = {
                className: `bm-cross ${props.customIcon.props.className ||
                    ''}`.trim(),
                style: {
                    ...{ width: '100%', height: '100%' },
                    ...(props.styles && props.styles.bmCross)
                }
            };
            return cloneElement(props.customIcon, extraProps);
        }
        else {
            return (_jsx("span", { style: { position: 'absolute', top: '6px', right: '14px' }, children: ['before', 'after'].map((type, i) => (_jsx("span", { className: `bm-cross ${props.crossClassName}`.trim(), style: {
                        ...getCrossStyle(type),
                        ...(props.styles && props.styles.bmCross)
                    } }, i))) }));
        }
    };
    return (_jsxs("div", { className: `bm-cross-button ${props.className}`.trim(), style: {
            ...buttonWrapperStyle,
            ...(props.styles && props.styles.bmCrossButton)
        }, children: [_jsx("button", { type: "button", id: "react-burger-cross-btn", onClick: props.onClick, style: buttonStyle, ...(!props.isOpen && { tabIndex: -1 }), children: "Close Menu" }), _jsx(Icon, {})] }));
};
export default CrossIcon;
