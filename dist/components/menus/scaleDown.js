import menuFactory from "../factories/menuFactory";
var styles = {
    pageWrap: function (isOpen, width) {
        return {
            MozTransform: isOpen ? '' : "translate3d(0, 0, -".concat(width, ")"),
            MsTransform: isOpen ? '' : "translate3d(0, 0, -".concat(width, ")"),
            OTransform: isOpen ? '' : "translate3d(0, 0, -".concat(width, ")"),
            WebkitTransform: isOpen ? '' : "translate3d(0, 0, -".concat(width, ")"),
            transform: isOpen ? '' : "translate3d(0, 0, -".concat(width, ")"),
            transformOrigin: '100%',
            transformStyle: 'preserve-3d',
            transition: 'all 0.5s'
        };
    },
    outerContainer: function () {
        return {
            perspective: '1500px'
        };
    }
};
export default menuFactory(styles);
