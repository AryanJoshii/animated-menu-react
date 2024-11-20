import { CSSProperties, useState } from "react";
import * as Menus from 'animated-menu-react'

interface Styles {
  bmBurgerButton?: Partial<CSSProperties>;
  bmBurgerBars?: Partial<CSSProperties>;
  bmBurgerBarsHover?: Partial<CSSProperties>;
  bmCrossButton?: Partial<CSSProperties>;
  bmCross?: Partial<CSSProperties>;
  bmMenuWrap?: Partial<CSSProperties>;
  bmMenu?: Partial<CSSProperties>;
  bmMorphShape?: Partial<CSSProperties>;
  bmIcon?: Partial<CSSProperties>;
  bmItemList?: Partial<CSSProperties>;
  bmItem?: Partial<CSSProperties>;
  bmOverlay?: Partial<CSSProperties>;
}


const menus = {
  slide: "Slide",
  fallDown: "Fall Down",
  push: "Push",
  pushRotate: "Push Rotate",
  scaleDown: "Scale Down",
  scaleRotate: "Scale Rotate",
  reveal: "Reveal",
  stack: "Stack",
}

function App() {
  const [selectedMenu, setSelectedMenu] = useState<keyof typeof menus>("slide");
  const [positionMenuRight, setPositionMenuRight] = useState(false);
  
  const styles: Styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: !positionMenuRight ? '36px' : 'unset',
      right: positionMenuRight ? '36px' : 'unset',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#303841'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#303841'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: 'white',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      padding: '0.8em',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

  const RenderMenu = () => {
    const Menu = Menus[selectedMenu];
    return (
      <Menu styles={styles} pageWrapId="page-wrap" outerContainerId="outer-container" right={positionMenuRight}>
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
        <a href="">Projects</a>
      </Menu>
    );
  };

  return (
    <div id="outer-container">
      <RenderMenu />
      <main id="page-wrap">
        <div className="gh-link">
          <h1>
            <a href="https://github.com/AryanJoshii/animated-menu-react">Animated Menu React</a>
          </h1>
          <div className="point-gh-wrapper">
            <svg className="point-arrow" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 392.652 392.652" xmlSpace="preserve">
              <path d="M264.914,0l-21.213,21.213l35.963,35.963C187.617,45.969,95.469,96.632,58.291,186.385
	c-14.167,34.202-19.154,71.58-14.424,108.094c4.586,35.4,18.153,69.349,39.234,98.174l24.215-17.709
	c-37.839-51.74-45.805-117.938-21.308-177.078c35.378-85.41,128.749-129.6,215.705-105.878L243.701,150l21.213,21.213l85.607-85.606
	L264.914,0z"/>
            </svg>
            <p>Click here to visit GitHub!!</p>
          </div>
        </div>
        <code>npm i animated-menu-react</code>
        <div className="menu-pos">
          <button className={`${!positionMenuRight ? "active" : ""}`} onClick={() => { setPositionMenuRight(false) }}>Left</button>
          <button className={`${positionMenuRight ? "active" : ""}`} onClick={() => { setPositionMenuRight(true) }}>Right</button>
        </div>
        <div className="menu-btn-grid">
          {
            typeof menus === "object" &&
            Object.entries(menus).map(([key, value]) => (
              <button
                key={key}
                className={`${key === selectedMenu ? 'active' : ''}`}
                onClick={() => setSelectedMenu(key as keyof typeof menus)}
              >
                {value}
              </button>
            ))
          }
        </div>
        <footer><a href="https://github.com/AryanJoshii">Aryan Joshi</a> | ©️ {new Date().getFullYear()}</footer>
      </main>
    </div>
  )
}

export default App;