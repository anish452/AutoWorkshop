const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding AutoRepairAgent database...');

  const roles = [
    { name: 'ADMIN', description: 'System Administrator' },
    { name: 'JOB_ADVISOR', description: 'Job Advisor - receives customer complaints' },
    { name: 'MECHANICAL', description: 'Mechanical Department User' },
    { name: 'ELECTRICAL', description: 'Electrical Department User' },
    { name: 'BODY_REPAIR', description: 'Body Repair Department User' },
    { name: 'PAINT', description: 'Paint Department User' },
    { name: 'GENERAL_INSPECTION', description: 'General Inspection Department User' },
    { name: 'CUSTOMER', description: 'Customer Portal User' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }
  console.log('Roles seeded');

  const departments = [
    { name: 'Mechanical', code: 'MECHANICAL', description: 'Engine, Transmission, Brake, Suspension, Steering, Cooling' },
    { name: 'Electrical', code: 'ELECTRICAL', description: 'Battery, Alternator, Wiring, Headlights, Sensors, ECU' },
    { name: 'Body Repair', code: 'BODY_REPAIR', description: 'Dent, Collision, Door Damage, Panel Damage' },
    { name: 'Paint', code: 'PAINT', description: 'Paint Scratch, Repainting, Color Restoration' },
    { name: 'General Inspection', code: 'GENERAL_INSPECTION', description: 'General vehicle inspection when department cannot be determined' },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { code: dept.code },
      update: {},
      create: dept,
    });
  }
  console.log('Departments seeded');

  const roleRecords = await prisma.role.findMany();
  const deptRecords = await prisma.department.findMany();
  const roleMap = Object.fromEntries(roleRecords.map((r) => [r.name, r.id]));
  const deptMap = Object.fromEntries(deptRecords.map((d) => [d.code, d.id]));

  const password = await bcrypt.hash('Password123!', 12);

  const customer = await prisma.customer.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      firstName: 'John',
      lastName: 'Smith',
      phone: '+61400000001',
      email: 'john.smith@email.com',
      address: '123 Main Street, Sydney NSW 2000',
    },
  });

  const customer2 = await prisma.customer.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      firstName: 'Maria',
      lastName: 'Garcia',
      phone: '+61400000002',
      email: 'maria.garcia@email.com',
      address: '456 Oak Avenue, Melbourne VIC 3000',
    },
  });
  console.log('Customers seeded');

  await prisma.vehicle.upsert({
    where: { registrationNumber: 'ABC123' },
    update: {},
    create: {
      registrationNumber: 'ABC123',
      chassisNumber: 'WVWZZZ1JZ3W386752',
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      customerId: customer.id,
    },
  });

  await prisma.vehicle.upsert({
    where: { registrationNumber: 'XYZ789' },
    update: {},
    create: {
      registrationNumber: 'XYZ789',
      chassisNumber: '1HGBH41JXMN109186',
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      customerId: customer2.id,
    },
  });
  console.log('Vehicles seeded');

  const users = [
    { email: 'admin@autorepair.com', firstName: 'System', lastName: 'Admin', role: 'ADMIN', department: null },
    { email: 'advisor@autorepair.com', firstName: 'Sarah', lastName: 'Johnson', role: 'JOB_ADVISOR', department: null },
    { email: 'mechanical@autorepair.com', firstName: 'Mike', lastName: 'Thompson', role: 'MECHANICAL', department: 'MECHANICAL' },
    { email: 'electrical@autorepair.com', firstName: 'David', lastName: 'Wilson', role: 'ELECTRICAL', department: 'ELECTRICAL' },
    { email: 'body@autorepair.com', firstName: 'Chris', lastName: 'Brown', role: 'BODY_REPAIR', department: 'BODY_REPAIR' },
    { email: 'paint@autorepair.com', firstName: 'Lisa', lastName: 'Davis', role: 'PAINT', department: 'PAINT' },
    { email: 'inspection@autorepair.com', firstName: 'Alex', lastName: 'Martinez', role: 'GENERAL_INSPECTION', department: 'GENERAL_INSPECTION' },
    { email: 'customer@autorepair.com', firstName: 'John', lastName: 'Smith', role: 'CUSTOMER', department: null, customerId: customer.id },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        password,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: '+61400000000',
        roleId: roleMap[user.role],
        departmentId: user.department ? deptMap[user.department] : null,
        customerId: user.customerId || null,
      },
    });
  }
  console.log('Users seeded');

  console.log('\n=== Seed Complete ===');
  console.log('Default password for all users: Password123!');
  console.log('\nTest Accounts:');
  console.log('  Admin:       admin@autorepair.com');
  console.log('  Job Advisor: advisor@autorepair.com');
  console.log('  Mechanical:  mechanical@autorepair.com');
  console.log('  Electrical:  electrical@autorepair.com');
  console.log('  Body Repair: body@autorepair.com');
  console.log('  Paint:       paint@autorepair.com');
  console.log('  Inspection:  inspection@autorepair.com');
  console.log('  Customer:    customer@autorepair.com');
  console.log('\nTest Vehicles: ABC123 (Toyota Camry), XYZ789 (Honda Civic)');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
