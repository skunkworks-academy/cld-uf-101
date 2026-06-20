import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const requiredFiles = [
  'README.md',
  'course.yml',
  'self-paced/README.md',
  'self-paced/course-map.yml',
  'self-paced/index.html',
  'self-paced/reader.html',
  'self-paced/assets/course.css',
  'self-paced/assets/course.js',
  'self-paced/assets/reader.js',
  'self-paced/modules/module-01-introduction.md',
  'self-paced/modules/module-02-getting-started.md',
  'self-paced/modules/module-03-core-use-cases.md',
  'self-paced/modules/module-04-effective-prompting.md',
  'self-paced/modules/module-05-documents-files.md',
  'self-paced/modules/module-06-projects-memory.md',
  'self-paced/modules/module-07-best-practices-pitfalls.md',
  'self-paced/modules/module-08-capstone-qa.md',
  'self-paced/resources/prompt-library.md',
  'self-paced/resources/learner-workbook.md',
  'self-paced/resources/verification-checklist.md',
  'self-paced/resources/ai-use-policy-template.md',
  'self-paced/assessments/module-knowledge-checks.md',
  'self-paced/assessments/final-knowledge-check.md',
  'self-paced/assessments/capstone-project.md',
  'self-paced/assessments/grading-guide.md',
  'self-paced/lms/implementation-guide.md',
  'self-paced/lms/scorm-readme.md',
  'self-paced/lms/imsmanifest.xml'
];

const requiredStrings = [
  { file: 'README.md', text: 'Online self-paced edition' },
  { file: 'self-paced/README.md', text: 'CLD-UF-101 Online Self-Paced Edition' },
  { file: 'self-paced/course-map.yml', text: 'capstone_required: true' },
  { file: 'self-paced/index.html', text: 'reader.html?module=module-01-introduction.md' },
  { file: 'self-paced/reader.html', text: 'Module Reader' },
  { file: 'self-paced/modules/module-04-effective-prompting.md', text: 'Six-Part Prompt Framework' },
  { file: 'self-paced/assessments/final-knowledge-check.md', text: '20 questions' },
  { file: 'self-paced/assessments/capstone-project.md', text: 'Verification List' },
  { file: 'self-paced/lms/implementation-guide.md', text: 'Recommended LMS Course Settings' }
];

const errors = [];

for (const file of requiredFiles) {
  const fullPath = join(root, file);
  if (!existsSync(fullPath)) {
    errors.push(`Missing required file: ${file}`);
  }
}

for (const check of requiredStrings) {
  const fullPath = join(root, check.file);
  if (!existsSync(fullPath)) {
    errors.push(`Cannot inspect missing file: ${check.file}`);
    continue;
  }
  const content = readFileSync(fullPath, 'utf8');
  if (!content.includes(check.text)) {
    errors.push(`Missing expected text in ${check.file}: ${check.text}`);
  }
}

if (errors.length > 0) {
  console.error('CLD-UF-101 validation failed.');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('CLD-UF-101 validation passed.');
console.log(`Validated ${requiredFiles.length} required files and ${requiredStrings.length} content checks.`);
