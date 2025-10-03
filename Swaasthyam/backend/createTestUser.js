import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables - try .env.production first, then .env
const envProductionPath = join(__dirname, '.env.production');
const envPath = join(__dirname, '.env');

if (fs.existsSync(envProductionPath)) {
  console.log('📦 Using .env.production');
  dotenv.config({ path: envProductionPath });
} else if (fs.existsSync(envPath)) {
  console.log('📦 Using .env');
  dotenv.config({ path: envPath });
} else {
  console.log('📦 Using default .env');
  dotenv.config();
}

// User Model
const userSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  password: String,
  role: String,
  dateOfBirth: Date,
  gender: String,
  bloodGroup: String,
  qrId: String,
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/swaasthyam');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create test users
const createTestUsers = async () => {
  try {
    await connectDB();

    const testUsers = [
      {
        name: 'Rajesh Kumar',
        phone: '9876543210',
        password: await bcrypt.hash('123456', 10),
        role: 'worker',
        dateOfBirth: new Date('1988-05-15'),
        gender: 'male',
        bloodGroup: 'B+',
        qrId: 'SW-2024-KL-001234',
      },
      {
        name: 'Priya Sharma',
        phone: '9876543211',
        password: await bcrypt.hash('123456', 10),
        role: 'officer',
        dateOfBirth: new Date('1990-08-20'),
        gender: 'female',
        bloodGroup: 'A+',
        qrId: 'SW-2024-DL-005678',
      },
      {
        name: 'Dr. Amit Patel',
        phone: '9876543212',
        password: await bcrypt.hash('123456', 10),
        role: 'official',
        dateOfBirth: new Date('1975-03-10'),
        gender: 'male',
        bloodGroup: 'O+',
        qrId: 'SW-2024-MH-009876',
      },
    ];

    console.log('\n🔄 Creating test users...\n');

    for (const userData of testUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ phone: userData.phone });
      
      if (existingUser) {
        console.log(`⚠️  User already exists: ${userData.name} (${userData.phone})`);
      } else {
        const user = new User(userData);
        await user.save();
        console.log(`✅ Created: ${userData.name} (${userData.role}) - Phone: ${userData.phone}`);
      }
    }

    console.log('\n✅ Test users created successfully!\n');
    console.log('📝 Login Credentials:\n');
    console.log('┌─────────────────────────────────────────────────────┐');
    console.log('│  MIGRANT WORKER                                     │');
    console.log('│  Phone: 9876543210                                  │');
    console.log('│  Password: 123456                                   │');
    console.log('│  (Use OTP from terminal)                            │');
    console.log('├─────────────────────────────────────────────────────┤');
    console.log('│  HEALTH OFFICER                                     │');
    console.log('│  Phone: 9876543211                                  │');
    console.log('│  Password: 123456                                   │');
    console.log('│  (Use OTP from terminal)                            │');
    console.log('├─────────────────────────────────────────────────────┤');
    console.log('│  GOVERNMENT OFFICIAL                                │');
    console.log('│  Phone: 9876543212                                  │');
    console.log('│  Password: 123456                                   │');
    console.log('│  (Use OTP from terminal)                            │');
    console.log('└─────────────────────────────────────────────────────┘\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test users:', error);
    process.exit(1);
  }
};

// Run the script
createTestUsers();

