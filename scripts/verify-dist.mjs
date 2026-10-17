import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = fileURLToPath(new URL('..', import.meta.url));
const DIST_DIR = join(ROOT_DIR, 'dist');

function fail(problem, fix) {
  console.error(`Erro: ${problem} — Solução: ${fix}`);
  process.exit(1);
}

function walkFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full));
    } else if (entry.isFile()) {
      results.push(full);
    }
  }
  return results;
}

if (!existsSync(DIST_DIR) || !statSync(DIST_DIR).isDirectory()) {
  fail('diretório dist/ não encontrado', 'gere a build ofuscada antes de validar ou publicar');
}

const requiredFiles = [
  'dist/index.js',
  'dist/web.js',
  'dist/index.d.ts',
  'dist/adapters/web/index.d.ts',
];

for (const relPath of requiredFiles) {
  const fullPath = join(ROOT_DIR, relPath);
  if (!existsSync(fullPath)) {
    fail(`ficheiro obrigatório ausente: ${relPath}`, `certifique-se de que ${relPath} foi gerado em dist/`);
  }
}

const allFiles = walkFiles(DIST_DIR);
const forbidden = [];
const jsFiles = [];
const dtsFiles = [];

for (const file of allFiles) {
  const rel = relative(ROOT_DIR, file);
  if (rel.endsWith('.map')) {
    forbidden.push(rel);
  } else if (rel.endsWith('.tsx')) {
    forbidden.push(rel);
  } else if (rel.endsWith('.ts') && !rel.endsWith('.d.ts')) {
    forbidden.push(rel);
  } else if (rel.endsWith('.js')) {
    jsFiles.push(file);
  } else if (rel.endsWith('.d.ts')) {
    dtsFiles.push(file);
  }
}

if (forbidden.length > 0) {
  fail(
    `ficheiros de código-fonte ou sourcemaps proibidos em dist/: ${forbidden.slice(0, 5).join(', ')}`,
    'remova todos os ficheiros .map, .ts (não .d.ts) e .tsx de dist/'
  );
}

if (jsFiles.length === 0) {
  fail('nenhum ficheiro .js encontrado em dist/', 'execute o pipeline de ofuscação para popular dist/');
}

const obfuscationTargets = ['dist/core/embed/crypto.js', 'dist/web.js'];
for (const relTarget of obfuscationTargets) {
  const fullTarget = join(ROOT_DIR, relTarget);
  if (!existsSync(fullTarget)) {
    fail(`alvo de verificação ausente: ${relTarget}`, `gere ${relTarget} no pipeline de build`);
  }
  const content = readFileSync(fullTarget, 'utf8');
  const hasVaultOrMangled =
    content.includes('_0x') ||
    /\bconst\s+[a-zA-Z_$][0-9a-zA-Z_$]*\s*=\s*\[/.test(content);
  if (!hasVaultOrMangled) {
    fail(
      `${relTarget} não apresenta marcadores de ofuscação (_0x / string vault)`,
      'execute o compilador de ofuscação sobre dist/'
    );
  }
  if (/\/\*\*[\s\S]*?\*\//.test(content) || content.trim().split('\n').length > 5) {
    fail(
      `${relTarget} contém comentários multi-linha ou código não minificado`,
      'remova comentários durante a minificação/ofuscação de dist/'
    );
  }
}

console.log(
  `[verify-dist] OK · ${jsFiles.length} ficheiros .js ofuscados · ${dtsFiles.length} declarações .d.ts · 0 sourcemaps/fontes vazados.`
);
