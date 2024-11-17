import { Children, cloneElement, createElement, useEffect, useRef, useState } from "react";
import { focusOnFirstMenuItem, focusOnLastMenuItem, focusOnMenuButton, focusOnNextMenuItem, focusOnPreviousMenuItem } from "../../helpers/dom";
import baseStyles from "../../helpers/baseStyles";
import BurgerIcon from "../ui/BurgerIcon";
import CrossIcon from "../ui/CrossIcon";
const defaultProps = {
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
    onStateChange: () => { },
    outerContainerId: '',
    overlayClassName: '',
    pageWrapId: '',
    styles: {},
    width: 300,
    onIconHoverChange: () => { },
    itemListElement: 'nav',
};
export default (styles) => {
    if (!styles) {
        throw new Error("No styles provided!");
    }
    const ARROW_DOWN = 'ArrowDown';
    const ARROW_UP = 'ArrowUp';
    const ESCAPE = 'Escape';
    const SPACE = ' ';
    const HOME = 'Home';
    const END = 'End';
    const usePrevious = (value) => {
        const ref = useRef(value);
        useEffect(() => {
            ref.current = value;
        }, [value]);
        return ref.current;
    };
    const Menu = (passedProps) => {
        const props = Object.assign({}, defaultProps, passedProps);
        const [isOpen, setIsOpen] = useState(false);
        const toggleOptions = useRef({});
        const timeoutId = useRef();
        const prevOpenProp = usePrevious(props.open);
        useEffect(() => {
            if (props.open) {
                toggleMenu({ noStateChange: true, isOpen: true });
            }
            return () => {
                applyWrapperStyles(false);
                clearCurrentTimeout();
            };
        }, []);
        useEffect(() => {
            // Checks if the open prop has changed/toggled or not.
            const hasOpenPropToggled = props.open !== undefined &&
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
        useEffect(() => {
            const { noStateChange, focusOnLastItem } = toggleOptions.current;
            if (!noStateChange) {
                props.onStateChange({ isOpen });
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
            timeoutId.current = window.setTimeout(() => {
                timeoutId.current = null;
                if (!isOpen) {
                    applyWrapperStyles(false);
                }
            }, 500);
            // Bind keydown handlers (or custom function if supplied)
            const defaultOnKeyDown = isOpen ? onKeyDownOpen : onKeyDownClosed;
            const onKeyDown = props.customOnKeyDown || defaultOnKeyDown;
            window.addEventListener('keydown', onKeyDown);
            return () => {
                window.removeEventListener('keydown', onKeyDown);
            };
        }, [isOpen]);
        function toggleMenu(options = {}) {
            toggleOptions.current = options;
            applyWrapperStyles();
            // Timeout ensures wrapper styles are applied before the menu is toggled.
            setTimeout(() => {
                setIsOpen(open => typeof options.isOpen !== 'undefined' ? options.isOpen : !open);
            });
        }
        function open() {
            if (typeof props.onOpen === 'function') {
                props.onOpen();
            }
            else {
                toggleMenu();
            }
        }
        function close() {
            if (typeof props.onClose === 'function') {
                props.onClose();
            }
            else {
                toggleMenu();
            }
        }
        function getStyleProperties(style, index) {
            const { width, right } = props;
            const formattedWidth = typeof width !== 'string' ? `${width}px` : width;
            return style(isOpen, formattedWidth, right, index);
        }
        // Builds styles incrementally for a given element
        const getStyles = (el, index, inline) => {
            const propName = 'bm' + el.replace(el.charAt(0), el.charAt(0).toUpperCase());
            // Set base styles
            let output = baseStyles[el] ? getStyleProperties(baseStyles[el]) : {};
            // Add animation-specific styles
            if (styles[el]) {
                output = {
                    ...output,
                    ...getStyleProperties(styles[el], index + 1)
                };
            }
            // Add custom styles
            if (props.styles && propName in props.styles) {
                output = {
                    ...output,
                    ...(props.styles[propName])
                };
            }
            // Add element inline styles
            if (inline) {
                output = {
                    ...output,
                    ...inline
                };
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
        const handleExternalWrapper = (id, wrapperStyles, set) => {
            const wrapper = document.getElementById(id);
            if (!wrapper) {
                console.error("Element with ID '" + id + "' not found");
                return;
            }
            const builtStyles = getStyleProperties(wrapperStyles);
            for (const _prop in builtStyles) {
                if (builtStyles.hasOwnProperty(_prop)) {
                    const prop = _prop;
                    wrapper.style[prop] = set ? builtStyles[prop] : '';
                }
            }
            const prop = 'accentColor';
            wrapper.style[prop];
            // Prevent any horizontal scroll
            // Only set overflow-x as an inline style if htmlClassName or
            // bodyClassName is not passed in. Otherwise, it is up to the caller to
            // decide if they want to set the overflow style in CSS using the custom
            // class names
            const applyOverflow = (el) => (el.style['overflowX'] = set ? 'hidden' : '');
            if (!props.htmlClassName) {
                applyOverflow(document.querySelector('html'));
            }
            if (!props.bodyClassName) {
                applyOverflow(document.querySelector('body'));
            }
        };
        const applyWrapperStyles = (set = true) => {
            const applyClass = (el, className) => el.classList[set ? 'add' : 'remove'](className);
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
            const menuWrap = document.querySelector('.bm-menu-wrap');
            if (menuWrap) {
                if (set) {
                    menuWrap.removeAttribute('hidden');
                }
                else {
                    menuWrap.setAttribute('hidden', 'true');
                }
            }
        };
        const clearCurrentTimeout = () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
        const onKeyDownOpen = (e) => {
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
        const onKeyDownClosed = (e) => {
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
        const handleOverlayClick = () => {
            if (props.disableOverlayClick === true ||
                (typeof props.disableOverlayClick === 'function' && props.disableOverlayClick())) {
                return;
            }
            else {
                close();
            }
        };
        return (<div>
                {!props.noOverlay && (<div className={`bm-overlay ${props.overlayClassName}`.trim()} onClick={handleOverlayClick} style={getStyles('overlay')}/>)}
                {props.customBurgerIcon !== false && (<div style={getStyles('burgerIcon')}>
                        <BurgerIcon onClick={open} styles={props.styles} customIcon={props.customBurgerIcon} className={props.burgerButtonClassName} barClassName={props.burgerBarClassName} onIconHoverChange={props.onIconHoverChange}/>
                    </div>)}
                <div id={props.id} className={`bm-menu-wrap ${props.className}`.trim()} style={getStyles('menuWrap')} aria-hidden={!isOpen}>
                    {styles.svg && (<div id="bm-morph-shape" className={`bm-morph-shape ${props.morphShapeClassName}`.trim()} style={getStyles('morphShape')}>
                            <svg width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
                                <path d={styles.svg.pathInitial}/>
                            </svg>
                        </div>)}
                    <div className={`bm-menu ${props.menuClassName}`.trim()} style={getStyles('menu')}>
                        {createElement(props.itemListElement, {
                className: `bm-item-list ${props.itemListClassName}`.trim(),
                style: getStyles('itemList')
            }, Children.map(props.children, (item, index) => {
                if (item) {
                    const classList = [
                        'bm-item',
                        props.itemClassName,
                        item.props.className
                    ]
                        .filter(className => !!className)
                        .join(' ');
                    const extraProps = {
                        key: index,
                        className: classList,
                        style: getStyles('item', index, item.props.style),
                        ...(!isOpen && { tabIndex: -1 })
                    };
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
};
