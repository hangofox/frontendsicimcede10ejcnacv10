// Cotejo documental: no valida vigencia de códigos numéricos ni dependencia orgánica.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const out = path.join(root, 'src/assets/images/sobrantes/afinamientos-linea-mando');
const source = fs.readFileSync(path.join(out, 'lineas_de_mando_ejc_nacional_2022.txt'), 'utf8');
const section = source.split('28. ESTABLECIMIENTOS')[1].split('29. BATALLONES')[0];
const equivalents = new Map([...source.split('31. CODIGOS')[1].matchAll(/^(ESM\d+)->[^\r\n]+\(([A-Z0-9_]+),/gm)].map(m => [m[1], m[2]]));
const local = [...section.matchAll(/^(ESM[A-Z0-9_]+)->DISAN/gm)].map(m => ({id: m[1], alias: equivalents.get(m[1]) || m[1].replace(/^ESM_/, '')}));
const byAlias = new Map(local.map(r => [r.alias, r.id]));
assert.equal(local.length, 136);
assert.equal(new Set(local.map(r => r.id)).size, 136);
assert.equal(byAlias.size, 136);
assert.equal(local.filter(r => /^ESM\d+$/.test(r.id)).length, 43);

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'esm-ejercito-datos-abiertos.json'), 'utf8'));
// Correspondencias revisadas por nombre, unidad y municipio. Posiciones de la copia descargada.
// ? = equivalencia dudosa; ! = entrada ausente; ~ = oficina fuera del inventario estricto de ESM.
const targets = `BICAR BICAM ?FUDRA EMSUB ESPRO !DISMEG BAS29 BAPAL BIREY !LICEOS BAS28 BIMEJ BIVAR !ESFES BIPIG BAS17 !TEQUENDAMA BAS13 DMSOC BIROJ BAS22 BAS23 BAMRO BASDO BAS06 BATRA1 DMCAL GMJCO COEJC_ESM GMCAB BAJES BISAN BIOSP BAEEV8 ACORE BAS30 BAS08 LOS_LIBERTADORES BAEEV5 BAEEV13 BIROR BAS01 BATAR BITER16 BISOL BITER13 BAMGU BICIS BIROV BIVER ?BACOM BIGOH BAGAL BIGIR BICOD BAMUR BISUM ESMIC BAS02 BAS11 BIPAT GMRON BAS14 BASMO BAS27 BIMAG ESDEGUE ESLOG BAS26 BASAM BAS18 BIAVA BITER11 BIGUP BIRIF BISUC BIPEB BIVEL BILUD CACSA2 BAS09 BASCN BAS12 GMSIL BIBOM BIAYA BAS10 BINUT BICAZ BIRNA BAS16 BICOR BIVEN BICAI BIPIN !DIREC DMORI GBMAT DMTOL BALOC DMMED BICAB BICAS BIRAN BASAN DMGEM GMRPI DMBUG BITER2 BITER10 BASRO BIJOS BITER30 BITER3 BITER23 BITER7 BITER6 BAEEV19 BIBAR BAS15 BAMAM ~MELAB`.split(/\s+/);
assert.equal(data.length, 122);
assert.equal(targets.length, data.length);
const notes = {
  3: 'Posible CASPC1; municipio La Macarena y dirección Larandia contradictorios. No se da por equivalente.',
  10: 'Entrada LICEOS ausente; comparte dirección con BASIM del PDF. No se afirma que sea otra sede física.',
  14: 'Escuela de Fuerzas Especiales Rurales; no equiparar automáticamente con DIVFE o REGFE3.',
  17: 'La fuente no proporciona sigla. TEQUENDAMA es etiqueta de cotejo, no código oficial.',
  18: 'DISNORT / DISNOR: batallón ASPC13 Cacique Tisquesuza, alias local BAS13.',
  26: 'DISUR: batallón Transportes Tarapacá, alias local BATRA1; no valida sufijo numérico.',
  40: 'Sin sigla en campo sigla; BAEEV13 identificado por nombre del establecimiento.',
  51: 'Posible BASCO; dirección coincidente, denominaciones de unidad diferentes. No se da por equivalente.',
  59: 'DMBAR se corresponde por sede y dirección con BAS02 en PDF página 3.',
  70: 'BASMA / BASAM: batallón ASPC8 Cacique Calarcá, Pereira.',
  80: 'CACSA Bogotá: se usa alias local CACSA2 por ubicación; el sufijo 2 no se valida como sigla oficial.',
  82: 'BRCNA: batallón de apoyo y servicios contra el narcotráfico, alias local BASCN.',
  90: 'BIRNO44: batallón Ramón Nonato Pérez, alias local BIRNA.',
  103: 'BALOG27: nombre corresponde a Ingenieros27 Manuel Castro Bayona (BICAS), no BALOC.',
  105: 'CRH: batallón de Sanidad José María Hernández, alias local BASAN.',
  122: 'Oficina de Medicina Laboral, centro de atención; no se añade automáticamente como ESM.'
};
const rows = data.map((r, i) => {
  const target = targets[i];
  const status = target[0] === '!' ? 'AUSENTE' : target[0] === '?' ? 'EQUIVALENCIA_PENDIENTE' : target[0] === '~' ? 'FUERA_ALCANCE_ESM' : 'CORRESPONDENCIA';
  if (status === 'CORRESPONDENCIA') assert(byAlias.has(target), target);
  return {fuente: 'Datos Abiertos EJC 2022-07-07', referencia: `fila ${i + 1} de copia JSON`, sigla_fuente: r.sigla || '(sin sigla)', nombre_fuente: r.nombre_establecimiento_de_sanidad_militar, ciudad: r.ciudad, id_local: byAlias.get(target) || '', estado: status, observacion: notes[i + 1] || 'Correspondencia de sigla y denominación; no verifica código numérico.'};
});

