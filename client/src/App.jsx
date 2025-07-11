import './App.css'
import {Routes, Route} from "react-router-dom"
import {Header} from "./components/Header"
import {Home} from "./views/Homepage"
import {ReservationForm} from "./views/ReservationForm"
import {ViewReservation} from "./views/ViewReservation"
import { useState } from 'react'
import { ParkInformation } from './views/ParkInformation'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LoginForm } from "./views/LoginForm"
import { RegistrationForm } from "./views/RegistrationForm"

function App() {

  const [headerInfo, setHeaderInfo] = useState({})

  return (
    <>
      <Header headerInfo={headerInfo} />
      <Routes>
        <Route path='/register' element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />}/>
        <Route path="/reservation/add" element={<ReservationForm />}/>
        <Route path="/reservation/details/:id" element={<ViewReservation setHeaderInfo={setHeaderInfo}/>}/>
        <Route path="/reservation/update/:id" element={<ReservationForm setHeaderInfo={setHeaderInfo}/>}/>
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
