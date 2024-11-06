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
import { cloneElement } from "react";
var buttonWrapperStyle = {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 8,
    top: 8
};
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
var CrossIcon = function (props) {
    var getCrossStyle = function (type) {
        return {
            position: 'absolute',
            width: 3,
            height: 14,
            transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)'
        };
    };
    var Icon = function () {
        if (props.customIcon) {
            var extraProps = {
                className: "bm-cross ".concat(props.customIcon.props.className ||
                    '').trim(),
                style: __assign({ width: '100%', height: '100%' }, (props.styles && props.styles.bmCross))
            };
            return cloneElement(props.customIcon, extraProps);
        }
        else {
            return (<span style={{ position: 'absolute', top: '6px', right: '14px' }}>
                    {['before', 'after'].map(function (type, i) { return (<span key={i} className={"bm-cross ".concat(props.crossClassName).trim()} style={__assign(__assign({}, getCrossStyle(type)), (props.styles && props.styles.bmCross))}/>); })}
                </span>);
        }
    };
    return (<div className={"bm-cross-button ".concat(props.className).trim()} style={__assign(__assign({}, buttonWrapperStyle), (props.styles && props.styles.bmCrossButton))}>
            <button type="button" id="react-burger-cross-btn" onClick={props.onClick} style={buttonStyle} {...(!props.isOpen && { tabIndex: -1 })}>
                Close Menu
            </button>
            <Icon />
        </div>);
};
export default CrossIcon;
