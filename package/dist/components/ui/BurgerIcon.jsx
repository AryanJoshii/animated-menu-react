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
            return (<span>
                    {[1, 2, 3].map(bar => (<span key={bar} className={`bm-burger-bars ${props.barClassName} ${hover ? 'bm-burger-bars-hover' : ''}`.trim()} style={{
                        ...getLineStyle(bar),
                        ...(props.styles && props.styles.bmBurgerBars)
                    }}/>))}
                </span>);
        }
    };
    return (<div className={`bm-burger-button ${props.className}`.trim()} style={{
            ...{ zIndex: 1000 },
            ...(props.styles?.bmBurgerButton)
        }}>
            <button type="button" id="react-burger-menu-btn" onClick={props.onClick} onMouseOver={() => {
            setHover(true);
            if (props.onIconHoverChange) {
                props.onIconHoverChange({ isMouseIn: true });
            }
        }} onMouseOut={() => {
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
