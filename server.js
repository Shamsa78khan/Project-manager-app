const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./models');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to SQLite
db.sequelize.authenticate()
  .then(() => console.log('SQLite connected'))
  .catch(err => console.log('SQLite connection error:', err));

// Sync models and seed data
const forceSync = process.env.NODE_ENV !== 'production';
db.sequelize.sync({ force: forceSync }) // Force recreate tables for demo in dev
  .then(async () => {
    console.log('Database synced');
    if (forceSync) {
      // Seed sample data only in dev
      await seedData();
    }
  })
  .catch(err => console.log('Sync error:', err));

async function seedData() {
  const bcrypt = require('bcryptjs');
  // Create users
  const admin = await db.User.create({
    username: 'admin',
    email: 'admin@example.com',
    password: await bcrypt.hash('password', 10),
    role: 'Admin'
  });
  const member = await db.User.create({
    username: 'member',
    email: 'member@example.com',
    password: await bcrypt.hash('password', 10),
    role: 'Member'
  });

  // Create project
  const project = await db.Project.create({
    name: 'Sample Project',
    description: 'A sample project for demo',
    ownerId: admin.id
  });
  await project.addMember(member);

  // Create tasks
  await db.Task.create({
    title: 'Task 1',
    description: 'First task',
    status: 'To Do',
    assignedToId: member.id,
    projectId: project.id,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  });
  await db.Task.create({
    title: 'Task 2',
    description: 'Second task',
    status: 'In Progress',
    assignedToId: admin.id,
    projectId: project.id
  });

  console.log('Sample data seeded');
}

// Routes
app.use('/api/auth', require('./routes/auth')(db));
app.use('/api/projects', require('./routes/projects')(db));
app.use('/api/tasks', require('./routes/tasks')(db));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));