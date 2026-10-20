# Unidades de Oracle frente al archivo de líneas de mando

Consulta realizada el 19 de octubre de 2026 mediante la conexión configurada en `backendsicimcede10ejcnacv10/src/main/resources/application.properties`. Tabla: `TABLA_UNIDADES_MILITARES`. Se consultaron exclusivamente ID, código, nombre, sigla y nivel, dentro de una transacción de solo lectura. No se modificaron registros de Oracle ni cadenas del TXT.

**No todas las unidades de esta tabla están identificadas en el archivo.** Hay 12 registros: nueve unidades y tres opciones generales del sistema. Este resultado corresponde al esquema configurado en el backend; no se ha comprobado que sea el esquema adicional al que pueda referirse el usuario.

| Sigla en Oracle | Resultado en el TXT | Referencia |
| --- | --- | --- |
| CAOCC | Presente con sigla exacta y línea propia | `CAOCC->JEMOP->SECEJ->COEJC` |
| CBRICC | Correspondencia de nomenclatura con BRICC | `BRICC->CAOCC->JEMOP->SECEJ->COEJC` |
| BAICC | Presente con sigla exacta | `BAICC->CBRICC->CAOCC->JEMOP->SECEJ->COEJC` |
| BACCI | Presente con sigla exacta | `BACCI->CBRICC->CAOCC->JEMOP->SECEJ->COEJC` |
| CDIV05 | Correspondencia de nomenclatura con DIV05 | `DIV05->JEMOP->SECEJ->COEJC` |
| CBR06 | Correspondencia de nomenclatura con BR06 | `BR06->DIV05->JEMOP->SECEJ->COEJC` |
| BASPC06 | Correspondencia de nomenclatura con BAS06 | `BAS06->BR06->DIV05->JEMOP->SECEJ->COEJC` |
| DISMEDBR06 | **Confirmado por el usuario como ESM5175** | Se conserva `ESM5175->DISAN->COPER->JEMGF->SECEJ->COEJC`; en la sección 31 figura asociado a BAS06, Ibagué. |
| BASPC27 | Correspondencia de nomenclatura con BAS27 | `BAS27->BR27->DIV06->JEMOP->SECEJ->COEJC` |

Las cuatro correspondencias de nomenclatura se basan en la denominación de Oracle y en la abreviatura y número de unidad del TXT. No son coincidencias literales ni una validación histórica de su dependencia. No se confundieron BAS06 o BAS27, unidades tácticas, con ESM5175 o ESM_BAS27, establecimientos sanitarios.

Los otros tres registros son `TODAS LAS UNIDADES MILITARES`, `OTRA UNIDAD MILITAR U ORGANIZACION` y `BAJASEQYPERS`. Son opciones generales del sistema, no faltantes del organigrama.

Los códigos de las nueve unidades son `COD02` a `COD10`. No son números ESM. Esta consulta no permite completar los 93 códigos sanitarios pendientes. Tampoco se encontraron relaciones padre/hijo en los campos consultados que permitan certificar la ubicación jerárquica de las unidades ausentes.

El archivo representa 2022 y la consulta refleja los registros actuales del esquema; no se atribuye vigencia histórica a todas las filas de Oracle.

El [CSV de detalle](cotejo_unidades_oracle.csv) contiene los 12 registros, su clasificación y los números de línea del TXT al momento del cotejo. Para reproducirlo, ejecutar desde la raíz del frontend:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File artifacts/auditoria-esm/consultar-unidades-oracle.ps1
node artifacts/auditoria-esm/cotejar-oracle.cjs
```

El primer script toma las credenciales de la configuración existente y las entrega al cliente Oracle por entrada estándar; no las copia al informe ni a la línea de comandos. La copia local de la consulta se guarda en `artifacts/auditoria-esm/unidades-oracle.json`.
