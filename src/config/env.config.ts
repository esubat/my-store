import dotenv from 'dotenv';
import z from 'zod';  

dotenv.config();


const envSchema = z.object({
    PORT: z.string().min(1, 'PORT is required'),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
    PASSWORD_RESET_SECRET: z.string().min(1, 'PASSWORD_RESET_SECRET is required'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.message);
  process.exit(1);
}


const envConfig = {
    port: parsedEnv.data.PORT,
    databaseUrl: parsedEnv.data.DATABASE_URL,
    jwtSecret: parsedEnv.data.JWT_SECRET,
    passwordResetSecret: parsedEnv.data.PASSWORD_RESET_SECRET,
};


export default envConfig;