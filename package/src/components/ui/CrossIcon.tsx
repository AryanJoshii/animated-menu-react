import { cloneElement, CSSProperties, FC, HTMLAttributes, ReactElement } from "react";
import { Styles } from "../../types";

interface CrossIconProps {
    styles?: Partial<Styles>;
    onClick?: () => void;
    customIcon?: ReactElement;
    className?: HTMLAttributes<HTMLDivElement>['className'];
    crossClassName?: string;
    isOpen?: boolean;
}

const buttonWrapperStyle: CSSProperties = {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 8,
    top: 8
};

const buttonStyle: CSSProperties = {
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

const CrossIcon: FC<CrossIconProps> = (props) => {

    const getCrossStyle = (type: 'before' | 'after'): CSSProperties => {
        return {
            position: 'absolute',
            width: 3,
            height: 14,
            transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)'
        };
    }

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
        } else {
            return (
                <span style={{ position: 'absolute', top: '6px', right: '14px' }}>
                    {(['before', 'after'] as const).map((type, i) => (
                        <span
                            key={i}
                            className={`bm-cross ${props.crossClassName}`.trim()}
                            style={{
                                ...getCrossStyle(type),
                                ...(props.styles && props.styles.bmCross)
                            }}
                        />
                    ))}
                </span>
            )
        }
    }

    return (
        <div
            className={`bm-cross-button ${props.className}`.trim()}
            style={{
                ...buttonWrapperStyle,
                ...(props.styles && props.styles.bmCrossButton)
            }}
        >
            <button
                type="button"
                id="react-burger-cross-btn"
                onClick={props.onClick}
                style={buttonStyle}
                {...(!props.isOpen && { tabIndex: -1 })}
            >
                Close Menu
            </button>
            <Icon />
        </div>
    )
}

export default CrossIcon