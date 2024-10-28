import menuFactory from "../factories/menuFactory";
var styles = {
    pageWrap: function (isOpen, width, right) {
        return {
            MozTransform: isOpen
                ? ''
                : right
                    ? 'translate3d(-100px, 0, -600px) rotateY(20deg)'
                    : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
            MsTransform: isOpen
                ? ''
                : right
                    ? 'translate3d(-100px, 0, -600px) rotateY(20deg)'
                    : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
            OTransform: isOpen
                ? ''
                : right
                    ? 'translate3d(-100px, 0, -600px) rotateY(20deg)'
                    : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
            WebkitTransform: isOpen
                ? ''
                : right
                    ? 'translate3d(-100px, 0, -600px) rotateY(20deg)'
                    : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
            transform: isOpen
                ? ''
                : right
                    ? 'translate3d(-100px, 0, -600px) rotateY(20deg)'
                    : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
            transformStyle: 'preserve-3d',
            transition: 'all 0.5s',
            overflow: isOpen ? '' : 'hidden'
        };
    },
    outerContainer: function (isOpen) {
        return {
            perspective: '1500px',
            overflow: isOpen ? '' : 'hidden'
        };
    }
};
export default menuFactory(styles);
