import { Request, Response } from 'express';
import { authService } from '../services';


export const login = async (req: Request, res: Response) => {
  const { phone, password } = req.body;

  const { token } = await authService.login(phone, password);

  return res.status(200).json({ 
    message: "Login successful",
    accessToken: token 
});
};


export const changePassword = async (req: Request, res: Response) => {
  const { phone, oldPassword, newPassword } = req.body;

  await authService.changePassword(phone, oldPassword, newPassword);

  return res.status(204).json({
    message: "Password changed successfully"
  });
};


export const forgotPassword = async (req: Request, res: Response) => {
  const { phone } = req.body;

  await authService.forgotPassword(phone);

  return res.status(200).json({
    message: "Password reset link sent"
  });
};



export const resetPassword = async (req: Request, res: Response) => {
  const { password, token } = req.body;

  await authService.resetPassword(password, token);

  return res.status(200).json({
    message: "Password reset successfully"
  });
};