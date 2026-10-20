# Revisión de cobertura de los ESM del Ejército Nacional en 2022

Revisión realizada el 19 de octubre de 2026 sobre la sección 28 de `lineas_de_mando_ejc_nacional_2022.txt`.

**El archivo no puede considerarse completo:** faltan seis entradas identificadas en las dos fuentes oficiales consultadas. Esto no equivale a seis sedes físicas nuevas: existen posibles coincidencias que deben resolverse antes de incorporarlas como establecimientos independientes.

Se tomó **2022** como referencia porque es el año del archivo. Esta revisión no certifica la totalidad de establecimientos existentes en 2026, la vigencia de los códigos numéricos ni las cadenas de dependencia.

## Resultado del cotejo

| Concepto | Resultado |
| --- | ---: |
| Registros únicos en la sección 28 | 136 |
| Registros locales representados en al menos una fuente de 2022, con las salvedades indicadas abajo | 133 |
| Registros locales sin correspondencia en las dos fuentes de 2022 | 3 |
| Entradas documentales ausentes, descontando la coincidencia Girardot/DISMEG entre fuentes | 6 |
| Otras entradas con equivalencia pendiente | 2 |
| Códigos numéricos existentes en el archivo, sin revalidarlos en este cotejo | 43 |
| Identificadores de trabajo con código numérico pendiente | 93 |

El conjunto de Datos Abiertos contiene 122 filas: 114 tienen correspondencia, cinco están ausentes, dos tienen equivalencia pendiente y una corresponde a Medicina Laboral. El directorio adjunto al comunicado de DISAN contiene 131 filas de establecimientos: 129 tienen correspondencia y dos están ausentes. Los totales de ambas fuentes **no se suman** porque comparten establecimientos y corresponden a cortes diferentes.

## Entradas ausentes

Las referencias de filas corresponden al orden de la copia JSON descargada; las páginas son las del PDF completo, contando desde uno.

| Entrada de la fuente | Municipio / lugar | Evidencia | Observación para incorporarla |
| --- | --- | --- | --- |
| DISMEG / GIRARDOT | Girardot, Cundinamarca | Datos Abiertos, fila 6; DISAN, página 17 | Consultorio de Girardot. Ambas fuentes se cuentan como una entrada faltante. |
| CRL | Bonza, Boyacá | DISAN, página 4 | El directorio separa la enfermería CRL de la UBAM GMSIL. GMSIL ya existe como ESM5037; no fusionarlas únicamente por compartir unidad o ubicación. |
| LICEOS | Bogotá | Datos Abiertos, fila 10 | Satélite Liceos. Comparte la dirección Calle 100 n.º 11-00 con BASIM del directorio; falta la identificación LICEOS, pero no está demostrada una sede física adicional. |
| ESFES | San José del Guaviare, Barrancón | Datos Abiertos, fila 14 | Escuela de Fuerzas Especiales Rurales. No se encontró fundamento para equipararla con DIVFE o REGFE3. |
| Grupo de Caballería n.º 10 «Tequendama» | Bogotá | Datos Abiertos, fila 17 | La fuente no proporciona sigla. La presencia de la unidad táctica GMTEQ en otras secciones no constituye una entrada ESM en la sección 28. |
| DIREC | Bogotá | Datos Abiertos, fila 96 | ESM de la Dirección de Reclutamiento. La línea de la dirección en otra sección no sustituye la del establecimiento sanitario. |

Estas fuentes no proporcionan un número ESM verificado para las seis entradas. No se asignaron números por analogía con ESM5175 ni con el número de la unidad militar.

## Equivalencias pendientes y salvedades

- **FUDRA / CASPC1:** Datos Abiertos registra FUDRA en La Macarena, pero su dirección dice Fuerte Militar Larandia. El directorio registra CASPC1, compañía de ASPC1 FUDRA1, en La Macarena. La relación es plausible; la contradicción de ubicación impide darla por confirmada. FUDRA no se cuenta entre los seis faltantes.
- **BACOM / BASCO:** ambas entradas remiten a Facatativá y a una intersección coincidente, pero las denominaciones de unidad son diferentes. No se confirmó que sean el mismo ESM. BACOM tampoco se cuenta entre los seis faltantes.
- **CACSA1 y CACSA2:** se relacionaron por la ubicación de sus grupos en el archivo: Tolemaida y Bogotá, respectivamente. Las fuentes de 2022 consultadas utilizan CACSA; no confirman los sufijos locales 1 y 2 como códigos oficiales.
- **BATOT18:** en la página 9 la columna de sigla parece decir BATOT10, mientras el nombre del ESM y de la unidad indican BATOT18. Se vinculó por el nombre y se dejó constancia de la discrepancia.
- **DISUR / BATRA1:** se vinculó por el nombre del Batallón de Transportes Tarapacá. No se revalidó el sufijo local 1.
- **MELAB:** Datos Abiertos, fila 122, identifica una Oficina de Medicina Laboral como centro de atención. Se separó del inventario estricto de ESM; no se agregó automáticamente como establecimiento faltante.

