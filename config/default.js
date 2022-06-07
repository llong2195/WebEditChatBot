require('dotenv').config();
module.exports = {

    app: {
        port: process.env.PORT || 3000,
        views_folder: __dirname+"/../src/apps/views",
        view_engine: "ejs",
        static_folder: __dirname+"/../src/public",
        session_key: "llong",
        session_secure: true,
        tmp: __dirname+"/../temp",
        MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/",
        JWT_ACCESS_TOKEN_SECRET : process.env.JWT_ACCESS_TOKEN_SECRET || "llong",
        JWT_ACCESS_TOKEN_LIFE : process.env.JWT_ACCESS_TOKEN_LIFE || "10m",
    },
    mail: {
        host: "smtp.gmail.com",
        post: 587,
        secure: false,
        auth: {
            user: "llong@gmail.com",
            pass: "rnqqtpbwsivtqopl"
        }
    }

}