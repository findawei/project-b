const dotenv =require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    EMAIL_PW: process.env.EMAIL_PW,
    key: process.env.COMPANION_AWS_KEY,
    secret: process.env.COMPANION_AWS_SECRET,
    bucket: process.env.COMPANION_AWS_BUCKET,
    region: process.env.COMPANION_AWS_REGION,
    endpoint: process.env.COMPANION_AWS_ENDPOINT,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    project_id: process.env.project_id
}