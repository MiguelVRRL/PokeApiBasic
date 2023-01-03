import * as joi from 'joi';

export const joiValidationsSchema = joi.object({
    MONGODB: joi.required(),
    PORT: joi.number().default(3001),
    DEFAULT_LIMIT: joi.number().default(7),
})