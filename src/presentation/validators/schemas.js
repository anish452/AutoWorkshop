const { z } = require('zod');

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().optional(),
    roleName: z.enum(['ADMIN', 'JOB_ADVISOR', 'MECHANICAL', 'ELECTRICAL', 'BODY_REPAIR', 'PAINT', 'GENERAL_INSPECTION', 'CUSTOMER']),
    departmentId: z.string().uuid().optional().nullable(),
    customerId: z.string().uuid().optional().nullable(),
  }),
});

const updateUserSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    phone: z.string().optional().nullable(),
    roleName: z.enum(['ADMIN', 'JOB_ADVISOR', 'MECHANICAL', 'ELECTRICAL', 'BODY_REPAIR', 'PAINT', 'GENERAL_INSPECTION', 'CUSTOMER']).optional(),
    departmentId: z.string().uuid().optional().nullable(),
    isActive: z.boolean().optional(),
  }),
});

const createDepartmentSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    code: z.string().min(1),
    description: z.string().optional(),
  }),
});

const updateDepartmentSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    name: z.string().min(1).optional(),
    code: z.string().min(1).optional(),
    description: z.string().optional().nullable(),
  }),
});

const createCustomerSchema = z.object({
  body: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email().optional().nullable(),
    address: z.string().optional().nullable(),
  }),
});

const updateCustomerSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
    email: z.string().email().optional().nullable(),
    address: z.string().optional().nullable(),
  }),
});

const createVehicleSchema = z.object({
  body: z.object({
    registrationNumber: z.string().min(1),
    chassisNumber: z.string().optional().nullable(),
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().int().min(1900).max(2100),
    customerId: z.string().uuid(),
  }),
});

const updateVehicleSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    registrationNumber: z.string().min(1).optional(),
    chassisNumber: z.string().optional().nullable(),
    make: z.string().min(1).optional(),
    model: z.string().min(1).optional(),
    year: z.number().int().min(1900).max(2100).optional(),
    customerId: z.string().uuid().optional(),
  }),
});

const analyzeJobSchema = z.object({
  body: z.object({
    vehicleRegistrationNo: z.string().min(1),
    description: z.string().min(3),
    customerId: z.string().uuid().optional(),
  }),
});

const completeJobSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    comments: z.string().min(1),
  }),
});

const updateJobSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    issueDescription: z.string().min(1).optional(),
    complaintDescription: z.string().min(1).optional(),
    departmentId: z.string().uuid().optional(),
  }),
});

const idParamSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
});

module.exports = {
  loginSchema,
  createUserSchema,
  updateUserSchema,
  createDepartmentSchema,
  updateDepartmentSchema,
  createCustomerSchema,
  updateCustomerSchema,
  createVehicleSchema,
  updateVehicleSchema,
  analyzeJobSchema,
  completeJobSchema,
  updateJobSchema,
  idParamSchema,
};
