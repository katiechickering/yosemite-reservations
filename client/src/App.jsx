import './App.css'
import {Routes, Route} from "react-router-dom"
import {Header} from "./components/Header"
import {Home} from "./components/Home"
import {ReservationForm} from "./components/ReservationForm"
import {ViewReservation} from "./components/ViewReservation"
import { useState } from 'react'
import { ParkInformation } from './components/ParkInformation'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {

  const [headerInfo, setHeaderInfo] = useState({})

  return (
    <>
      <Header headerInfo={headerInfo} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="reservation/add" element={<ReservationForm />}/>
        <Route path="reservation/details/:id" element={<ViewReservation setHeaderInfo={setHeaderInfo}/>}/>
        <Route path="reservation/update/:id" element={<ReservationForm setHeaderInfo={setHeaderInfo}/>}/>
        <Route path="/parkinfo" element={<ParkInformation />}/>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
