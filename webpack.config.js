const path = require('path');

const PROJECT_FOLDER = __dirname;

const ENTRY_FILE_NAME = path.resolve('src/app/index.tsx');

const PUBLIC_PATH = '/static/';
const PUBLIC_FOLDER = path.resolve(PROJECT_FOLDER, 'src/public');

const BUILD_WEB_FOLDER = path.resolve(PROJECT_FOLDER, 'build/public/web');
const OUTPUT_PATH = path.join(BUILD_WEB_FOLDER, PUBLIC_PATH);
const BUILD_REPORTS_FOLDER = path.resolve(PROJECT_FOLDER, 'build/reports/bundle-analyzer');

const TEMPLATE_FILE = path.resolve(PUBLIC_FOLDER, 'index.html');

const config = {
  PROJECT_FOLDER,
  ENTRY_FILE_NAME,
  PUBLIC_PATH,
  PUBLIC_FOLDER,
  BUILD_WEB_FOLDER,
  OUTPUT_PATH,
  BUILD_REPORTS_FOLDER,
  TEMPLATE_FILE
};

module.exports = config;
