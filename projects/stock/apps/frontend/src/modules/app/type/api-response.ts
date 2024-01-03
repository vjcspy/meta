import Joi from 'joi';

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  path?: string | null;
}

// Use ts-to-joi to create a Joi schema from the TypeScript interface

const schema = Joi.object({
  success: Joi.boolean().required(),
  message: Joi.string().required(),
  data: Joi.any(),
  path: Joi.string().optional().allow(null),
  timestamp: Joi.string().optional(),
  error: Joi.string().optional(),
}).unknown(true);

// Function to validate an object against the schema
export function validateApiResponse(data: ApiResponse) {
  return schema.validate(data, { abortEarly: false });
}
