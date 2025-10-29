import { z } from 'zod'

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address')

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain at least one letter and one number')

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format')
  .optional()

// Form schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
})

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(5, 'Title must be at least 5 characters').max(100).optional(),
  content: z.string().min(10, 'Review must be at least 10 characters').max(1000)
})

export const serviceSchema = z.object({
  name: nameSchema,
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categoryId: z.string().min(1, 'Category is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code').optional(),
  phone: phoneSchema,
  email: emailSchema.optional(),
  website: z.string().url().optional(),
  priceRange: z.enum(['$', '$$', '$$$', '$$$$']).optional()
})

// Utility functions
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean
  data?: T
  errors?: z.ZodError
} => {
  try {
    const validData = schema.parse(data)
    return { success: true, data: validData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error }
    }
    throw error
  }
}

export const getFieldError = (errors: z.ZodError | undefined, fieldName: string): string | undefined => {
  return errors?.errors.find(error => error.path[0] === fieldName)?.message
}