import { prisma } from "../../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.config";




export const login = async ( phone: string, password: string ): Promise<{ token: string }> => {

    const user = await prisma.user.findUnique({
        where: {
            phone,
        },
    });

    if (!user) {
        throw new Error("Invalid phone number or password");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Invalid phone number or password");
    }

    const token = jwt.sign({ userId: user.id }, envConfig.jwtSecret, {
        expiresIn: "7d",
    });

    return { token };
};



export const changePassword = async (phone: string, oldPassword: string, newPassword: string) => {
    const user = await prisma.user.findUnique({
        where: {
            phone,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
        throw new Error("Invalid phone number or password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedPassword,
        },
    });
};



export const forgotPassword = async (phone: string) => {
    const user = await prisma.user.findUnique({
        where: {
            phone,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const resetToken = jwt.sign({ userId: user.id }, envConfig.passwordResetSecret, {
        expiresIn: "1h",
    });

    console.log(`Password reset token for ${phone}: ${resetToken}`);

};



export const resetPassword = async ( password: string, token: string) => {
    const decoded = jwt.verify(token, envConfig.passwordResetSecret);
    if (!decoded) {
        throw new Error("Invalid or expired password reset token");
    }

    const { userId } = decoded as { userId: string };

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedPassword,
        },
    });
}