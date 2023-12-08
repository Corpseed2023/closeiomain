import React, { useRef } from "react"
import "./OtpPage.scss"
import OtpTimer from "otp-timer"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { postQuery } from "../API/PostQuery"
import LongButton from "../components/button/LongButton"
toast.configure()

const OtpPage = () => {
  const [otpData, setOtpData] = useState({})

  const signUpRedux = useSelector((state) => state.SignUpDataReducer.data)
  const [leadUserInfo, setLeadUserInfo] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const firstRef = useRef()
  const secondRef = useRef()
  const thirdRef = useRef()
  const forthRef = useRef()
  const fiveRef = useRef()
  const sixRef = useRef()

  console.log("redux data", signUpRedux)
  let one = Object.values(otpData)
  const finalOtp = one.join("")
  // console.log(finalOtp)
  const finalApiData = { ...signUpRedux, otp: finalOtp }
  // console.log("i mam final data", finalApiData)

  const userRegistration = (e) => {
    e.preventDefault()

    console.log("before api call")
    const createUserApi = async () => {
      try {
        console.log("final data for api", finalApiData)
        const signupResponse = await postQuery(
          "/securityService/api/auth/createNewUser",
          finalApiData
        )
        console.log("signup aryan response data", signupResponse)
        console.log("signup aryan response data", signupResponse.data.data)
        const { id } = signupResponse.data.data
        console.log("id is response ", id)
        const leadUserData = {
          ...finalApiData,
          id: id,
          designation: "NA",
          department: "NA",
          role: ["ADMIN"],
        }
        delete leadUserData.otp
        delete leadUserData.companyName
        delete leadUserData.password
        delete leadUserData.mobile
        // leadUserData.designation = "NA",
        // leadUserData.department = "NA",

        console.log("final lead user data", leadUserData)

        const createLeadResponse = await postQuery(
          `/leadService/api/v1/users/createUsser`,
          leadUserData
        )
        console.log("create lead user  user response", createLeadResponse)

        navigate("/erp/login")
        toast.success("User SignUp Sucessfully")
      } catch (err) {
        console.log(err)
      }
    }

    createUserApi()
  }

  console.log("my api state data", leadUserInfo)

  // console.log("create id data aryan", createApiId);
  // console.log("final api data", finalApiData);
  // console.log();

  const sendTimer = () => {
    return (
      <>
        <button className="resend-text">Resend Code</button>
      </>
    )
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 8 && e.target.id === "six") {
      fiveRef.current.focus()
      return
    }
    if (e.keyCode === 8 && e.target.id === "five") {
      forthRef.current.focus()
      return
    }
    if (e.keyCode === 8 && e.target.id === "forth") {
      thirdRef.current.focus()
      return
    }
    if (e.keyCode === 8 && e.target.id === "three") {
      secondRef.current.focus()
      return
    }
    if (e.keyCode === 8 && e.target.id === "two") {
      firstRef.current.focus()
      return
    }

    if (e.target.id === "one") {
      secondRef.current.focus()
    }
    if (e.target.id === "two") {
      thirdRef.current.focus()
    }
    if (e.target.id === "three") {
      forthRef.current.focus()
    }
    if (e.target.id === "forth") {
      fiveRef.current.focus()
    }
    if (e.target.id === "five") {
      sixRef.current.focus()
    }
  }

  return (
    <div className="container otp-page">
      <h2 className="otp-heading">Enter confirmation code</h2>
      <p className="otp-number">A 4-digit code was sent to</p>
      <p className="otp-number">+91 99* * * * * * 18</p>
      <div className="input-boxes">
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, one: e.target.value }))
          }
          type="text"
          ref={firstRef}
          id="one"
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, two: e.target.value }))
          }
          type="text"
          id="two"
          ref={secondRef}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, three: e.target.value }))
          }
          type="text"
          id="three"
          ref={thirdRef}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, four: e.target.value }))
          }
          type="text"
          id="forth"
          ref={forthRef}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, five: e.target.value }))
          }
          type="text"
          id="five"
          ref={fiveRef}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, six: e.target.value }))
          }
          type="text"
          id="six"
          ref={sixRef}
          onKeyUp={(e) => handleKeyUp(e)}
        />
      </div>
      <div className="resend-timer">
        <OtpTimer seconds={30} minutes={1} resend={sendTimer} />
      </div>
      <LongButton onClick={(e) => userRegistration(e)} data="Continue" />
      {/* <button onClick={(e) => userRegistration(e)} className="login-button">
        Continue
      </button> */}
    </div>
  )
}

export default OtpPage
