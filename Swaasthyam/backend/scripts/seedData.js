import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
import User from '../models/User.js';
import HealthRecord from '../models/HealthRecord.js';
import Alert from '../models/Alert.js';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Clear all data
const clearData = async () => {
  try {
    await User.deleteMany({});
    await HealthRecord.deleteMany({});
    await Alert.deleteMany({});
    console.log('🗑️  All old data cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing data:', error.message);
    throw error;
  }
};

// Seed data
const seedData = async () => {
  try {
    console.log('\n📦 Seeding fresh data...\n');

    // 1. Create Worker - Rajesh Kumar
    console.log('👷 Creating worker: Rajesh Kumar...');
    const worker = await User.create({
      name: 'Rajesh Kumar',
      phone: '9876543210',
      role: 'worker',
      location: {
        state: 'Kerala',
        district: 'Thiruvananthapuram',
        pincode: '695001',
        address: 'TC 12/345, Statue Junction, Thiruvananthapuram'
      },
      emergencyContact: {
        name: 'Sunita Kumar',
        phone: '9876543211',
        relation: 'Wife'
      },
      dateOfBirth: new Date('1985-06-15'),
      gender: 'male',
      bloodGroup: 'B+',
      occupation: 'Construction Worker',
      isActive: true,
      isVerified: true
    });
    console.log(`✅ Worker created - ID: ${worker._id}, QR ID: ${worker.qrId}`);

    // 2. Create Officer - Dr. Priya Sharma
    console.log('\n👨‍⚕️ Creating officer: Dr. Priya Sharma...');
    const officer = await User.create({
      name: 'Dr. Priya Sharma',
      phone: '9876543211',
      role: 'officer',
      location: {
        state: 'Kerala',
        district: 'Thiruvananthapuram'
      },
      gender: 'female',
      isActive: true,
      isVerified: true
    });
    console.log(`✅ Officer created - ID: ${officer._id}`);

    // 3. Create Government Official - Mr. Anil Menon
    console.log('\n👔 Creating official: Mr. Anil Menon...');
    const official = await User.create({
      name: 'Mr. Anil Menon',
      phone: '9876543212',
      role: 'official',
      location: {
        state: 'Kerala',
        district: 'Thiruvananthapuram'
      },
      gender: 'male',
      isActive: true,
      isVerified: true
    });
    console.log(`✅ Official created - ID: ${official._id}`);

    // 4. Create Health Records for Rajesh Kumar
    console.log('\n📋 Creating health records for Rajesh Kumar...');
    
    // First checkup - 3 months ago
    const firstCheckup = await HealthRecord.create({
      workerId: worker._id,
      addedBy: officer._id,
      date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
      bloodPressure: {
        systolic: 130,
        diastolic: 85
      },
      temperature: 98.4,
      weight: 72,
      height: 175,
      diagnosis: 'Slightly elevated blood pressure - advised lifestyle modifications',
      symptoms: ['Occasional headache', 'Mild fatigue'],
      medications: [
        {
          name: 'Amlodipine',
          dosage: '5mg',
          frequency: 'Once daily',
          duration: '30 days'
        }
      ],
      status: 'monitoring',
      nextCheckupDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      checkupReason: 'Follow-up for blood pressure',
      notes: 'Patient counseled on lifestyle modifications. Blood pressure monitoring advised. Prescribed Amlodipine 5mg.'
    });
    console.log(`✅ First health record created`);

    // Recent checkup - 1 week ago
    const recentCheckup = await HealthRecord.create({
      workerId: worker._id,
      addedBy: officer._id,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      bloodPressure: {
        systolic: 120,
        diastolic: 80
      },
      temperature: 98.6,
      weight: 70,
      height: 175,
      diagnosis: 'Good improvement - blood pressure now within normal range. Patient is fit for work.',
      symptoms: [],
      medications: [
        {
          name: 'Vitamin D3',
          dosage: '1000 IU',
          frequency: 'Once daily',
          duration: '30 days'
        }
      ],
      status: 'fit',
      nextCheckupDate: new Date(Date.now() + 83 * 24 * 60 * 60 * 1000), // 83 days from now
      checkupReason: 'Routine health checkup',
      notes: 'Excellent compliance with treatment. Patient is fit for work. Blood pressure well controlled. Continue current regimen.'
    });
    console.log(`✅ Recent health record created`);

    // 5. Create Alerts for Rajesh Kumar
    console.log('\n🔔 Creating alerts for Rajesh Kumar...');

    // Alert 1: Upcoming checkup reminder
    const alert1 = await Alert.create({
      workerId: worker._id,
      createdBy: officer._id,
      type: 'checkup',
      title: 'Upcoming Health Checkup Reminder',
      message: 'Your next health checkup is scheduled for 3 months from your last visit. Please visit the Community Health Center for your routine checkup.',
      severity: 'medium',
      isRead: false,
      actionRequired: true,
      actionType: 'visit_clinic',
      actionDeadline: new Date(Date.now() + 83 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days TTL
    });
    console.log(`✅ Checkup reminder alert created`);

    // Alert 2: Health status update
    const alert2 = await Alert.create({
      workerId: worker._id,
      createdBy: officer._id,
      type: 'info',
      title: 'Health Status: Fit for Work',
      message: 'Your recent health checkup shows excellent improvement! You are certified fit for work. Keep up the healthy lifestyle.',
      severity: 'low',
      isRead: false,
      actionRequired: false,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days TTL
    });
    console.log(`✅ Health status alert created`);

    // Alert 3: Medication reminder
    const alert3 = await Alert.create({
      workerId: worker._id,
      createdBy: officer._id,
      type: 'medication',
      title: 'Medication Reminder',
      message: 'Remember to take your Vitamin D3 supplement daily. This helps maintain bone health and immunity.',
      severity: 'low',
      isRead: false,
      actionRequired: true,
      actionType: 'take_medication',
      actionDeadline: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000), // 23 days
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    console.log(`✅ Medication reminder alert created`);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ MOCK DATA SEEDED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n📊 Summary:');
    console.log('━'.repeat(60));
    console.log('\n👥 USERS:');
    console.log(`   • Worker: ${worker.name} (${worker.phone})`);
    console.log(`     - ID: ${worker._id}`);
    console.log(`     - QR ID: ${worker.qrId}`);
    console.log(`\n   • Officer: ${officer.name} (${officer.phone})`);
    console.log(`     - ID: ${officer._id}`);
    console.log(`\n   • Official: ${official.name} (${official.phone})`);
    console.log(`     - ID: ${official._id}`);
    
    console.log('\n\n📋 HEALTH RECORDS:');
    console.log(`   • 2 health records created for Rajesh Kumar`);
    console.log(`   • Latest status: FIT FOR WORK ✅`);
    console.log(`   • Blood Pressure: 120/80 mmHg (Normal)`);
    console.log(`   • Weight: 70 kg, Height: 175 cm`);
    
    console.log('\n\n🔔 ALERTS:');
    console.log(`   • 3 alerts created for Rajesh Kumar`);
    console.log(`   • All alerts unread`);
    console.log(`   • Types: Checkup reminder, Health status, Medication reminder`);
    
    console.log('\n' + '━'.repeat(60));
    console.log('\n🧪 TEST AUTHENTICATION:');
    console.log('━'.repeat(60));
    console.log('\n✅ OTP Authentication (No Password Required)');    
    console.log('\nWorker Login:');
    console.log('  Phone: 9876543210');
    console.log('  Method: OTP (6-digit code)');
    console.log('\nOfficer Login:');
    console.log('  Phone: 9876543211');
    console.log('  Method: OTP (6-digit code)');
    console.log('\nOfficial Login:');
    console.log('  Phone: 9876543212');
    console.log('  Method: OTP (6-digit code)');
    console.log('\n' + '='.repeat(60) + '\n');

  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    throw error;
  }
};

// Main function
const main = async () => {
  try {
    await connectDB();
    await clearData();
    await seedData();
    
    console.log('✨ Database seeding completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
};

// Run the script
main();

