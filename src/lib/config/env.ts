function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing`);
  }

  return value;
}

export const ENV = {
  DATABASE_URL: required("DATABASE_URL"),
  OPENAI_API_KEY: required("OPENAI_API_KEY"),
};