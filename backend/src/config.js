import dotenv from "dotenv";


//Ejecuto "Dotenv"
//me ayudara a acceder al .env
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI || "mongodb+srv://fjsdeveloper1:ITR2025@mopt.jv6g0.mongodb.net/?retryWrites=true&w=majority&appName=MOPT",
    },
    server: {
        port: process.env.PORT || 4000,
    },
};