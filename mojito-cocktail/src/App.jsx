import React from 'react'
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';




gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  return (
    <div className=' flex-center h-[100vh] ' >
      
     <h1 className=' font-extrabold text-5xl text-yellow-300 '> Hello, World and GSAP!!</h1>
    </div>
  )
}

export default App
