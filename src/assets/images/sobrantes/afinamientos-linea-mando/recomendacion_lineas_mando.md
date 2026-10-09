# Propuesta: líneas de mando para solicitudes de infraestructura

Documento de asesoría. No modifica el frontend, el backend ni la base de datos.
Diagrama completo con patas de gallina: `diagrama_er_lineas_mando_patas_gallina.png`. También se actualiza `diagrama_er_lineas_mando.png` con la misma imagen.

La imagen muestra cada campo en una fila, sin puntos suspensivos ni agrupaciones: los 43 campos de las cuatro interfaces existentes, la nueva FK de la solicitud y todos los campos de las cuatro entidades propuestas. La correspondencia exacta con las propiedades consultadas está en `campos_diagrama_lineas_mando.md`. Las FK hacia catálogos externos al ámbito de líneas de mando están identificadas con `FK*` y explicadas dentro del PNG.

## Recomendación principal

Convertir los grupos de columnas por nivel en registros relacionados. La tabla suministrada contiene 17 puestos fijos con seis campos por puesto. Añadir un nuevo tipo de unidad obliga a agregar columnas, propiedades del DTO y condiciones en las pantallas. En el modelo propuesto una ruta diferente se configura insertando etapas y cargos, sin alterar la estructura de las tablas.

La línea se asigna a la **unidad militar concreta que origina la solicitud**, no solamente a su clasificación. Dos dispensarios pueden tener autoridades distintas aunque ambos sean del mismo tipo. El dato «nivel» sirve para clasificar; no debe determinar una jerarquía universal.

Esta propuesta representa el recorrido administrativo de una solicitud de infraestructura, que puede incluir revisiones técnicas o financieras. No presupone que todos los pasos sean relaciones de subordinación orgánica directa. Los ejemplos conservan el orden indicado por el usuario, pendiente de validación institucional.

## Tablas del diagrama

Los nombres de entidades son lógicos. Los campos existentes se muestran completos, convirtiendo los nombres de las propiedades de las interfaces a snake_case y representando cada DTO asociado como una FK. No son nombres físicos confirmados: debe comprobarse el nombre, tipo y nulabilidad de cada columna y sus restricciones en Oracle antes de preparar el DDL.

| Entidad lógica | Propósito |
|---|---|
| UNIDAD_MILITAR | Reutilizar el catálogo: batallón, dispensario, CENAC, dirección, comando, etc., como unidades concretas. |
| LINEA_MANDO | Nueva. Define una versión de la ruta de una unidad solicitante, con estado y vigencia. |
| ETAPA_LINEA_MANDO | Nueva. Una fila por unidad participante, con orden explícito dentro de la ruta. La etapa 1 corresponde a la unidad solicitante. |
| CARGO_INTEGRANTE_DOCUMENTO | Reutilizar el catálogo de cargos. Es independiente de los niveles de la ruta. |
| CARGO_ETAPA_LINEA | Nueva. Define los puestos de firma o participación exigidos en cada etapa, su orden y obligatoriedad. |
| HISTORIAL_INTEGRANTE_DOCUMENTO | Catálogo paramétrico de personas, asociado a unidad y cargo. Sin relación con solicitudes ni con sus integrantes; puede consultarse para copiar los datos del participante. |
| SOLICITUD_INFRAESTRUCTURA | Conservar la solicitud actual y agregar la referencia a la versión de ruta utilizada. |
| INTEGRANTE_SOLICITUD | Sustituye funcionalmente la tabla ancha actual: una fila por solicitud y puesto de participación, con la persona y los datos históricos correspondientes. |

No se propone crear ocho tablas nuevas: se agregan tres tablas de configuración, se adapta la solicitud y se migra la tabla ancha a un detalle normalizado; se reutilizan los catálogos existentes.

## Ejemplos

Una ruta versión 1 de un dispensario tendría estas filas en ETAPA_LINEA_MANDO:

| Orden | Unidad participante |
|---|---|
| 1 | Dispensario médico solicitante |
| 2 | Dirección de Sanidad correspondiente |
| 3 | Comando de Personal correspondiente |
| 4 | Comando correspondiente |

Una ruta versión 1 de una CENAC tendría:

| Orden | Unidad participante |
|---|---|
| 1 | CENAC solicitante |
| 2 | Comando Logístico correspondiente |
| 3 | Dirección Financiera correspondiente |
| 4 | Comando correspondiente |

Los registros deben apuntar a los identificadores reales de las unidades, no almacenar esas denominaciones como sustituto de las claves foráneas.

Cada etapa admite tantos puestos de participación como requiera el procedimiento. Una etapa puede requerir solamente a su director; otra, al responsable técnico y al comandante. Los cargos de estos ejemplos son ilustrativos y no constituyen una definición normativa.

## Integrantes e histórico

En lugar de columnas como `grado_cte_batallon` y `grado_cte_div`, el detalle tendrá los campos comunes `grado`, `nombres`, `primer_apellido`, `segundo_apellido`, `cargo_texto` y `firma_archivo_versionado`.

