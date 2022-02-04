declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_USER: string;
      DB_PASSWORD: string;
    }
  }
}

export {};
