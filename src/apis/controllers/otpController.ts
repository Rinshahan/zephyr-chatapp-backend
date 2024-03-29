import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";

import { phoneOtp, verify } from "../services/otpServices";
import user from "../interfaces/userInterface";
import generateToken from "../utils/jsonwebtoken";



const sendOtpPhone = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const phoneNumber: string = req.body.phoneNumber
  if (!phoneNumber) {
    res.status(500).json({
      status: "failed",
      message: "please enter a valid phone number"
    })
  } else {
    const sendOtp = await phoneOtp(phoneNumber)
    if (sendOtp) {
      res.status(200).json({
        status: 'success',
        message: 'OTP Send successfully'
      })
    }
  }

})

const veryfyphoneOtp = asyncErrorHandler(async (req: Request, res: Response) => {
  const otp: string = req.body.otp
  const verfyOtp: user = await verify(otp)
  if (verfyOtp) {
    const token: string = generateToken(verfyOtp._id)
    res.status(200).json({
      status: 'success',
      token: token,
      user: verfyOtp
    })
  }
})

export {
  sendOtpPhone,
  veryfyphoneOtp
}