Otras correspondencias se resolvieron por denominación y ubicación: BASER6 → BAS06 → ESM5175; DISNORT/DISNOR → BAS13; DMBAR → BAS02; BASMA → BASAM; CRH → BASAN; BRCNA → BASCN. BALOG27 se vinculó a BICAS por su nombre de Ingenieros n.º 27 Manuel Castro Bayona; no se confundió con BALOC.

## Registros locales que requieren respaldo para 2022

**ESM_BIMUR, ESM_BAMAR y ESM_REGFE3** no aparecen identificados en ninguna de las dos listas de 2022 consultadas. Esto no demuestra que sobren ni justifica eliminarlos.

Como evidencia posterior, un [anexo técnico de contratación de 2023, página 26](https://operaciones.colombiacompra.gov.co/sites/cce_public/files/documentos_adicionales_oc/anexo_no._1_condiciones_tecnicas_1_06-10-2023.pdf) registra BIMUR y BAMAR. También incluye un establecimiento cuyo nombre menciona el Regimiento de Fuerzas Especiales n.º 3, pero cuya sigla figura como REGFE2. Esta discrepancia no permite validar ni renombrar automáticamente REGFE3. La evidencia de 2023 no se contabilizó como confirmación para 2022.

## Entregables y alcance de los cambios

- [Cotejo de los 136 registros locales](cotejo_esm_archivo_2022.csv): identificador, alias, referencias en cada fuente y estado.
- [Cotejo de las 253 filas de las dos fuentes](cotejo_esm_fuentes_2022.csv): correspondencia local, ausencias, dudas y observaciones. Se omiten los datos personales de los funcionarios.

Se conservaron las 136 cadenas de la sección 28 y se añadió una referencia a esta auditoría. Los faltantes y las equivalencias dudosas quedan documentados; no se presentan como altas confirmadas ni como códigos oficiales. Los CSV usan UTF-8 y punto y coma como separador.

El cotejo se reproduce desde la raíz del proyecto con `node artifacts/auditoria-esm/auditar-esm.cjs`, utilizando las copias descargadas en esa carpeta. El script comprueba unicidad, clasificación de todas las filas y coherencia de los totales. La transcripción del PDF se revisó visualmente en sus páginas 3 a 19.

## Fuentes

1. **Ejército Nacional de Colombia — Establecimientos de Sanidad Militar del Ejército Nacional**, [conjunto de Datos Abiertos](https://www.datos.gov.co/d/fgfq-enis). Los [metadatos](https://www.datos.gov.co/api/views/fgfq-enis.json) indican actualización de filas el **7 de julio de 2022** (`rowsUpdatedAt: 1657213469`). [Consulta JSON](https://www.datos.gov.co/resource/fgfq-enis.json?$limit=5000). La revisión usa las 122 filas descargadas, sin afirmar que constituyan por sí solas un censo exhaustivo. Atribución: Ejército Nacional de Colombia; licencia del conjunto CC BY-SA 4.0, aplicable a la proyección derivada de esos datos en los CSV. Se añadieron correspondencias y observaciones de esta revisión.
2. **Dirección de Sanidad del Ejército — Directorio adjunto al comunicado del 16 de noviembre de 2022**, radicado 2022321002468951, [PDF publicado por el Tribunal Superior de Cúcuta](https://tribunalsuperiordecucuta.gov.co/wp-content/uploads/2022/11/Comunicado-Nuevo-Director-DISAN.pdf). Directorio en páginas 3 a 19; se cuentan filas reales, no el máximo de la numeración impresa, que presenta saltos.

La diferencia entre fuentes puede obedecer a cambios de corte, nombres, satélites o alcance. Con estas fuentes sí se demuestra que el archivo necesita completar y aclarar entradas; no se puede certificar un total nacional definitivo sumando sus listados.