La relación con CARGO_ETAPA_LINEA permite conocer a qué etapa, unidad y puesto pertenece cada persona. Por definición del usuario, HISTORIAL_INTEGRANTE_DOCUMENTO es una tabla paramétrica y no se relaciona con las solicitudes ni con INTEGRANTE_SOLICITUD. Se elimina del detalle la FK id_historial_integrante_documentos. El catálogo puede consultarse para seleccionar y copiar datos, sin guardar una referencia relacional hacia él.

Se recomienda copiar los datos de presentación de la persona, unidad y firma en el detalle y congelarlos al confirmar/emitir el documento. Un documento ya emitido no debe tomar el nombre, grado o firma «actual» del catálogo al volver a generarse. El archivo de firma también debe conservarse: reutilizar una ruta cuyo contenido se sobrescribe no preserva el histórico.

El backend valida que exista un solo participante por puesto en cada solicitud, comprobando `id_solicitud_infraestructura` e `id_cargo_etapa`. No se declara una restricción de unicidad para esa combinación. Si posteriormente se requieren varias revisiones del documento o sustituciones después de su emisión, se deberá añadir una versión documental o una tabla de eventos; no sobrescribir el registro histórico.

Una imagen de firma almacenada no representa por sí sola un evento de aprobación. Si se requiere controlar avales, deben registrarse además el usuario, fecha, decisión y observación en un historial de actuaciones, separado de los datos impresos del firmante.

## Reglas de integridad

El modelo conserva las PK y FK. Por definición del usuario, los controles de no repetición de combinaciones se realizan en el backend; no se proponen restricciones UQ para este caso.

1. Todas las referencias del diagrama deben convertirse en claves foráneas. En el DDL suministrado no aparece una FK para `id_solicitud_infraestructura`; hay que comprobar si está declarada por separado.
2. Validar en el backend que no se repita una versión por unidad de origen en LINEA_MANDO; una unidad o un orden dentro de la misma línea en ETAPA_LINEA_MANDO; un orden de firma dentro de la misma etapa en CARGO_ETAPA_LINEA; ni un participante para el mismo puesto y solicitud en INTEGRANTE_SOLICITUD. Estas comprobaciones no generan restricciones adicionales de unicidad en las tablas.
3. Validar que los órdenes sean positivos, que no existan saltos al publicar y que la primera etapa sea la unidad de origen. No se permiten unidades repetidas en este modelo de ruta secuencial sin ciclos.
4. Impedir en el backend vigencias superpuestas de rutas publicadas para la misma unidad de origen. Ejecutar las comprobaciones y escrituras de forma transaccional, coordinando operaciones concurrentes sobre la misma configuración.
5. Al asignar la ruta a una solicitud, comprobar en el backend que su unidad de origen coincida con la solicitante. Al registrar un integrante, comprobar que su puesto pertenezca a esa misma versión de ruta. Las FK individuales garantizan la existencia de los registros referenciados; las coincidencias entre ellos se validan transaccionalmente en el backend.
6. Si se usa el catálogo paramétrico para completar los datos, comprobar en ese momento que la persona corresponda a la unidad y cargo del puesto y sea válida para la fecha aplicable. Copiar los datos personales y conservar el archivo de firma de forma independiente, sin FK al historial. Los cambios posteriores del catálogo no modifican la solicitud.
7. Congelar la versión de ruta utilizada; los cambios de estructura generan una versión nueva. No recalcular automáticamente las rutas de solicitudes existentes a partir de la configuración vigente.
8. Conservar los catálogos referenciados por solicitudes históricas; usar estados de inactividad en lugar de borrados en cascada.

El alcance inicial es una ruta secuencial por unidad para solicitudes de infraestructura. Si una misma unidad tiene recorridos diferentes por tipo de solicitud, añadir ese ámbito a LINEA_MANDO y a las reglas de selección, control de duplicados y vigencia del backend. Si se requieren ramas paralelas o decisiones condicionales, el modelo debe ampliarse con transiciones entre etapas.

## Migración recomendada

Crear la nueva estructura en paralelo y convertir cada bloque de seis columnas no vacío de la tabla actual en una fila de integrante. Identificar la unidad concreta y el cargo de cada bloque antes de asociarlo a una etapa: el sufijo «brigada» o «división» no identifica por sí solo qué unidad era.

Mantener una correspondencia de origen `(id_registro_antiguo, sufijo_del_puesto)` durante la migración para detectar omisiones y duplicados. Preservar datos de personas y archivos de firma, incluso registros incompletos que requieran revisión. Los casos cuya ruta histórica no pueda reconstruirse deben quedar señalados para revisión, sin inventar la asociación ni tomar automáticamente la estructura actual.

Comparar solicitudes y documentos antes y después. Solo una vez validados los datos y autorizada la implementación se adaptarán DTO, servicios, pantallas y generación de documentos. No se recomienda eliminar ni transformar destructivamente la tabla actual como primer paso.
