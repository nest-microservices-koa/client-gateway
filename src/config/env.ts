import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVarsConfig = envVars as EnvVars;

export const envs = {
  port: envVarsConfig.PORT,
  productsMsHost: envVarsConfig.PRODUCTS_MS_HOST,
  productsMSPort: envVarsConfig.PRODUCTS_MS_PORT,
};