// Transcripción de todas las filas del directorio, comprobadas visualmente en páginas 3–19.
// Sintaxis SIGLA_FUENTE:ALIAS_LOCAL cuando difieren; ! indica entrada ausente.
const pages = {
  3: 'BAS02 BIVER BITER2 BICOR BAS10 BICAR GMRON GBMAT BITER10',
  4: 'BAS01 BATAR BISUC GMSIL !CRL BAMGU BITER1 DMBUG BILUD BAADA:BAADA2',
  5: 'BAGAL BITER5 BASRO BAS30 BIROV BISAN BIJOS BITER30',
  6: 'DMCAL BAPAL BICOD BAMRO BITER3 BAS23 GMCAB BASGO BITER23 BAS29',
  7: 'BITER29',
  8: 'DMORI BIVAR BIGOH BITER7 BAS22 BICAM BITER22 BIAVA BASDO',
  9: 'BAS06 BICAI BIPAT BITER6 BATOT10:BATOT18',
  10: 'BAS12 BICAZ BIMEJ BAEEV19 BASCN BATOT1 BAS27 BISOL BIROR BICAS',
  11: 'BAEEV9 BALOC',
  12: 'DMMED GMJCO BIPEB BAJES BIGIR BINUT BITER4 BAS11 BIRIF BAEEV5',
  13: 'BITER11 BAS14 BIBOM BAEEV8 BIBAR BIREY BAS15 BIJUL BAS17 BICAB',
  14: 'BAS16 BIRNA BITER16 BAS18 GMRPI BIRAN BAMAM',
  15: 'DMSOC DMGEM CACSA:CACSA2 DISNOR:BAS13 BAEEV13 BIGUP BITER13 BASIM ESDEGUE LOS_LIBERTADORES DIVFE CRH:BASAN',
  16: 'COEJC:COEJC_ESM ESLOG ESMIC DISUR:BATRA1 BASCO BAS26 BAS28 BIROJ BIPIN BITER28',
  17: 'DMTOL ESPRO EMSUB CACSA:CACSA1 !GIRARDOT BISUM CASPC1',
  18: 'BAS08 BASMA:BASAM BIAYA BICIS BAMUR BIVEN BITER8',
  19: 'BAS09 BIPIG BIMAG BITER9'
};
for (const [page, entries] of Object.entries(pages)) {
  entries.split(' ').forEach((entry, i) => {
    const absent = entry.startsWith('!');
    const [sigla, alias = sigla] = entry.replace(/^!/, '').split(':');
    if (!absent) assert(byAlias.has(alias), alias);
    let note = 'Correspondencia por sigla y denominación; no verifica código numérico.';
    if (sigla === 'CRL') note = 'Bonza: fila de enfermería separada de la fila UBAM GMSIL en esta misma página; no fusionar sin validación.';
    if (sigla === 'GIRARDOT') note = 'Consultorio de Girardot; corresponde a DISMEG de Datos Abiertos.';
    if (sigla === 'CACSA') note = `Ubicación ${page === '15' ? 'Bogotá' : 'Tolemaida'}; sufijo ${alias} de trabajo, no confirmado como sigla oficial.`;
    if (sigla === 'BATOT10') note = 'Discrepancia interna: sigla parece BATOT10, pero nombre del ESM y unidad dicen BATOT18. Correspondencia por nombre.';
    if (sigla === 'DISNOR') note = notes[18];
    if (sigla === 'DISUR') note = notes[26];
    if (sigla === 'CRH') note = notes[105];
    if (sigla === 'BASMA') note = notes[70];
    rows.push({fuente: 'Directorio DISAN adjunto 2022-11-16', referencia: `página ${page}, fila ${i + 1} en orden visual`, sigla_fuente: sigla, nombre_fuente: '', ciudad: '', id_local: absent ? '' : byAlias.get(alias), estado: absent ? 'AUSENTE' : 'CORRESPONDENCIA', observacion: note});
  });
}
assert.equal(rows.length, 253);
const localRows = local.map(r => {
  const evidence = rows.filter(s => s.id_local === r.id);
  return {id_local: r.id, alias: r.alias, datos_abiertos: evidence.filter(s => s.fuente.startsWith('Datos')).map(s => s.referencia).join(' | '), directorio_disan: evidence.filter(s => s.fuente.startsWith('Directorio')).map(s => s.referencia).join(' | '), estado: evidence.length ? 'REPRESENTADO_EN_FUENTE_2022' : 'NO_CORROBORADO_EN_ESTAS_DOS_FUENTES_2022', codigo_numerico: /^ESM\d+$/.test(r.id) ? 'EXISTENTE_NO_REVALIDADO' : 'PENDIENTE', observacion: ['CACSA1', 'CACSA2', 'BATRA1', 'BATOT18'].includes(r.alias) ? 'Ver salvedad de denominación en cotejo por fuentes.' : ''};
});
const summary = {entradas_locales: local.length, con_codigo_numerico: 43, sin_codigo_numerico: 93, datos_abiertos: {}, directorio: {}, locales_sin_correspondencia: localRows.filter(r => r.estado.startsWith('NO_')).map(r => r.alias)};
for (const [key, subset] of [['datos_abiertos', rows.slice(0, 122)], ['directorio', rows.slice(122)]]) {
  for (const row of subset) summary[key][row.estado] = (summary[key][row.estado] || 0) + 1;
}
assert.equal(summary.datos_abiertos.CORRESPONDENCIA, 114);
assert.equal(summary.directorio.CORRESPONDENCIA, 129);
assert.deepEqual(summary.locales_sin_correspondencia, ['BIMUR', 'BAMAR', 'REGFE3']);
function csv(name, records) {
  const keys = Object.keys(records[0]);
  const quote = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  fs.writeFileSync(path.join(out, name), '\ufeff' + [keys, ...records.map(r => keys.map(k => r[k]))].map(r => r.map(quote).join(';')).join('\r\n') + '\r\n');
}
csv('cotejo_esm_fuentes_2022.csv', rows);
csv('cotejo_esm_archivo_2022.csv', localRows);
console.log(JSON.stringify(summary, null, 2));
