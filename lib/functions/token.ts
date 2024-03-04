import jwt from "jsonwebtoken";

export const createActivationToken = (payload: any) => {
  return jwt.sign(payload, process.env.ACT_ACTIVATION_TOKEN_SECRET as string, {
    expiresIn: "2d",
  });
};

export const createPwdResetToken = (payload: any) => {
  console.log(
    "token.js : createPwdResetToken : PWD_RESET_TOKEN_SECRET : ",
    process.env.PWD_RESET_TOKEN_SECRET
  );
  console.log("token.js : createPwdResetToken : payload : ", payload);
  return jwt.sign(payload, process.env.PWD_RESET_TOKEN_SECRET as string, {
    expiresIn: "1m",
  });
};

export const verifyResetPwdJwtToken = (
  token: string
): string | jwt.JwtPayload => {
  try {
    console.log(
      "token.js : verifyResetPwdJwtToken : PWD_RESET_TOKEN_SECRET : ",
      process.env.PWD_RESET_TOKEN_SECRET
    );
    const tt = jwt.verify(token, process.env.PWD_RESET_TOKEN_SECRET as string);
    return tt;
  } catch (error) {
    console.log("token.js : verifyJwtToken : error : ", error);
    return "token expired";
  }
};
