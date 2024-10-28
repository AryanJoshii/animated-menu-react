import menuFactory from '../factories/menuFactory';
var styles = {
    pageWrap: function (isOpen, width, right) {
        return {
            MozTransform: isOpen
                ? ''
                : right
                    ? "translate3d(-".concat(width, ", 0, 0)")
                    : "translate3d(".concat(width, ", 0, 0)"),
            MsTransform: isOpen
                ? ''
                : right
                    ? "translate3d(-".concat(width, ", 0, 0)")
                    : "translate3d(".concat(width, ", 0, 0)"),
            OTransform: isOpen
                ? ''
                : right
                    ? "translate3d(-".concat(width, ", 0, 0)")
                    : "translate3d(".concat(width, ", 0, 0)"),
            WebkitTransform: isOpen
                ? ''
                : right
                    ? "translate3d(-".concat(width, ", 0, 0)")
                    : "translate3d(".concat(width, ", 0, 0)"),
            transform: isOpen
                ? ''
                : right
                    ? "translate3d(-".concat(width, ", 0, 0)")
                    : "translate3d(".concat(width, ", 0, 0)"),
            transition: 'all 0.5s'
        };
    },
    outerContainer: function (isOpen) {
        return {
            overflow: isOpen ? '' : 'hidden'
        };
    }
};
export default menuFactory(styles);
