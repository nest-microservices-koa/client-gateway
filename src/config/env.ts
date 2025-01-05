import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const natServers = process.env.NATS_SERVERS?.split(',') || [];

const { error, value: envVars } = envVarsSchema.validate({
  ...process.env,
  NATS_SERVERS: natServers,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVarsConfig = envVars as EnvVars;

export const envs = {
  port: envVarsConfig.PORT,
  natsServers: envVarsConfig.NATS_SERVERS,
};
