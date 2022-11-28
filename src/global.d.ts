import 'jest-extended';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEO4J_HOST: string;
      NEO4J_USER: string;
      NEO4J_PASS: string;
    }
  }
}
