# Correspondencia de campos del diagrama

Cada propiedad de las cuatro interfaces existentes aparece una vez en el diagrama. Los nombres snake_case son lógicos, no nombres físicos confirmados de Oracle.

| Entidad | Propiedad de la interfaz | Campo lógico del diagrama |
|---|---|---|
| UNIDAD_MILITAR | idUnidadMilitar | id_unidad_militar |
| UNIDAD_MILITAR | codigoUnidadMilitar | codigo_unidad_militar |
| UNIDAD_MILITAR | nombreUnidadMilitar | nombre_unidad_militar |
| UNIDAD_MILITAR | siglaoAcronimoUnidadMilitar | siglao_acronimo_unidad_militar |
| UNIDAD_MILITAR | nombreArchivoFotoLogExtoFmtUnidadMilitar | nombre_archivo_foto_log_exto_fmt_unidad_militar |
| UNIDAD_MILITAR | nombreCarpetaAlmacenamientoUnidadMilitar | nombre_carpeta_almacenamiento_unidad_militar |
| UNIDAD_MILITAR | nivelUnidadMilitar | nivel_unidad_militar |
| CARGO_INTEGRANTE_DOCUMENTO | idCargoIntegranteDocumentos | id_cargo_integrante_documentos |
| CARGO_INTEGRANTE_DOCUMENTO | nombreCargoIntegranteDocumentos | nombre_cargo_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | idHistorialIntegranteDocumentos | id_historial_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | numRegHistorialIntegranteDocumentos | num_reg_historial_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | unidadMilitarDTO | id_unidad_militar |
| HISTORIAL_INTEGRANTE_DOCUMENTO | gradoIntegranteDocumentos | grado_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | nombresYApellidosIntegranteDocumentos | nombres_y_apellidos_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | cargoIntegranteDocumentos | cargo_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | tipoDocumentoIdentificacionDTO | id_tipo_documento_identificacion |
| HISTORIAL_INTEGRANTE_DOCUMENTO | numeroDocumentoIdentificacionIntegranteDocumentos | numero_documento_identificacion_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | nombreArchivoFotoFirmaIntegranteDocumentos | nombre_archivo_foto_firma_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | cargoIntegranteDocumentosDTO | id_cargo_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | siONoIntegranteDocumentos | si_o_no_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | siONoActualIntegranteDocumentosPredeterminado | si_o_no_actual_integrante_documentos_predeterminado |
| HISTORIAL_INTEGRANTE_DOCUMENTO | numeroCursoIntegranteDocumentos | numero_curso_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | puestoCursoIntegranteDocumentos | puesto_curso_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | escalafonAntiguedadIntegranteDocumentos | escalafon_antiguedad_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | fechaHMSIngresoIntegranteDocumentos | fecha_hms_ingreso_integrante_documentos |
| HISTORIAL_INTEGRANTE_DOCUMENTO | fechaHMSModificacionIntegranteDocumentos | fecha_hms_modificacion_integrante_documentos |
| SOLICITUD_INFRAESTRUCTURA | idSolicitudInfraestructura | id_solicitud_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | codigoRadicadoSolicitudInfraestructura | codigo_radicado_solicitud_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | unidadMilitarDTO | id_unidad_militar |
| SOLICITUD_INFRAESTRUCTURA | fechaHMSSolicitudInfraestructura | fecha_hms_solicitud_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | tipoSolicitudInfraestructuraDTO | id_tipo_solicitud_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | nombreSolicitudInfraestructura | nombre_solicitud_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | infraestructuraDTO | id_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | nombreDependenciaSolicitudInfraestructura | nombre_dependencia_solicitud_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | numeroFuncionariosSolicitudInfraestructura | numero_funcionarios_solicitud_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | numeroUsuariosSolicitudInfraestructura | numero_usuarios_solicitud_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | observacionesJuridicasEstadoPredioInfraestructura | observaciones_juridicas_estado_predio_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | observacionesEstadoAmbientalInfraestructura | observaciones_estado_ambiental_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | justificacionNecesidadInfraestructura | justificacion_necesidad_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | descripcionGeneralNecesidadInfraestructura | descripcion_general_necesidad_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | descripcionImpactoEsperadoInfraestructura | descripcion_impacto_esperado_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | fechaHMSIngresoSolicitudInfraestructura | fecha_hms_ingreso_solicitud_infraestructura |
| SOLICITUD_INFRAESTRUCTURA | fechaHMSModificacionSolicitudInfraestructura | fecha_hms_modificacion_solicitud_infraestructura |

La solicitud agrega id_linea_mando como nueva FK. Las cuatro entidades propuestas se muestran completas en el PNG.
Se mantienen PK y FK. Los controles de duplicados de versiones, unidades, órdenes y puestos se realizan en el backend, sin restricciones adicionales de unicidad en este modelo.
HISTORIAL_INTEGRANTE_DOCUMENTO es paramétrica: no existe FK desde solicitudes ni desde INTEGRANTE_SOLICITUD hacia ella. Los datos personales y la firma se conservan como copia histórica independiente.
Las referencias FK* pertenecen a catálogos fuera del ámbito de líneas de mando y se identifican explícitamente al pie del diagrama.
No se infieren tipos Oracle ni nulabilidad de las propiedades TypeScript. El DDL de las tablas existentes debe verificarse antes de implementar.
