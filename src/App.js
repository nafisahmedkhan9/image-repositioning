// import React from "react"
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   const [scrollState, setScrollState] = React.useState({
//     rowIndex: 0,
//     columnIndex: 0
//   })


//   const setScrollRowAndColum = React.useCallback((rowIndex: number, columnIndex: number) => {
//     setScrollState({rowIndex, columnIndex})
//   }, [])

//   const ref = React.createRef();

//   const onMouseDown = (e) => {
//     console.log("start")
//     setIsScrolling(true)
//   }

//   const onMouseLeave = (e) => {
//     console.log("end")
//     setIsScrolling(false)
//   }

//   const onMouseMove = (e) => {

//     console.log("Y", e.target.scrollTop)
//     console.log("X", e.target.scrollTop)
//   }

//   return (
//     <div style={{
//       overflow: "hidden",
//       textAlign: "center",
//       height: "200px",
//       overflow: "scroll"
//     }}>
//       <img ref={ref}
//         onDragEnd={onMouseLeave}
//         onMouseLeave={onMouseLeave}
//         onMouseDown={onMouseDown}
//         onMouseMove={onMouseMove}
//         src={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg"} alt="logo" />
//     </div>
//   );
// }

// export default App;

import React from "react"
export default function ScrollAwareDiv() {
  const myRef = React.createRef()
  const [scrollTop, setScrollTop] = React.useState(0)
  const [scrollLeft, setScrollLeft] = React.useState(0)
  const [moving, setMoving] = React.useState(false)
  const [px, setPx] = React.useState(0)
  const [py, setPy] = React.useState(0)

  React.useEffect(() => {
    myRef.current.scrollTop = localStorage.getItem("scrollTop") ? localStorage.getItem("scrollTop") : 0
    myRef.current.scrollLeft = localStorage.getItem("scrollLeft") ? localStorage.getItem("scrollLeft") : 0
  }, [myRef])

  const onScroll = () => {
    setScrollTop(myRef.current.scrollTop)
    setScrollLeft(myRef.current.scrollLeft)
    localStorage.setItem("scrollTop", myRef.current.scrollTop)
    localStorage.setItem("scrollLeft", myRef.current.scrollLeft)
  }

  const onDragOver = (e) => {
    console.log(px, e.pageX, moving)
    if (moving) {
      setPx(e.pageX)
      setPy(e.pageY)
      
      if (e.pageY > py) {
        myRef.current.scrollTop = scrollTop+10
        localStorage.setItem("scrollTop", scrollTop+10)
      }else if(e.pageY < py){
        myRef.current.scrollTop = scrollTop-10
        localStorage.setItem("scrollTop", scrollTop-10)
      }

      if (e.pageX > px) {
        myRef.current.scrollLeft = scrollLeft+10
        localStorage.setItem("scrollLeft", scrollLeft+10)
      }else if(e.pageX < px){
        myRef.current.scrollLeft = scrollLeft-10
        localStorage.setItem("scrollLeft", scrollLeft-10)
      }
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          ref={myRef}
          onDragStart={() => setMoving(true)}
          onDragOver={onDragOver}
          onDragEnd={() => setMoving(false)}
          // onMouseMove={onMouseMove}
          onScroll={onScroll}
          style={{
            border: '1px solid black',
            width: '600px',
            height: '300px',
            overflow: 'scroll',
          }} >
          <img
            src={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg"} alt="logo" />
        </div>
      </div>
    </div>
  )
}