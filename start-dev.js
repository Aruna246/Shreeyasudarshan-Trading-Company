import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure Node and npm are found
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const env = {
  ...process.env,
  PATH: `D:\\Nodejs;C:\\Users\\SRI\\AppData\\Roaming\\npm;${process.env.PATH || ''}`
};

console.log('🌿 Starting Shreeyasudarshan Trading Co. Full MERN Stack...');

// 1. Backend Server
const backend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true,
  env
});

// 2. Frontend Dev Server
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true,
  env
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
