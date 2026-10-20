const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const folder = path.resolve(__dirname, '../../src/assets/images/sobrantes/afinamientos-linea-mando');
const units = JSON.parse(fs.readFileSync(path.join(__dirname, 'unidades-oracle.json'), 'utf8'));
const lines = fs.readFileSync(path.join(folder, 'lineas_de_mando_ejc_nacional_2022.txt'), 'utf8').split(/\r?\n/);
const chains = lines.flatMap((text, index) => /^[A-Z][A-Z0-9_]*->/.test(text) ? [{text, line: index + 1, tokens: text.split(/\s+/)[0].split('->')}] : []);
const aliases = {CDIV05: 'DIV05', CBR06: 'BR06', BASPC06: 'BAS06', BASPC27: 'BAS27', CBRICC: 'BRICC'};
const controls = new Set(['TODAS LAS UNIDADES MILITARES', 'OTRA UNIDAD MILITAR U ORGANIZACION', 'BAJASEQYPERS']);
const result = units.map(unit => {
  const sigla = unit.sigla.trim().toUpperCase();
  let matched = chains.filter(c => c.tokens[0] === sigla);
  let status = matched.length ? 'PRESENTE_SIGLA_EXACTA' : 'SIN_COINCIDENCIA';
  let equivalent = '';
  let note = '';
  if (controls.has(sigla)) {
    status = 'REGISTRO_GENERAL_DEL_SISTEMA';
    note = 'No representa una unidad que deba añadirse al organigrama.';
  } else if (!matched.length && aliases[sigla]) {
    equivalent = aliases[sigla];
    matched = chains.filter(c => c.tokens[0] === equivalent);
    assert(matched.length, equivalent);
    status = 'CORRESPONDENCIA_DE_NOMENCLATURA';
    note = 'Correspondencia por denominación y número de unidad; el TXT no usa la sigla literal de Oracle. No valida dependencia ni vigencia en 2022.';
  } else if (!matched.length && sigla === 'DISMEDBR06') {
    equivalent = 'ESM5175';
    matched = chains.filter(c => c.tokens[0] === equivalent);
    status = 'EQUIVALENCIA_CONFIRMADA_POR_USUARIO';
    note = 'El usuario confirmó que DISMEDBR06 corresponde al ESM5175 del archivo; se conserva la cadena ESM5175->DISAN->COPER->JEMGF->SECEJ->COEJC.';
  } else if (!matched.length) {
    matched = chains.filter(c => c.tokens.slice(1).includes(sigla));
    if (matched.length) status = 'SOLO_COMO_SUPERIOR';
    else note = 'No aparece como inicio ni como nodo de las cadenas por código o sigla. No se infiere su dependencia.';
  }
  const byCode = chains.filter(c => c.tokens.includes(String(unit.codigo).trim().toUpperCase()));
  return {id_oracle: unit.id, codigo_oracle: unit.codigo, sigla_oracle: unit.sigla, nombre_oracle: unit.nombre, nivel_oracle: unit.nivel, estado: status, equivalente_txt: equivalent, lineas_txt: matched.map(c => c.line).join(' | '), cadenas_txt: [...new Set(matched.map(c => c.text))].join(' | '), coincidencias_codigo: byCode.length, observacion: note};
});
assert.equal(result.length, units.length);
const keys = Object.keys(result[0]);
const quote = value => '"' + String(value ?? '').replace(/"/g, '""') + '"';
const csv = [keys, ...result.map(row => keys.map(key => row[key]))].map(row => row.map(quote).join(';')).join('\r\n');
fs.writeFileSync(path.join(folder, 'cotejo_unidades_oracle.csv'), '\ufeff' + csv + '\r\n');
const counts = {};
for (const row of result) counts[row.estado] = (counts[row.estado] || 0) + 1;
console.log(JSON.stringify({registros: result.length, estados: counts, coincidencias_por_codigo: result.reduce((sum, row) => sum + row.coincidencias_codigo, 0)}, null, 2));
