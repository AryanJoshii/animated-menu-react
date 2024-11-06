var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { cloneElement, useState } from "react";
var buttonStyle = {
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
var BurgerIcon = function (props) {
    var _a;
    var _b = useState(false), hover = _b[0], setHover = _b[1];
    var getLineStyle = function (index) {
        return __assign({ position: 'absolute', height: '20%', left: 0, right: 0, top: 20 * (index * 2) + '%', opacity: hover ? 0.6 : 1 }, (hover && props.styles && props.styles.bmBurgerBarsHover));
    };
    var Icon = function () {
        if (props.customIcon) {
            var extraProps = {
                className: "bm-icon ".concat(props.customIcon.props.className || '').trim(),
                style: __assign({ width: '100%', height: '100%' }, (props.styles && props.styles.bmIcon))
            };
            return cloneElement(props.customIcon, extraProps);
        }
        else {
            return (<span>
                    {[1, 2, 3].map(function (bar) { return (<span key={bar} className={"bm-burger-bars ".concat(props.barClassName, " ").concat(hover ? 'bm-burger-bars-hover' : '').trim()} style={__assign(__assign({}, getLineStyle(bar)), (props.styles && props.styles.bmBurgerBars))}/>); })}
                </span>);
        }
    };
    return (<div className={"bm-burger-button ".concat(props.className).trim()} style={__assign({ zIndex: 1000 }, ((_a = props.styles) === null || _a === void 0 ? void 0 : _a.bmBurgerButton))}>
            <button type="button" id="react-burger-menu-btn" onClick={props.onClick} onMouseOver={function () {
            setHover(true);
            if (props.onIconHoverChange) {
                props.onIconHoverChange({ isMouseIn: true });
            }
        }} onMouseOut={function () {
            setHover(false);
            if (props.onIconHoverChange) {
                props.onIconHoverChange({ isMouseIn: false });
            }
        }} style={buttonStyle}>
                Open Menu
            </button>
            <Icon />
        </div>);
};
export default BurgerIcon;
