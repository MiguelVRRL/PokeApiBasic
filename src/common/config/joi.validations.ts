import * as joi from 'joi';

export const joiValidationsSchema = joi.object({
    mongodb: joi.required(),
    port: joi.number().default(3001),
    defaultLimit: joi.number().default(7),
})