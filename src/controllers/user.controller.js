import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userRegister } from "../services/user.service.js";

export const handleUserRegister = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  const user = await userRegister(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};
