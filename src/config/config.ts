import dotenv from 'dotenv';

dotenv.config();

interface Config {
  mongoUri: string;
  serverPort: number;
}

const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/virtual-travel-tour-guide-api';
const SERVER_PORT: number = parseInt(process.env.PORT || '3000', 10);

const config: Config = {
  mongoUri: MONGODB_URI,
  serverPort: SERVER_PORT,
};

export default config;
