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
import { Children, cloneElement, createElement, useEffect, useRef, useState } from "react";
import { focusOnFirstMenuItem, focusOnLastMenuItem, focusOnMenuButton, focusOnNextMenuItem, focusOnPreviousMenuItem } from "../../helpers/dom";
import baseStyles from "../../helpers/baseStyles";
import BurgerIcon from "../ui/BurgerIcon";
import CrossIcon from "../ui/CrossIcon";
var defaultProps = {
    bodyClassName: '',
    burgerBarClassName: '',
    burgerButtonClassName: '',
    className: '',
    crossButtonClassName: '',
    crossClassName: '',
    disableAutoFocus: false,
    disableCloseOnEsc: false,
    htmlClassName: '',
    id: '',
    itemClassName: '',
    itemListClassName: '',
    menuClassName: '',
    morphShapeClassName: '',
    noOverlay: false,
    noTransition: false,
    onStateChange: function () { },
    outerContainerId: '',
    overlayClassName: '',
    pageWrapId: '',
    styles: {},
    width: 300,
    onIconHoverChange: function () { },
    itemListElement: 'nav',
};
export default (function (styles) {
    if (!styles) {
        throw new Error("No styles provided!");
    }
    var ARROW_DOWN = 'ArrowDown';
    var ARROW_UP = 'ArrowUp';
    var ESCAPE = 'Escape';
    var SPACE = ' ';
    var HOME = 'Home';
    var END = 'End';
    var usePrevious = function (value) {
        var ref = useRef(value);
        useEffect(function () {
            ref.current = value;
        }, [value]);
        return ref.current;
    };
    var Menu = function (passedProps) {
        var props = Object.assign({}, defaultProps, passedProps);
        var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
        var toggleOptions = useRef({});
        var timeoutId = useRef();
        var prevOpenProp = usePrevious(props.open);
        useEffect(function () {
            if (props.open) {
                toggleMenu({ noStateChange: true, isOpen: true });
            }
            return function () {
                applyWrapperStyles(false);
                clearCurrentTimeout();
            };
        }, []);
        useEffect(function () {
            // Checks if the open prop has changed/toggled or not.
            var hasOpenPropToggled = props.open !== undefined &&
                props.open !== isOpen &&
                props.open !== prevOpenProp;
            if (hasOpenPropToggled) {
                // If open prop has changed we will toggle the menu and isOpen state.
                toggleMenu();
                // 
                return;
            }
            // TODO: Add logic for handling svg path aniations if the isOpen prop is changed.
        }, [props.open]);
        useEffect(function () {
            var _a = toggleOptions.current, noStateChange = _a.noStateChange, focusOnLastItem = _a.focusOnLastItem;
            if (!noStateChange) {
                props.onStateChange({ isOpen: isOpen });
            }
            if (!props.disableAutoFocus) {
                // For accessibility reasons, ensures that when we toggle open,
                // we focus the first or last menu item according to given parameter
                if (isOpen) {
                    focusOnLastItem ? focusOnLastMenuItem() : focusOnFirstMenuItem();
                }
                else {
                    if (document.activeElement) {
                        document.activeElement.blur();
                    }
                    else {
                        document.body.blur(); // Needed for IE
                    }
                }
            }
            // Timeout ensures wrappers are cleared after animation finishes
            clearCurrentTimeout();
            timeoutId.current = setTimeout(function () {
                timeoutId.current = null;
                if (!isOpen) {
                    applyWrapperStyles(false);
                }
            }, 500);
            // Bind keydown handlers (or custom function if supplied)
            var defaultOnKeyDown = isOpen ? onKeyDownOpen : onKeyDownClosed;
            var onKeyDown = props.customOnKeyDown || defaultOnKeyDown;
            window.addEventListener('keydown', onKeyDown);
            return function () {
                window.removeEventListener('keydown', onKeyDown);
            };
        }, [isOpen]);
        var toggleMenu = function (options) {
            if (options === void 0) { options = {}; }
            toggleOptions.current = options;
            applyWrapperStyles();
            // Timeout ensures wrapper styles are applied before the menu is toggled.
            setTimeout(function () {
                setIsOpen(function (open) {
                    return typeof options.isOpen !== 'undefined' ? options.isOpen : !open;
                });
            });
        };
        var open = function () {
            if (typeof props.onOpen === 'function') {
                props.onOpen();
            }
            else {
                toggleMenu();
            }
        };
        var close = function () {
            if (typeof props.onClose === 'function') {
                props.onClose();
            }
            else {
                toggleMenu();
            }
        };
        var getStyleProperties = function (style, index) {
            var width = props.width, right = props.right;
            var formattedWidth = typeof width !== 'string' ? "".concat(width, "px") : width;
            return style(isOpen, formattedWidth, right, index);
        };
        // Builds styles incrementally for a given element
        var getStyles = function (el, index, inline) {
            var propName = 'bm' + el.replace(el.charAt(0), el.charAt(0).toUpperCase());
            // Set base styles
            var output = baseStyles[el] ? getStyleProperties(baseStyles[el]) : {};
            // Add animation-specific styles
            if (styles[el]) {
                output = __assign(__assign({}, output), getStyleProperties(styles[el], index + 1));
            }
            // Add custom styles
            if (props.styles && propName in props.styles) {
                output = __assign(__assign({}, output), (props.styles[propName]));
            }
            // Add element inline styles
            if (inline) {
                output = __assign(__assign({}, output), inline);
            }
            // Remove transition if required
            // (useful if rendering open initially)
            if (props.noTransition) {
                delete output.transition;
            }
            return output;
        };
        // Sets or unsets styles on DOM elements outside the menu component
        // This is necessary for correct page interaction with some of the menus
        // Throws and returns if the required external elements don't exist,
        // which means any external page animations won't be applied
        var handleExternalWrapper = function (id, wrapperStyles, set) {
            var wrapper = document.getElementById(id);
            if (!wrapper) {
                console.error("Element with ID '" + id + "' not found");
                return;
            }
            var builtStyles = getStyleProperties(wrapperStyles);
            for (var _prop in builtStyles) {
                if (builtStyles.hasOwnProperty(_prop)) {
                    var prop_1 = _prop;
                    wrapper.style[prop_1] = set ? builtStyles[prop_1] : '';
                }
            }
            var prop = 'accentColor';
            wrapper.style[prop];
            // Prevent any horizontal scroll
            // Only set overflow-x as an inline style if htmlClassName or
            // bodyClassName is not passed in. Otherwise, it is up to the caller to
            // decide if they want to set the overflow style in CSS using the custom
            // class names
            var applyOverflow = function (el) { return (el.style['overflowX'] = set ? 'hidden' : ''); };
            if (!props.htmlClassName) {
                applyOverflow(document.querySelector('html'));
            }
            if (!props.bodyClassName) {
                applyOverflow(document.querySelector('body'));
            }
        };
        var applyWrapperStyles = function (set) {
            if (set === void 0) { set = true; }
            var applyClass = function (el, className) { return el.classList[set ? 'add' : 'remove'](className); };
            if (props.htmlClassName) {
                applyClass(document.querySelector('html'), props.htmlClassName);
            }
            if (props.bodyClassName) {
                applyClass(document.querySelector('body'), props.bodyClassName);
            }
            if (styles.pageWrap && props.pageWrapId) {
                handleExternalWrapper(props.pageWrapId, styles.pageWrap, set);
            }
            if (styles.outerContainer && props.outerContainerId) {
                handleExternalWrapper(props.outerContainerId, styles.outerContainer, set);
            }
            var menuWrap = document.querySelector('.bm-menu-wrap');
            if (menuWrap) {
                if (set) {
                    menuWrap.removeAttribute('hidden');
                }
                else {
                    menuWrap.setAttribute('hidden', 'true');
                }
            }
        };
        var clearCurrentTimeout = function () {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
        var onKeyDownOpen = function (e) {
            switch (e.key) {
                case ESCAPE:
                    // Close on ESC, unless disabled
                    if (!props.disableCloseOnEsc) {
                        close();
                        focusOnMenuButton();
                    }
                    break;
                case ARROW_DOWN:
                    focusOnNextMenuItem();
                    break;
                case ARROW_UP:
                    focusOnPreviousMenuItem();
                    break;
                case HOME:
                    focusOnFirstMenuItem();
                    break;
                case END:
                    focusOnLastMenuItem();
                    break;
            }
        };
        var onKeyDownClosed = function (e) {
            // Key downs came from menu button
            if (e.target === document.getElementById('react-burger-menu-btn')) {
                switch (e.key) {
                    case ARROW_DOWN:
                    case SPACE:
                        // If down arrow, space or enter, open menu and focus on first menuitem
                        toggleMenu();
                        break;
                    case ARROW_UP:
                        // If arrow up, open menu and focus on last menuitem
                        toggleMenu({ focusOnLastItem: true });
                        break;
                }
            }
        };
        var handleOverlayClick = function () {
            if (props.disableOverlayClick === true ||
                (typeof props.disableOverlayClick === 'function' && props.disableOverlayClick())) {
                return;
            }
            else {
                close();
            }
        };
        return (<div>
                {!props.noOverlay && (<div className={"bm-overlay ".concat(props.overlayClassName).trim()} onClick={handleOverlayClick} style={getStyles('overlay')}/>)}
                {props.customBurgerIcon !== false && (<div style={getStyles('burgerIcon')}>
                        <BurgerIcon onClick={open} styles={props.styles} customIcon={props.customBurgerIcon} className={props.burgerButtonClassName} barClassName={props.burgerBarClassName} onIconHoverChange={props.onIconHoverChange}/>
                    </div>)}
                <div id={props.id} className={"bm-menu-wrap ".concat(props.className).trim()} style={getStyles('menuWrap')} aria-hidden={!isOpen}>
                    {styles.svg && (<div id="bm-morph-shape" className={"bm-morph-shape ".concat(props.morphShapeClassName).trim()} style={getStyles('morphShape')}>
                            <svg width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
                                <path d={styles.svg.pathInitial}/>
                            </svg>
                        </div>)}
                    <div className={"bm-menu ".concat(props.menuClassName).trim()} style={getStyles('menu')}>
                        {createElement(props.itemListElement, {
                className: "bm-item-list ".concat(props.itemListClassName).trim(),
                style: getStyles('itemList')
            }, Children.map(props.children, function (item, index) {
                if (item) {
                    var classList = [
                        'bm-item',
                        props.itemClassName,
                        item.props.className
                    ]
                        .filter(function (className) { return !!className; })
                        .join(' ');
                    var extraProps = __assign({ key: index, className: classList, style: getStyles('item', index, item.props.style) }, (!isOpen && { tabIndex: -1 }));
                    return cloneElement(item, extraProps);
                }
            }))}
                    </div>
                    {props.customCrossIcon !== false && (<div style={getStyles('closeButton')}>
                            <CrossIcon onClick={close} styles={props.styles} customIcon={props.customCrossIcon} className={props.crossButtonClassName} crossClassName={props.crossClassName} isOpen={isOpen}/>
                        </div>)}
                </div>
            </div>);
    };
    return Menu;
});
