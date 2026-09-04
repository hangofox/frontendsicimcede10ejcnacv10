//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 01/08/2023.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS RESPONSE DE LOS DTO.
public class RespuestaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE RESPUESTA DEL DTO:
    private ActividadProductoInfraestructuraDTO actividadProductoInfraestructuraDTO;
    private ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO;
    private ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO;
    private AseguradoraDTO aseguradoraDTO;
    private AseguramientoEquipoIngenieroDTO aseguramientoEquipoIngenieroDTO;
    private AseguramientoLineaBlancaDTO aseguramientoLineaBlancaDTO;
    private CaninoDTO caninoDTO;
    private CapituloInfraestructuraDTO capituloInfraestructuraDTO;
    private CargoIntegranteDocumentosDTO cargoIntegranteDocumentosDTO;
    private CentroCostoCompaniaUnidadMilitarDTO centroCostoCompaniaUnidadMilitarDTO;
    private CentroCostoOficinaDTO centroCostoOficinaDTO;
    private CentroCostoPelotonUnidadMilitarDTO centroCostoPelotonUnidadMilitarDTO;
    private CentroCostoUnidadMilitarDTO centroCostoUnidadMilitarDTO;
    private CiudadMundoDTO ciudadMundoDTO;
    private ClasificacionEquipoIngenieroDTO clasificacionEquipoIngenieroDTO;
    private ClaseActivoEquipoIngenieroDTO claseActivoEquipoIngenieroDTO;
    private ComodatoTerrenoDTO comodatoTerrenoDTO;
    private CompaniaUnidadMilitarDTO companiaUnidadMilitarDTO;
    private ContratoProyeccionSeguroInfraestructuraDTO contratoProyeccionSeguroInfraestructuraDTO;
    private ContribucionSaneamientoBasicoDTO contribucionSaneamientoBasicoDTO;
    private CuentaEquipoIngenieroDTO cuentaEquipoIngenieroDTO;
    private DepartamentooEstadoMundoDTO departamentooEstadoMundoDTO;
    private DestinacionMantenimientoCdoIngDTO destinacionMantenimientoCdoIngDTO;
    private DocumentacionAnexaAltaEquipoIngenieroDTO documentacionAnexaAltaEquipoIngenieroDTO;
    private DocumentacionAnexaBajaEquipoIngenieroDTO documentacionAnexaBajaEquipoIngenieroDTO;
    private DocumentacionAnexaContratInfraestArrendDTO documentacionAnexaContratInfraestArrendDTO;
    private DocumentacionAnexaCotizInfraestArrendDTO documentacionAnexaCotizInfraestArrendDTO;
    private DocumentacionAnexaCotizProyPlAnAdqCdoIngDTO documentacionAnexaCotizProyPlAnAdqCdoIngDTO;
    private DocumentacionAnexaCotizProySoatLinBlancDTO documentacionAnexaCotizProySoatLinBlancDTO;
    private DocumentacionAnexaSolicInfraestDTO documentacionAnexaSolicInfraestDTO;
    private ElementoSubclasificacionEquipoIngenieroDTO elementoSubclasificacionEquipoIngenieroDTO;
    private EquipoIngenieroDTO equipoIngenieroDTO;
    private EquipoTopografiaDTO equipoTopografiaDTO;
    private EstadoDiagnosticoEquipoIngenieroDTO estadoDiagnosticoEquipoIngenieroDTO;
    private EstadoTerrenoDTO estadoTerrenoDTO;
    private FotografiaAnexaApoyAtencPrevEmergDesastDTO fotografiaAnexaApoyAtencPrevEmergDesastDTO;
    private FotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO fotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO;
    private FotografiaAnexaSolicInfraestDTO fotografiaAnexaSolicInfraestDTO;
    private FuncionalidadDTO funcionalidadDTO;
    private FuncionalidadInfraestructuraDTO funcionalidadInfraestructuraDTO;
    private GerenteProyectoSolicInfraestDTO gerenteProyectoSolicInfraestDTO;
    private GradoSiathDTO gradoSiathDTO;
    private HistorialControlAvancObrRedMitigGestRiesgDesastDTO historialControlAvancObrRedMitigGestRiesgDesastDTO;
    private HistorialDemeritoYDesgasteEquipoIngenieroDTO historialDemeritoYDesgasteEquipoIngenieroDTO;
    private HistorialDiagnosticoInicialSeleccMttoEquipIngDTO historialDiagnosticoInicialSeleccMttoEquipIngDTO;
    private HistorialEquipTranspApoyAtencPrevEmergDesastDTO historialEquipTranspApoyAtencPrevEmergDesastDTO;
    private HistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO historialEquipTranspApoyObrRedMitigGestRiesgDesastDTO;
    private HistorialIntegranteDocumentosDTO historialIntegranteDocumentosDTO;
    private HistorialMantenimientoEquipoIngenieroDTO historialMantenimientoEquipoIngenieroDTO;
    private HistorialMantenimientoInfraestructuraDTO historialMantenimientoInfraestructuraDTO;
    private HistorialMaqPesadApoyAtencPrevEmergDesastDTO historialMaqPesadApoyAtencPrevEmergDesastDTO;
    private HistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO historialMaqPesadApoyObrRedMitigGestRiesgDesastDTO;
    private HistorialOrdenApoyoMovimientoTropaDTO historialOrdenApoyoMovimientoTropaDTO;
    private HistorialPagoAnualImpuestoTerrenoDTO historialPagoAnualImpuestoTerrenoDTO;
    private HistorialProveedorProductoOServicioDTO historialProveedorProductoOServicioDTO;
    private HistorialProyeccionAnualAdqPapeleriaDTO historialProyeccionAnualAdqPapeleriaDTO;
    private HistorialProyeccionAnualAdqServPublicDTO historialProyeccionAnualAdqServPublicDTO;
    private HistorialProyeccionAnualAseoLimpInfraestDTO historialProyeccionAnualAseoLimpInfraestDTO;
    private HistorialProyeccionAnualMultaYSancionatoriaDTO historialProyeccionAnualMultaYSancionatoriaDTO;
    private HistorialProyeccionMunicionEspecialDTO historialProyeccionMunicionEspecialDTO;
    private HistorialQuimicoPiscinaInfraestDTO historialQuimicoPiscinaInfraestDTO;
    private HistorialResponsableInfraestructuraDTO historialResponsableInfraestructuraDTO;
    private HistorialTipoPersonalApoyAtencPrevEmergDesastDTO historialTipoPersonalApoyAtencPrevEmergDesastDTO;
    private HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO historialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO;
    private InclusionSeguroEquipoIngenieroDTO inclusionSeguroEquipoIngenieroDTO;
    private InclusionSeguroInfraestructuraDTO inclusionSeguroInfraestructuraDTO;
    private InclusionSeguroLineaBlancaDTO inclusionSeguroLineaBlancaDTO;
    private InformacionFinancieraSolicitudInfraestructuraDTO informacionFinancieraSolicitudInfraestructuraDTO;
    private InfraestructuraDTO infraestructuraDTO;
    private InfraestructuraArrendadaDTO infraestructuraArrendadaDTO;
    private IntegrantesApoyosAtencPrevEmergDesastDTO integrantesApoyosAtencPrevEmergDesastDTO;
    private IntegrantesApoyosObrRedMitigGestRiesgDesastDTO integrantesApoyosObrRedMitigGestRiesgDesastDTO;
    private IntegrantesSolicitudesInfraestructuraDTO integrantesSolicitudesInfraestructuraDTO;
    private LineaEquipoIngenieroDTO lineaEquipoIngenieroDTO;
    private MaquinariaPesadaDTO maquinariaPesadaDTO;
    private MaterialTecnicoDTO materialTecnicoDTO;
    private MunicionEspecialDTO municionEspecialDTO;
    private NivelMantenimientoEquipoIngenieroDTO nivelMantenimientoEquipoIngenieroDTO;
    private OficinaDTO oficinaDTO;
    private PaisMundoDTO paisMundoDTO;
    private ParametrosSistemaDTO parametrosSistemaDTO;
    private PelotonUnidadMilitarDTO pelotonUnidadMilitarDTO;
    private PersonalMantenimientoEquipoIngenieroDTO personalMantenimientoEquipoIngenieroDTO;
    private PrivilegyRestriccAccesoUsuarioDTO privilegyRestriccAccesoUsuarioDTO;
    private ProcesoApoyoAtencionPrevencionDTO procesoApoyoAtencionPrevencionDTO;
    private ProveedorProductoOServicioDTO proveedorProductoOServicioDTO;
    private ProyeccionPlanAnualAdqCdoIngDTO proyeccionPlanAnualAdqCdoIngDTO;
    private ProyeccionPlanAnualAdqEquipFijIngDTO proyeccionPlanAnualAdqEquipFijIngDTO;
    private ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO;
    private ProyeccionPlanAnualAdqInfraestDTO proyeccionPlanAnualAdqInfraestDTO;
    private ProyeccionPlanAnualArrendamientoDTO proyeccionPlanAnualArrendamientoDTO;
    private ProyeccionPlanAnualAsegBienDTO proyeccionPlanAnualAsegBienDTO;
    private ProyeccionPlanAnualEquipSubsDTO proyeccionPlanAnualEquipSubsDTO;
    private ProyeccionPlanAnualPozoDTO proyeccionPlanAnualPozoDTO;
    private ProyeccionSeguroInfraestructuraDTO proyeccionSeguroInfraestructuraDTO;
    private ProyeccionSoatLineaBlancaDTO proyeccionSoatLineaBlancaDTO;
    private ProyeccionTecnicomecanicaEquipTranspDTO proyeccionTecnicomecanicaEquipTranspDTO;
    private QuimicoPiscinaDTO quimicoPiscinaDTO;
    private RazaCaninoDTO razaCaninoDTO;
    private RecuperacionContrasenaAccesoUsuarioDTO recuperacionContrasenaAccesoUsuarioDTO;
    private RegionDaneColombiaDTO regionDaneColombiaDTO;
    private ResponsableDTO responsableDTO;
    private RolDTO rolDTO;
    private SaneamientoBasicoDTO saneamientoBasicoDTO;
    private SeguroDTO seguroDTO;
    private SociedadUnidadCentralizadoraDTO sociedadUnidadCentralizadoraDTO;
    private SolicitudInfraestructuraDTO solicitudInfraestructuraDTO;
    private SubclasificacionEquipoIngenieroDTO subclasificacionEquipoIngenieroDTO;
    private SuministroDemeritoYDesgasteEquipoIngenieroDTO suministroDemeritoYDesgasteEquipoIngenieroDTO;
    private TerrenoDTO terrenoDTO;
    private TipoActividadExpEquipHerrYPerrDispArtefExpDTO tipoActividadExpEquipHerrYPerrDispArtefExpDTO;
    private TipoAltaEquipoIngenieroDTO tipoAltaEquipoIngenieroDTO;
    private TipoContratoSeguroInfraestructuraDTO tipoContratoSeguroInfraestructuraDTO;
    private TipoContribucionSaneamientoBasicoDTO tipoContribucionSaneamientoBasicoDTO;
    private TipoDespejeArtefactoExplosivoDTO tipoDespejeArtefactoExplosivoDTO;
    private TipoDespejeMilitarArtefactoExplosivoDTO tipoDespejeMilitarArtefactoExplosivoDTO;
    private TipoDocumentoAnexoAltaEquipoIngenieroDTO tipoDocumentoAnexoAltaEquipoIngenieroDTO;
    private TipoDocumentoAnexoBajaEquipoIngenieroDTO tipoDocumentoAnexoBajaEquipoIngenieroDTO;
    private TipoDocumentoAnexoSolicInfraestDTO tipoDocumentoAnexoSolicInfraestDTO;
    private TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO;
    private TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO;
    private TipoEntidadInstitucionalDTO tipoEntidadInstitucionalDTO;
    private TipoEstructuraInfraestructuraDTO tipoEstructuraInfraestructuraDTO;
    private TipoEstructuraInfraestructuraArrendadaDTO tipoEstructuraInfraestructuraArrendadaDTO;
    private TipoEventoApoyoRealizadoDTO tipoEventoApoyoRealizadoDTO;
    private TipoFuenteFinanciacionDTO tipoFuenteFinanciacionDTO;
    private TipoMantenimientoEquipoIngenieroDTO tipoMantenimientoEquipoIngenieroDTO;
    private TipoMantenimientoInfraestructuraDTO tipoMantenimientoInfraestructuraDTO;
    private TipoMantenimientoPozoDTO tipoMantenimientoPozoDTO;
    private TipoPersonalApoyoDTO tipoPersonalApoyoDTO;
    private TipoReduccionImpuestoTerrenoDTO tipoReduccionImpuestoTerrenoDTO;
    private TipoRequerimientoApoyoAtencionPrevencionDTO tipoRequerimientoApoyoAtencionPrevencionDTO;
    private TipoResponsabilidadContractualDTO tipoResponsabilidadContractualDTO;
    private TipoSeguroDTO tipoSeguroDTO;
    private TipoServicioPublicoDTO tipoServicioPublicoDTO;
    private TipoSolicitudInfraestructuraDTO tipoSolicitudInfraestructuraDTO;
    private TipoUsuarioDTO tipoUsuarioDTO;
    //private TokenAutenticacionUsuarioDTO tokenAutenticacionUsuarioDTO;
    private TokenCodigoActivacionRecuperacionContrasenaDTO tokenCodigoActivacionRecuperacionContrasenaDTO;
    private UnidadMilitarDTO unidadMilitarDTO;
    private UnidadMilitarRealizadoraMantenimientoDTO unidadMilitarRealizadoraMantenimientoDTO;
    private UnidadMedidaDTO unidadMedidaDTO;
    private UsuarioDTO usuarioDTO;
    private String mensaje;
    private boolean banderaexito;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DE LAS VARIABLES DE RESPUESTA DECLARADAS DEL DTO Y LOS MENSAJES GENERADOS POR LOS CRUDS
    //QUE SON LOS METODOS PARA LA CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO:
    public ActividadProductoInfraestructuraDTO getActividadProductoInfraestructuraDTO() {
        return actividadProductoInfraestructuraDTO;
    }
    public void setActividadProductoInfraestructuraDTO(ActividadProductoInfraestructuraDTO actividadProductoInfraestructuraDTO) {
        this.actividadProductoInfraestructuraDTO = actividadProductoInfraestructuraDTO;
    }
    public ApoyoAtencPrevEmergDesastDTO getApoyoAtencPrevEmergDesastDTO() {
        return apoyoAtencPrevEmergDesastDTO;
    }
    public void setApoyoAtencPrevEmergDesastDTO(ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO) {
        this.apoyoAtencPrevEmergDesastDTO = apoyoAtencPrevEmergDesastDTO;
    }
    public ApoyoObrRedMitigGestRiesgDesastDTO getApoyoObrRedMitigGestRiesgDesastDTO() {
        return apoyoObrRedMitigGestRiesgDesastDTO;
    }
    public void setApoyoObrRedMitigGestRiesgDesastDTO(ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO) {
        this.apoyoObrRedMitigGestRiesgDesastDTO = apoyoObrRedMitigGestRiesgDesastDTO;
    }
    public AseguradoraDTO getAseguradoraDTO() {
        return aseguradoraDTO;
    }
    public void setAseguradoraDTO(AseguradoraDTO aseguradoraDTO) {
        this.aseguradoraDTO = aseguradoraDTO;
    }
    public AseguramientoEquipoIngenieroDTO getAseguramientoEquipoIngenieroDTO() {
        return aseguramientoEquipoIngenieroDTO;
    }
    public void setAseguramientoEquipoIngenieroDTO(AseguramientoEquipoIngenieroDTO aseguramientoEquipoIngenieroDTO) {
        this.aseguramientoEquipoIngenieroDTO = aseguramientoEquipoIngenieroDTO;
    }
    public AseguramientoLineaBlancaDTO getAseguramientoLineaBlancaDTO() {
        return aseguramientoLineaBlancaDTO;
    }
    public void setAseguramientoLineaBlancaDTO(AseguramientoLineaBlancaDTO aseguramientoLineaBlancaDTO) {
        this.aseguramientoLineaBlancaDTO = aseguramientoLineaBlancaDTO;
    }
    public CaninoDTO getCaninoDTO() {
        return caninoDTO;
    }
    public void setCaninoDTO(CaninoDTO caninoDTO) {
        this.caninoDTO = caninoDTO;
    }
    public CapituloInfraestructuraDTO getCapituloInfraestructuraDTO() {
        return capituloInfraestructuraDTO;
    }
    public void setCapituloInfraestructuraDTO(CapituloInfraestructuraDTO capituloInfraestructuraDTO) {
        this.capituloInfraestructuraDTO = capituloInfraestructuraDTO;
    }
    public CargoIntegranteDocumentosDTO getCargoIntegranteDocumentosDTO() {
        return cargoIntegranteDocumentosDTO;
    }
    public void setCargoIntegranteDocumentosDTO(CargoIntegranteDocumentosDTO cargoIntegranteDocumentosDTO) {
        this.cargoIntegranteDocumentosDTO = cargoIntegranteDocumentosDTO;
    }
    public CentroCostoCompaniaUnidadMilitarDTO getCentroCostoCompaniaUnidadMilitarDTO() {
        return centroCostoCompaniaUnidadMilitarDTO;
    }
    public void setCentroCostoCompaniaUnidadMilitarDTO(CentroCostoCompaniaUnidadMilitarDTO centroCostoCompaniaUnidadMilitarDTO) {
        this.centroCostoCompaniaUnidadMilitarDTO = centroCostoCompaniaUnidadMilitarDTO;
    }
    public CentroCostoOficinaDTO geCentroCostoOficinaDTO() {
        return centroCostoOficinaDTO;
    }
    public void setCentroCostoOficinaDTO(CentroCostoOficinaDTO centroCostoOficinaDTO) {
        this.centroCostoOficinaDTO = centroCostoOficinaDTO;
    }
    public CentroCostoPelotonUnidadMilitarDTO getCentroCostoPelotonUnidadMilitarDTO() {
        return centroCostoPelotonUnidadMilitarDTO;
    }
    public void setCentroCostoPelotonUnidadMilitarDTO(CentroCostoPelotonUnidadMilitarDTO centroCostoPelotonUnidadMilitarDTO) {
        this.centroCostoPelotonUnidadMilitarDTO = centroCostoPelotonUnidadMilitarDTO;
    }
    public CentroCostoUnidadMilitarDTO getCentroCostoUnidadMilitarDTO() {
        return centroCostoUnidadMilitarDTO;
    }
    public void setCentroCostoUnidadMilitarDTO(CentroCostoUnidadMilitarDTO centroCostoUnidadMilitarDTO) {
        this.centroCostoUnidadMilitarDTO = centroCostoUnidadMilitarDTO;
    }
    public CiudadMundoDTO geCiudadMundoDTO() {
        return ciudadMundoDTO;
    }
    public void setCiudadMundoDTO(CiudadMundoDTO ciudadMundoDTO) {
        this.ciudadMundoDTO = ciudadMundoDTO;
    }
    public ClaseActivoEquipoIngenieroDTO getClaseActivoEquipoIngenieroDTO() {
        return claseActivoEquipoIngenieroDTO;
    }
    public void setClaseActivoEquipoIngenieroDTO(ClaseActivoEquipoIngenieroDTO claseActivoEquipoIngenieroDTO) {
        this.claseActivoEquipoIngenieroDTO = claseActivoEquipoIngenieroDTO;
    }
    public ClasificacionEquipoIngenieroDTO geClasificacionEquipoIngenieroDTO() {
        return clasificacionEquipoIngenieroDTO;
    }
    public void setClasificacionEquipoIngenieroDTO(ClasificacionEquipoIngenieroDTO clasificacionEquipoIngenieroDTO) {
        this.clasificacionEquipoIngenieroDTO = clasificacionEquipoIngenieroDTO;
    }
    public ComodatoTerrenoDTO getComodatoTerrenoDTO() {
        return comodatoTerrenoDTO;
    }
    public void setComodatoTerrenoDTO(ComodatoTerrenoDTO comodatoTerrenoDTO) {
        this.comodatoTerrenoDTO = comodatoTerrenoDTO;
    }
    public CompaniaUnidadMilitarDTO getCompaniaUnidadMilitarDTO() {
        return companiaUnidadMilitarDTO;
    }
    public void setCompaniaUnidadMilitarDTO(CompaniaUnidadMilitarDTO companiaUnidadMilitarDTO) {
        this.companiaUnidadMilitarDTO = companiaUnidadMilitarDTO;
    }
    public ContratoProyeccionSeguroInfraestructuraDTO getContratoProyeccionSeguroInfraestructuraDTO() {
        return contratoProyeccionSeguroInfraestructuraDTO;
    }
    public void setContratoProyeccionSeguroInfraestructuraDTO(ContratoProyeccionSeguroInfraestructuraDTO contratoProyeccionSeguroInfraestructuraDTO) {
        this.contratoProyeccionSeguroInfraestructuraDTO = contratoProyeccionSeguroInfraestructuraDTO;
    }
    public ContribucionSaneamientoBasicoDTO getContribucionSaneamientoBasicoDTO() {
        return contribucionSaneamientoBasicoDTO;
    }
    public void setContribucionSaneamientoBasicoDTO(ContribucionSaneamientoBasicoDTO contribucionSaneamientoBasicoDTO) {
        this.contribucionSaneamientoBasicoDTO = contribucionSaneamientoBasicoDTO;
    }
    public CuentaEquipoIngenieroDTO geCuentaEquipoIngenieroDTO() {
        return cuentaEquipoIngenieroDTO;
    }
    public void setCuentaEquipoIngenieroDTO(CuentaEquipoIngenieroDTO cuentaEquipoIngenieroDTO) {
        this.cuentaEquipoIngenieroDTO = cuentaEquipoIngenieroDTO;
    }
    public DepartamentooEstadoMundoDTO geDepartamentooEstadoMundoDTO() {
        return departamentooEstadoMundoDTO;
    }
    public void setDepartamentooEstadoMundoDTO(DepartamentooEstadoMundoDTO departamentooEstadoMundoDTO) {
        this.departamentooEstadoMundoDTO = departamentooEstadoMundoDTO;
    }
    public DestinacionMantenimientoCdoIngDTO getDestinacionMantenimientoCdoIngDTO() {
        return destinacionMantenimientoCdoIngDTO;
    }
    public void setDestinacionMantenimientoCdoIngDTO(DestinacionMantenimientoCdoIngDTO destinacionMantenimientoCdoIngDTO) {
        this.destinacionMantenimientoCdoIngDTO = destinacionMantenimientoCdoIngDTO;
    }
    public DocumentacionAnexaContratInfraestArrendDTO getDocumentacionAnexaContratInfraestArrendDTO() {
        return documentacionAnexaContratInfraestArrendDTO;
    }
    public void setDocumentacionAnexaAltaEquipoIngenieroDTO(DocumentacionAnexaAltaEquipoIngenieroDTO documentacionAnexaAltaEquipoIngenieroDTO) {
        this.documentacionAnexaAltaEquipoIngenieroDTO = documentacionAnexaAltaEquipoIngenieroDTO;
    }
    public DocumentacionAnexaAltaEquipoIngenieroDTO getDocumentacionAnexaAltaEquipoIngenieroDTO() {
        return documentacionAnexaAltaEquipoIngenieroDTO;
    }
    public void setDocumentacionAnexaBajaEquipoIngenieroDTO(DocumentacionAnexaBajaEquipoIngenieroDTO documentacionAnexaBajaEquipoIngenieroDTO) {
        this.documentacionAnexaBajaEquipoIngenieroDTO = documentacionAnexaBajaEquipoIngenieroDTO;
    }
    public DocumentacionAnexaBajaEquipoIngenieroDTO getDocumentacionAnexaBajaEquipoIngenieroDTO() {
        return documentacionAnexaBajaEquipoIngenieroDTO;
    }
    public void setDocumentacionAnexaContratInfraestArrendDTO(DocumentacionAnexaContratInfraestArrendDTO documentacionAnexaContratInfraestArrendDTO) {
        this.documentacionAnexaContratInfraestArrendDTO = documentacionAnexaContratInfraestArrendDTO;
    }
    public DocumentacionAnexaCotizInfraestArrendDTO getDocumentacionAnexaCotizInfraestArrendDTO() {
        return documentacionAnexaCotizInfraestArrendDTO;
    }
    public void setDocumentacionAnexaCotizInfraestArrendDTO(DocumentacionAnexaCotizInfraestArrendDTO documentacionAnexaCotizInfraestArrendDTO) {
        this.documentacionAnexaCotizInfraestArrendDTO = documentacionAnexaCotizInfraestArrendDTO;
    }
    public DocumentacionAnexaCotizProyPlAnAdqCdoIngDTO getDocumentacionAnexaCotizProyPlAnAdqCdoIngDTO() {
        return documentacionAnexaCotizProyPlAnAdqCdoIngDTO;
    }
    public void setDocumentacionAnexaCotizProyPlAnAdqCdoIngDTO(DocumentacionAnexaCotizProyPlAnAdqCdoIngDTO documentacionAnexaCotizProyPlAnAdqCdoIngDTO) {
        this.documentacionAnexaCotizProyPlAnAdqCdoIngDTO = documentacionAnexaCotizProyPlAnAdqCdoIngDTO;
    }
    public DocumentacionAnexaCotizProySoatLinBlancDTO getDocumentacionAnexaCotizProySoatLinBlancDTO() {
        return documentacionAnexaCotizProySoatLinBlancDTO;
    }
    public void setDocumentacionAnexaCotizProySoatLinBlancDTO(DocumentacionAnexaCotizProySoatLinBlancDTO documentacionAnexaCotizProySoatLinBlancDTO) {
        this.documentacionAnexaCotizProySoatLinBlancDTO = documentacionAnexaCotizProySoatLinBlancDTO;
    }
    public DocumentacionAnexaSolicInfraestDTO getDocumentacionAnexaSolicInfraestDTO() {
        return documentacionAnexaSolicInfraestDTO;
    }
    public void setDocumentacionAnexaSolicInfraestDTO(DocumentacionAnexaSolicInfraestDTO documentacionAnexaSolicInfraestDTO) {
        this.documentacionAnexaSolicInfraestDTO = documentacionAnexaSolicInfraestDTO;
    }
    public ElementoSubclasificacionEquipoIngenieroDTO getElementoSubclasificacionEquipoIngenieroDTO() {
        return elementoSubclasificacionEquipoIngenieroDTO;
    }
    public void setElementoSubclasificacionEquipoIngenieroDTO(ElementoSubclasificacionEquipoIngenieroDTO elementoSubclasificacionEquipoIngenieroDTO) {
        this.elementoSubclasificacionEquipoIngenieroDTO = elementoSubclasificacionEquipoIngenieroDTO;
    }
    public EquipoIngenieroDTO getEquipoIngenieroDTO() {
        return equipoIngenieroDTO;
    }
    public void setEquipoIngenieroDTO(EquipoIngenieroDTO equipoIngenieroDTO) {
        this.equipoIngenieroDTO = equipoIngenieroDTO;
    }
    public EquipoTopografiaDTO getEquipoTopografiaDTO() {
        return equipoTopografiaDTO;
    }
    public void setEquipoTopografiaDTO(EquipoTopografiaDTO equipoTopografiaDTO) {
        this.equipoTopografiaDTO = equipoTopografiaDTO;
    }
    public EstadoDiagnosticoEquipoIngenieroDTO getEstadoDiagnosticoEquipoIngenieroDTO() {
        return estadoDiagnosticoEquipoIngenieroDTO;
    }
    public void setEstadoDiagnosticoEquipoIngenieroDTO(EstadoDiagnosticoEquipoIngenieroDTO estadoDiagnosticoEquipoIngenieroDTO) {
        this.estadoDiagnosticoEquipoIngenieroDTO = estadoDiagnosticoEquipoIngenieroDTO;
    }
    public EstadoTerrenoDTO geEstadoTerrenoDTO() {
        return estadoTerrenoDTO;
    }
    public void setEstadoTerrenoDTO(EstadoTerrenoDTO estadoTerrenoDTO) {
        this.estadoTerrenoDTO = estadoTerrenoDTO;
    }
    public FotografiaAnexaApoyAtencPrevEmergDesastDTO getFotografiaAnexaApoyAtencPrevEmergDesastDTO() {
        return fotografiaAnexaApoyAtencPrevEmergDesastDTO;
    }
    public void setFotografiaAnexaApoyAtencPrevEmergDesastDTO(FotografiaAnexaApoyAtencPrevEmergDesastDTO fotografiaAnexaApoyAtencPrevEmergDesastDTO) {
        this.fotografiaAnexaApoyAtencPrevEmergDesastDTO = fotografiaAnexaApoyAtencPrevEmergDesastDTO;
    }
    public FotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO getFotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO() {
        return fotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO;
    }
    public void setFotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO(FotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO fotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO) {
        this.fotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO = fotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO;
    }
    public FotografiaAnexaSolicInfraestDTO getFotografiaAnexaSolicInfraestDTO() {
        return fotografiaAnexaSolicInfraestDTO;
    }
    public void setFotografiaAnexaSolicInfraestDTO(FotografiaAnexaSolicInfraestDTO fotografiaAnexaSolicInfraestDTO) {
        this.fotografiaAnexaSolicInfraestDTO = fotografiaAnexaSolicInfraestDTO;
    }
    public FuncionalidadDTO getFuncionalidadDTO() {
        return funcionalidadDTO;
    }
    public void setFuncionalidadDTO(FuncionalidadDTO funcionalidadDTO) {
        this.funcionalidadDTO = funcionalidadDTO;
    }
    public FuncionalidadInfraestructuraDTO getFuncionalidadInfraestructuraDTO() {
        return funcionalidadInfraestructuraDTO;
    }
    public void setFuncionalidadInfraestructuraDTO(FuncionalidadInfraestructuraDTO funcionalidadInfraestructuraDTO) {
        this.funcionalidadInfraestructuraDTO = funcionalidadInfraestructuraDTO;
    }
    public GerenteProyectoSolicInfraestDTO getGerenteProyectoSolicInfraestDTO() {
        return gerenteProyectoSolicInfraestDTO;
    }
    public void setGerenteProyectoSolicInfraestDTO(GerenteProyectoSolicInfraestDTO gerenteProyectoSolicInfraestDTO) {
        this.gerenteProyectoSolicInfraestDTO = gerenteProyectoSolicInfraestDTO;
    }
    public GradoSiathDTO getGradoSiathDTO() {
        return gradoSiathDTO;
    }
    public void setGradoSiathDTO(GradoSiathDTO gradoSiathDTO) {
        this.gradoSiathDTO = gradoSiathDTO;
    }
    public HistorialControlAvancObrRedMitigGestRiesgDesastDTO getHistorialControlAvancObrRedMitigGestRiesgDesastDTO() {
        return historialControlAvancObrRedMitigGestRiesgDesastDTO;
    }
    public void setHistorialControlAvancObrRedMitigGestRiesgDesastDTO(HistorialControlAvancObrRedMitigGestRiesgDesastDTO historialControlAvancObrRedMitigGestRiesgDesastDTO) {
        this.historialControlAvancObrRedMitigGestRiesgDesastDTO = historialControlAvancObrRedMitigGestRiesgDesastDTO;
    }
    public HistorialDemeritoYDesgasteEquipoIngenieroDTO getHistorialDemeritoYDesgasteEquipoIngenieroDTO() {
        return historialDemeritoYDesgasteEquipoIngenieroDTO;
    }
    public void setHistorialDemeritoYDesgasteEquipoIngenieroDTO(HistorialDemeritoYDesgasteEquipoIngenieroDTO historialDemeritoYDesgasteEquipoIngenieroDTO) {
        this.historialDemeritoYDesgasteEquipoIngenieroDTO = historialDemeritoYDesgasteEquipoIngenieroDTO;
    }
    public HistorialDiagnosticoInicialSeleccMttoEquipIngDTO getHistorialDiagnosticoInicialSeleccMttoEquipIngDTO() {
        return historialDiagnosticoInicialSeleccMttoEquipIngDTO;
    }
    public void setHistorialDiagnosticoInicialSeleccMttoEquipIngDTO(HistorialDiagnosticoInicialSeleccMttoEquipIngDTO historialDiagnosticoInicialSeleccMttoEquipIngDTO) {
        this.historialDiagnosticoInicialSeleccMttoEquipIngDTO = historialDiagnosticoInicialSeleccMttoEquipIngDTO;
    }
    public HistorialEquipTranspApoyAtencPrevEmergDesastDTO getHistorialEquipTranspApoyAtencPrevEmergDesastDTO() {
        return historialEquipTranspApoyAtencPrevEmergDesastDTO;
    }
    public void setHistorialEquipTranspApoyAtencPrevEmergDesastDTO(HistorialEquipTranspApoyAtencPrevEmergDesastDTO historialEquipTranspApoyAtencPrevEmergDesastDTO) {
        this.historialEquipTranspApoyAtencPrevEmergDesastDTO = historialEquipTranspApoyAtencPrevEmergDesastDTO;
    }
    public HistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO getHistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO() {
        return historialEquipTranspApoyObrRedMitigGestRiesgDesastDTO;
    }
    public void setHistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO(HistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO historialEquipTranspApoyObrRedMitigGestRiesgDesastDTO) {
        this.historialEquipTranspApoyObrRedMitigGestRiesgDesastDTO = historialEquipTranspApoyObrRedMitigGestRiesgDesastDTO;
    }
    public HistorialIntegranteDocumentosDTO getHistorialIntegranteDocumentosDTO() {
        return historialIntegranteDocumentosDTO;
    }
    public void setHistorialIntegranteDocumentosDTO(HistorialIntegranteDocumentosDTO historialIntegranteDocumentosDTO) {
        this.historialIntegranteDocumentosDTO = historialIntegranteDocumentosDTO;
    }
    public HistorialMantenimientoEquipoIngenieroDTO getHistorialMantenimientoEquipoIngenieroDTO() {
        return historialMantenimientoEquipoIngenieroDTO;
    }
    public void setHistorialMantenimientoEquipoIngenieroDTO(HistorialMantenimientoEquipoIngenieroDTO historialMantenimientoEquipoIngenieroDTO) {
        this.historialMantenimientoEquipoIngenieroDTO = historialMantenimientoEquipoIngenieroDTO;
    }
    public HistorialMantenimientoInfraestructuraDTO getHistorialMantenimientoInfraestructuraDTO() {
        return historialMantenimientoInfraestructuraDTO;
    }
    public void setHistorialMantenimientoInfraestructuraDTO(HistorialMantenimientoInfraestructuraDTO historialMantenimientoInfraestructuraDTO) {
        this.historialMantenimientoInfraestructuraDTO = historialMantenimientoInfraestructuraDTO;
    }
    public HistorialMaqPesadApoyAtencPrevEmergDesastDTO getHistorialMaqPesadApoyAtencPrevEmergDesastDTO() {
        return historialMaqPesadApoyAtencPrevEmergDesastDTO;
    }
    public void setHistorialMaqPesadApoyAtencPrevEmergDesastDTO(HistorialMaqPesadApoyAtencPrevEmergDesastDTO historialMaqPesadApoyAtencPrevEmergDesastDTO) {
        this.historialMaqPesadApoyAtencPrevEmergDesastDTO = historialMaqPesadApoyAtencPrevEmergDesastDTO;
    }
    public HistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO getHistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO() {
        return historialMaqPesadApoyObrRedMitigGestRiesgDesastDTO;
    }
    public void setHistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO(HistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO historialMaqPesadApoyObrRedMitigGestRiesgDesastDTO) {
        this.historialMaqPesadApoyObrRedMitigGestRiesgDesastDTO = historialMaqPesadApoyObrRedMitigGestRiesgDesastDTO;
    }
    public HistorialOrdenApoyoMovimientoTropaDTO getHistorialOrdenApoyoMovimientoTropaDTO() {
        return historialOrdenApoyoMovimientoTropaDTO;
    }
    public void setHistorialOrdenApoyoMovimientoTropaDTO(HistorialOrdenApoyoMovimientoTropaDTO historialOrdenApoyoMovimientoTropaDTO) {
        this.historialOrdenApoyoMovimientoTropaDTO = historialOrdenApoyoMovimientoTropaDTO;
    }
    public HistorialPagoAnualImpuestoTerrenoDTO getHistorialPagoAnualImpuestoTerrenoDTO() {
        return historialPagoAnualImpuestoTerrenoDTO;
    }
    public void setHistorialPagoAnualImpuestoTerrenoDTO(HistorialPagoAnualImpuestoTerrenoDTO historialPagoAnualImpuestoTerrenoDTO) {
        this.historialPagoAnualImpuestoTerrenoDTO = historialPagoAnualImpuestoTerrenoDTO;
    }
    public HistorialProveedorProductoOServicioDTO getHistorialProveedorProductoOServicioDTO() {
        return historialProveedorProductoOServicioDTO;
    }
    public void setHistorialProveedorProductoOServicioDTO(HistorialProveedorProductoOServicioDTO historialProveedorProductoOServicioDTO) {
        this.historialProveedorProductoOServicioDTO = historialProveedorProductoOServicioDTO;
    }
    public HistorialProyeccionAnualAdqPapeleriaDTO getHistorialProyeccionAnualAdqPapeleriaDTO() {
        return historialProyeccionAnualAdqPapeleriaDTO;
    }
    public void setHistorialProyeccionAnualAdqPapeleriaDTO(HistorialProyeccionAnualAdqPapeleriaDTO historialProyeccionAnualAdqPapeleriaDTO) {
        this.historialProyeccionAnualAdqPapeleriaDTO = historialProyeccionAnualAdqPapeleriaDTO;
    }
    public HistorialProyeccionAnualAdqServPublicDTO getHistorialProyeccionAnualAdqServPublicDTO() {
        return historialProyeccionAnualAdqServPublicDTO;
    }
    public void setHistorialProyeccionAnualAdqServPublicDTO(HistorialProyeccionAnualAdqServPublicDTO historialProyeccionAnualAdqServPublicDTO) {
        this.historialProyeccionAnualAdqServPublicDTO = historialProyeccionAnualAdqServPublicDTO;
    }
    public HistorialProyeccionAnualAseoLimpInfraestDTO getHistorialProyeccionAnualAseoLimpInfraestDTO() {
        return historialProyeccionAnualAseoLimpInfraestDTO;
    }
    public void setHistorialProyeccionAnualAseoLimpInfraestDTO(HistorialProyeccionAnualAseoLimpInfraestDTO historialProyeccionAnualAseoLimpInfraestDTO) {
        this.historialProyeccionAnualAseoLimpInfraestDTO = historialProyeccionAnualAseoLimpInfraestDTO;
    }
    public HistorialProyeccionAnualMultaYSancionatoriaDTO getHistorialProyeccionAnualMultaYSancionatoriaDTO() {
        return historialProyeccionAnualMultaYSancionatoriaDTO;
    }
    public void setHistorialProyeccionAnualMultaYSancionatoriaDTO(HistorialProyeccionAnualMultaYSancionatoriaDTO historialProyeccionAnualMultaYSancionatoriaDTO) {
        this.historialProyeccionAnualMultaYSancionatoriaDTO = historialProyeccionAnualMultaYSancionatoriaDTO;
    }
    public HistorialProyeccionMunicionEspecialDTO getHistorialProyeccionMunicionEspecialDTO() {
        return historialProyeccionMunicionEspecialDTO;
    }
    public void setHistorialProyeccionMunicionEspecialDTO(HistorialProyeccionMunicionEspecialDTO historialProyeccionMunicionEspecialDTO) {
        this.historialProyeccionMunicionEspecialDTO = historialProyeccionMunicionEspecialDTO;
    }
    public HistorialQuimicoPiscinaInfraestDTO getHistorialQuimicoPiscinaInfraestDTO() {
        return historialQuimicoPiscinaInfraestDTO;
    }
    public void setHistorialQuimicoPiscinaInfraestDTO(HistorialQuimicoPiscinaInfraestDTO historialQuimicoPiscinaInfraestDTO) {
        this.historialQuimicoPiscinaInfraestDTO = historialQuimicoPiscinaInfraestDTO;
    }
    public HistorialResponsableInfraestructuraDTO getHistorialResponsableInfraestructuraDTO() {
        return historialResponsableInfraestructuraDTO;
    }
    public void setHistorialResponsableInfraestructuraDTO(HistorialResponsableInfraestructuraDTO historialResponsableInfraestructuraDTO) {
        this.historialResponsableInfraestructuraDTO = historialResponsableInfraestructuraDTO;
    }
    public HistorialTipoPersonalApoyAtencPrevEmergDesastDTO getHistorialTipoPersonalApoyAtencPrevEmergDesastDTO() {
        return historialTipoPersonalApoyAtencPrevEmergDesastDTO;
    }
    public void setHistorialTipoPersonalApoyAtencPrevEmergDesastDTO(HistorialTipoPersonalApoyAtencPrevEmergDesastDTO historialTipoPersonalApoyAtencPrevEmergDesastDTO) {
        this.historialTipoPersonalApoyAtencPrevEmergDesastDTO = historialTipoPersonalApoyAtencPrevEmergDesastDTO;
    }
    public HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO getHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO() {
        return historialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO;
    }
    public void setHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO(HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO historialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO) {
        this.historialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO = historialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO;
    }
    public InclusionSeguroEquipoIngenieroDTO getInclusionSeguroEquipoIngenieroDTO() {
        return inclusionSeguroEquipoIngenieroDTO;
    }
    public void setInclusionSeguroEquipoIngenieroDTO(InclusionSeguroEquipoIngenieroDTO inclusionSeguroEquipoIngenieroDTO) {
        this.inclusionSeguroEquipoIngenieroDTO = inclusionSeguroEquipoIngenieroDTO;
    }
    public InclusionSeguroInfraestructuraDTO getInclusionSeguroInfraestructuraDTO() {
        return inclusionSeguroInfraestructuraDTO;
    }
    public void setInclusionSeguroInfraestructuraDTO(InclusionSeguroInfraestructuraDTO inclusionSeguroInfraestructuraDTO) {
        this.inclusionSeguroInfraestructuraDTO = inclusionSeguroInfraestructuraDTO;
    }
    public InclusionSeguroLineaBlancaDTO getInclusionSeguroLineaBlancaDTO() {
        return inclusionSeguroLineaBlancaDTO;
    }
    public void setInclusionSeguroLineaBlancaDTO(InclusionSeguroLineaBlancaDTO inclusionSeguroLineaBlancaDTO) {
        this.inclusionSeguroLineaBlancaDTO = inclusionSeguroLineaBlancaDTO;
    }
    public InformacionFinancieraSolicitudInfraestructuraDTO getInformacionFinancieraSolicitudInfraestructuraDTO() {
        return informacionFinancieraSolicitudInfraestructuraDTO;
    }
    public void setInformacionFinancieraSolicitudInfraestructuraDTO(InformacionFinancieraSolicitudInfraestructuraDTO informacionFinancieraSolicitudInfraestructuraDTO) {
        this.informacionFinancieraSolicitudInfraestructuraDTO = informacionFinancieraSolicitudInfraestructuraDTO;
    }
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
    public InfraestructuraArrendadaDTO getInfraestructuraArrendadaDTO() {
        return infraestructuraArrendadaDTO;
    }
    public void setInfraestructuraArrendadaDTO(InfraestructuraArrendadaDTO infraestructuraArrendadaDTO) {
        this.infraestructuraArrendadaDTO = infraestructuraArrendadaDTO;
    }
    public IntegrantesApoyosAtencPrevEmergDesastDTO getIntegrantesApoyosAtencPrevEmergDesastDTO() {
        return integrantesApoyosAtencPrevEmergDesastDTO;
    }
    public void setIntegrantesApoyosAtencPrevEmergDesastDTO(IntegrantesApoyosAtencPrevEmergDesastDTO integrantesApoyosAtencPrevEmergDesastDTO) {
        this.integrantesApoyosAtencPrevEmergDesastDTO = integrantesApoyosAtencPrevEmergDesastDTO;
    }
    public IntegrantesApoyosObrRedMitigGestRiesgDesastDTO getIntegrantesApoyosObrRedMitigGestRiesgDesastDTO() {
        return integrantesApoyosObrRedMitigGestRiesgDesastDTO;
    }
    public void setIntegrantesApoyosObrRedMitigGestRiesgDesastDTO(IntegrantesApoyosObrRedMitigGestRiesgDesastDTO integrantesApoyosObrRedMitigGestRiesgDesastDTO) {
        this.integrantesApoyosObrRedMitigGestRiesgDesastDTO = integrantesApoyosObrRedMitigGestRiesgDesastDTO;
    }
    public IntegrantesSolicitudesInfraestructuraDTO getIntegrantesSolicitudesInfraestructuraDTO() {
        return integrantesSolicitudesInfraestructuraDTO;
    }
    public void setIntegrantesSolicitudesInfraestructuraDTO(IntegrantesSolicitudesInfraestructuraDTO integrantesSolicitudesInfraestructuraDTO) {
        this.integrantesSolicitudesInfraestructuraDTO = integrantesSolicitudesInfraestructuraDTO;
    }
    public LineaEquipoIngenieroDTO getLineaEquipoIngenieroDTO() {
        return lineaEquipoIngenieroDTO;
    }
    public void setLineaEquipoIngenieroDTO(LineaEquipoIngenieroDTO lineaEquipoIngenieroDTO) {
        this.lineaEquipoIngenieroDTO = lineaEquipoIngenieroDTO;
    }
    public MaquinariaPesadaDTO getMaquinariaPesadaDTO() {
        return maquinariaPesadaDTO;
    }
    public void setMaquinariaPesadaDTO(MaquinariaPesadaDTO maquinariaPesadaDTO) {
        this.maquinariaPesadaDTO = maquinariaPesadaDTO;
    }
    public MaterialTecnicoDTO getMaterialTecnicoDTO() {
        return materialTecnicoDTO;
    }
    public void setMaterialTecnicoDTO(MaterialTecnicoDTO materialTecnicoDTO) {
        this.materialTecnicoDTO = materialTecnicoDTO;
    }
    public MunicionEspecialDTO getMunicionEspecialDTO() {
        return municionEspecialDTO;
    }
    public void setMunicionEspecialDTO(MunicionEspecialDTO municionEspecialDTO) {
        this.municionEspecialDTO = municionEspecialDTO;
    }
    public NivelMantenimientoEquipoIngenieroDTO getNivelMantenimientoEquipoIngenieroDTO() {
        return nivelMantenimientoEquipoIngenieroDTO;
    }
    public void setNivelMantenimientoEquipoIngenieroDTO(NivelMantenimientoEquipoIngenieroDTO nivelMantenimientoEquipoIngenieroDTO) {
        this.nivelMantenimientoEquipoIngenieroDTO = nivelMantenimientoEquipoIngenieroDTO;
    }
    public OficinaDTO getOficinaDTO() {
        return oficinaDTO;
    }
    public void setOficinaDTO(OficinaDTO oficinaDTO) {
        this.oficinaDTO = oficinaDTO;
    }
    public PaisMundoDTO getPaisMundoDTO() {
        return paisMundoDTO;
    }
    public void setPaisMundoDTO(PaisMundoDTO paisMundoDTO) {
        this.paisMundoDTO = paisMundoDTO;
    }
    public ParametrosSistemaDTO getParametrosSistemaDTO() {
        return parametrosSistemaDTO;
    }
    public void setParametrosSistemaDTO(ParametrosSistemaDTO parametrosSistemaDTO) {
        this.parametrosSistemaDTO = parametrosSistemaDTO;
    }
    public PelotonUnidadMilitarDTO getPelotonUnidadMilitarDTO() {
        return pelotonUnidadMilitarDTO;
    }
    public void setPelotonUnidadMilitarDTO(PelotonUnidadMilitarDTO pelotonUnidadMilitarDTO) {
        this.pelotonUnidadMilitarDTO = pelotonUnidadMilitarDTO;
    }
    public PersonalMantenimientoEquipoIngenieroDTO getPersonalMantenimientoEquipoIngenieroDTO() {
        return personalMantenimientoEquipoIngenieroDTO;
    }
    public void setPersonalMantenimientoEquipoIngenieroDTO(PersonalMantenimientoEquipoIngenieroDTO personalMantenimientoEquipoIngenieroDTO) {
        this.personalMantenimientoEquipoIngenieroDTO = personalMantenimientoEquipoIngenieroDTO;
    }
    public PrivilegyRestriccAccesoUsuarioDTO getPrivilegyRestriccAccesoUsuarioDTO() {
        return privilegyRestriccAccesoUsuarioDTO;
    }
    public void setPrivilegyRestriccAccesoUsuarioDTO(PrivilegyRestriccAccesoUsuarioDTO privilegyRestriccAccesoUsuarioDTO) {
        this.privilegyRestriccAccesoUsuarioDTO = privilegyRestriccAccesoUsuarioDTO;
    }
    public ProcesoApoyoAtencionPrevencionDTO getProcesoApoyoAtencionPrevencionDTO() {
        return procesoApoyoAtencionPrevencionDTO;
    }
    public void setProcesoApoyoAtencionPrevencionDTO(ProcesoApoyoAtencionPrevencionDTO procesoApoyoAtencionPrevencionDTO) {
        this.procesoApoyoAtencionPrevencionDTO = procesoApoyoAtencionPrevencionDTO;
    }
    public ProveedorProductoOServicioDTO getProveedorProductoOServicioDTO() {
        return proveedorProductoOServicioDTO;
    }
    public void setProveedorProductoOServicioDTO(ProveedorProductoOServicioDTO proveedorProductoOServicioDTO) {
        this.proveedorProductoOServicioDTO = proveedorProductoOServicioDTO;
    }
    public ProyeccionPlanAnualAdqCdoIngDTO getProyeccionPlanAnualAdqCdoIngDTO() {
        return proyeccionPlanAnualAdqCdoIngDTO;
    }
    public void setProyeccionPlanAnualAdqCdoIngDTO(ProyeccionPlanAnualAdqCdoIngDTO proyeccionPlanAnualAdqCdoIngDTO) {
        this.proyeccionPlanAnualAdqCdoIngDTO = proyeccionPlanAnualAdqCdoIngDTO;
    }
    public ProyeccionPlanAnualAdqEquipFijIngDTO getProyeccionPlanAnualAdqEquipFijIngDTO() {
        return proyeccionPlanAnualAdqEquipFijIngDTO;
    }
    public void setProyeccionPlanAnualAdqEquipFijIngDTO(ProyeccionPlanAnualAdqEquipFijIngDTO proyeccionPlanAnualAdqEquipFijIngDTO) {
        this.proyeccionPlanAnualAdqEquipFijIngDTO = proyeccionPlanAnualAdqEquipFijIngDTO;
    }
    public ProyeccionPlanAnualAdqGeneralDTO getProyeccionPlanAnualAdqGeneralDTO() {
        return proyeccionPlanAnualAdqGeneralDTO;
    }
    public void setProyeccionPlanAnualAdqGeneralDTO(ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO) {
        this.proyeccionPlanAnualAdqGeneralDTO = proyeccionPlanAnualAdqGeneralDTO;
    }
    public ProyeccionPlanAnualAdqInfraestDTO getProyeccionPlanAnualAdqInfraestDTO() {
        return proyeccionPlanAnualAdqInfraestDTO;
    }
    public void setProyeccionPlanAnualAdqInfraestDTO(ProyeccionPlanAnualAdqInfraestDTO proyeccionPlanAnualAdqInfraestDTO) {
        this.proyeccionPlanAnualAdqInfraestDTO = proyeccionPlanAnualAdqInfraestDTO;
    }
    public ProyeccionPlanAnualArrendamientoDTO getProyeccionPlanAnualArrendamientoDTO() {
        return proyeccionPlanAnualArrendamientoDTO;
    }
    public void setProyeccionPlanAnualArrendamientoDTO(ProyeccionPlanAnualArrendamientoDTO proyeccionPlanAnualArrendamientoDTO) {
        this.proyeccionPlanAnualArrendamientoDTO = proyeccionPlanAnualArrendamientoDTO;
    }
    public ProyeccionPlanAnualAsegBienDTO getProyeccionPlanAnualAsegBienDTO() {
        return proyeccionPlanAnualAsegBienDTO;
    }
    public void setProyeccionPlanAnualAsegBienDTO(ProyeccionPlanAnualAsegBienDTO proyeccionPlanAnualAsegBienDTO) {
        this.proyeccionPlanAnualAsegBienDTO = proyeccionPlanAnualAsegBienDTO;
    }
    public ProyeccionPlanAnualEquipSubsDTO getProyeccionPlanAnualEquipSubsDTO() {
        return proyeccionPlanAnualEquipSubsDTO;
    }
    public void setProyeccionPlanAnualEquipSubsDTO(ProyeccionPlanAnualEquipSubsDTO proyeccionPlanAnualEquipSubsDTO) {
        this.proyeccionPlanAnualEquipSubsDTO = proyeccionPlanAnualEquipSubsDTO;
    }
    public ProyeccionPlanAnualPozoDTO getProyeccionPlanAnualPozoDTO() {
        return proyeccionPlanAnualPozoDTO;
    }
    public void setProyeccionPlanAnualPozoDTO(ProyeccionPlanAnualPozoDTO proyeccionPlanAnualPozoDTO) {
        this.proyeccionPlanAnualPozoDTO = proyeccionPlanAnualPozoDTO;
    }
    public ProyeccionSeguroInfraestructuraDTO getProyeccionSeguroInfraestructuraDTO() {
        return proyeccionSeguroInfraestructuraDTO;
    }
    public void setProyeccionSeguroInfraestructuraDTO(ProyeccionSeguroInfraestructuraDTO proyeccionSeguroInfraestructuraDTO) {
        this.proyeccionSeguroInfraestructuraDTO = proyeccionSeguroInfraestructuraDTO;
    }
    public ProyeccionSoatLineaBlancaDTO getProyeccionSoatLineaBlancaDTO() {
        return proyeccionSoatLineaBlancaDTO;
    }
    public void setProyeccionSoatLineaBlancaDTO(ProyeccionSoatLineaBlancaDTO proyeccionSoatLineaBlancaDTO) {
        this.proyeccionSoatLineaBlancaDTO = proyeccionSoatLineaBlancaDTO;
    }
    public ProyeccionTecnicomecanicaEquipTranspDTO getProyeccionTecnicomecanicaEquipTranspDTO() {
        return proyeccionTecnicomecanicaEquipTranspDTO;
    }
    public void setProyeccionTecnicomecanicaEquipTranspDTO(ProyeccionTecnicomecanicaEquipTranspDTO proyeccionTecnicomecanicaEquipTranspDTO) {
        this.proyeccionTecnicomecanicaEquipTranspDTO = proyeccionTecnicomecanicaEquipTranspDTO;
    }
    public QuimicoPiscinaDTO getQuimicoPiscinaDTO() {
        return quimicoPiscinaDTO;
    }
    public void setQuimicoPiscinaDTO(QuimicoPiscinaDTO quimicoPiscinaDTO) {
        this.quimicoPiscinaDTO = quimicoPiscinaDTO;
    }
    public RazaCaninoDTO getRazaCaninoDTO() {
        return razaCaninoDTO;
    }
    public void setRazaCaninoDTO(RazaCaninoDTO razaCaninoDTO) {
        this.razaCaninoDTO = razaCaninoDTO;
    }
    public RecuperacionContrasenaAccesoUsuarioDTO getRecuperacionContrasenaAccesoUsuarioDTO() {
        return recuperacionContrasenaAccesoUsuarioDTO;
    }
    public void setRecuperacionContrasenaAccesoUsuarioDTO(RecuperacionContrasenaAccesoUsuarioDTO recuperacionContrasenaAccesoUsuarioDTO) {
        this.recuperacionContrasenaAccesoUsuarioDTO = recuperacionContrasenaAccesoUsuarioDTO;
    }
    public RegionDaneColombiaDTO getRegionDaneColombiaDTO() {
        return regionDaneColombiaDTO;
    }
    public void setRegionDaneColombiaDTO(RegionDaneColombiaDTO regionDaneColombiaDTO) {
        this.regionDaneColombiaDTO = regionDaneColombiaDTO;
    }
    public ResponsableDTO getResponsableDTO() {
        return responsableDTO;
    }
    public void setResponsableDTO(ResponsableDTO responsableDTO) {
        this.responsableDTO = responsableDTO;
    }
    public RolDTO getRolDTO() {
        return rolDTO;
    }
    public void setRolDTO(RolDTO rolDTO) {
        this.rolDTO = rolDTO;
    }
    public SaneamientoBasicoDTO getSaneamientoBasicoDTO() {
        return saneamientoBasicoDTO;
    }
    public void setSaneamientoBasicoDTO(SaneamientoBasicoDTO saneamientoBasicoDTO) {
        this.saneamientoBasicoDTO = saneamientoBasicoDTO;
    }
    public SeguroDTO getSeguroDTO() {
        return seguroDTO;
    }
    public void setSeguroDTO(SeguroDTO seguroDTO) {
        this.seguroDTO = seguroDTO;
    }
    public SociedadUnidadCentralizadoraDTO getSociedadUnidadCentralizadoraDTO() {
        return sociedadUnidadCentralizadoraDTO;
    }
    public void setSociedadUnidadCentralizadoraDTO(SociedadUnidadCentralizadoraDTO sociedadUnidadCentralizadoraDTO) {
        this.sociedadUnidadCentralizadoraDTO = sociedadUnidadCentralizadoraDTO;
    }
    public SolicitudInfraestructuraDTO getSolicitudInfraestructuraDTO() {
        return solicitudInfraestructuraDTO;
    }
    public void setSolicitudInfraestructuraDTO(SolicitudInfraestructuraDTO solicitudInfraestructuraDTO) {
        this.solicitudInfraestructuraDTO = solicitudInfraestructuraDTO;
    }
    public SubclasificacionEquipoIngenieroDTO getSubclasificacionEquipoIngenieroDTO() {
        return subclasificacionEquipoIngenieroDTO;
    }
    public void setSubclasificacionEquipoIngenieroDTO(SubclasificacionEquipoIngenieroDTO subclasificacionEquipoIngenieroDTO) {
        this.subclasificacionEquipoIngenieroDTO = subclasificacionEquipoIngenieroDTO;
    }
    public SuministroDemeritoYDesgasteEquipoIngenieroDTO getSuministroDemeritoYDesgasteEquipoIngenieroDTO() {
        return suministroDemeritoYDesgasteEquipoIngenieroDTO;
    }
    public void setSuministroDemeritoYDesgasteEquipoIngenieroDTO(SuministroDemeritoYDesgasteEquipoIngenieroDTO suministroDemeritoYDesgasteEquipoIngenieroDTO) {
        this.suministroDemeritoYDesgasteEquipoIngenieroDTO = suministroDemeritoYDesgasteEquipoIngenieroDTO;
    }
    public TerrenoDTO getTerrenoDTO() {
        return terrenoDTO;
    }
    public void setTerrenoDTO(TerrenoDTO terrenoDTO) {
        this.terrenoDTO = terrenoDTO;
    }
    public TipoActividadExpEquipHerrYPerrDispArtefExpDTO getTipoActividadExpEquipHerrYPerrDispArtefExpDTO() {
        return tipoActividadExpEquipHerrYPerrDispArtefExpDTO;
    }
    public void setTipoActividadExpEquipHerrYPerrDispArtefExpDTO(TipoActividadExpEquipHerrYPerrDispArtefExpDTO tipoActividadExpEquipHerrYPerrDispArtefExpDTO) {
        this.tipoActividadExpEquipHerrYPerrDispArtefExpDTO = tipoActividadExpEquipHerrYPerrDispArtefExpDTO;
    }
    public TipoAltaEquipoIngenieroDTO getTipoAltaEquipoIngenieroDTO() {
        return tipoAltaEquipoIngenieroDTO;
    }
    public void setTipoAltaEquipoIngenieroDTO(TipoAltaEquipoIngenieroDTO tipoAltaEquipoIngenieroDTO) {
        this.tipoAltaEquipoIngenieroDTO = tipoAltaEquipoIngenieroDTO;
    }
    public TipoContratoSeguroInfraestructuraDTO getTipoContratoSeguroInfraestructuraDTO() {
        return tipoContratoSeguroInfraestructuraDTO;
    }
    public void setTipoContratoSeguroInfraestructuraDTO(TipoContratoSeguroInfraestructuraDTO tipoContratoSeguroInfraestructuraDTO) {
        this.tipoContratoSeguroInfraestructuraDTO = tipoContratoSeguroInfraestructuraDTO;
    }
    public TipoContribucionSaneamientoBasicoDTO getTipoContribucionSaneamientoBasicoDTO() {
        return tipoContribucionSaneamientoBasicoDTO;
    }
    public void setTipoContribucionSaneamientoBasicoDTO(TipoContribucionSaneamientoBasicoDTO tipoContribucionSaneamientoBasicoDTO) {
        this.tipoContribucionSaneamientoBasicoDTO = tipoContribucionSaneamientoBasicoDTO;
    }
    public TipoDespejeArtefactoExplosivoDTO getTipoDespejeArtefactoExplosivoDTO() {
        return tipoDespejeArtefactoExplosivoDTO;
    }
    public void setTipoDespejeArtefactoExplosivoDTO(TipoDespejeArtefactoExplosivoDTO tipoDespejeArtefactoExplosivoDTO) {
        this.tipoDespejeArtefactoExplosivoDTO = tipoDespejeArtefactoExplosivoDTO;
    }
    public TipoDespejeMilitarArtefactoExplosivoDTO getTipoDespejeMilitarArtefactoExplosivoDTO() {
        return tipoDespejeMilitarArtefactoExplosivoDTO;
    }
    public void setTipoDespejeMilitarArtefactoExplosivoDTO(TipoDespejeMilitarArtefactoExplosivoDTO tipoDespejeMilitarArtefactoExplosivoDTO) {
        this.tipoDespejeMilitarArtefactoExplosivoDTO = tipoDespejeMilitarArtefactoExplosivoDTO;
    }
    public TipoDocumentoAnexoAltaEquipoIngenieroDTO getTipoDocumentoAnexoAltaEquipoIngenieroDTO() {
        return tipoDocumentoAnexoAltaEquipoIngenieroDTO;
    }
    public void setTipoDocumentoAnexoAltaEquipoIngenieroDTO(TipoDocumentoAnexoAltaEquipoIngenieroDTO tipoDocumentoAnexoAltaEquipoIngenieroDTO) {
        this.tipoDocumentoAnexoAltaEquipoIngenieroDTO = tipoDocumentoAnexoAltaEquipoIngenieroDTO;
    }
    public TipoDocumentoAnexoBajaEquipoIngenieroDTO getTipoDocumentoAnexoBajaEquipoIngenieroDTO() {
        return tipoDocumentoAnexoBajaEquipoIngenieroDTO;
    }
    public void setTipoDocumentoAnexoBajaEquipoIngenieroDTO(TipoDocumentoAnexoBajaEquipoIngenieroDTO tipoDocumentoAnexoBajaEquipoIngenieroDTO) {
        this.tipoDocumentoAnexoBajaEquipoIngenieroDTO = tipoDocumentoAnexoBajaEquipoIngenieroDTO;
    }
    public TipoDocumentoAnexoSolicInfraestDTO getTipoDocumentoAnexoSolicInfraestDTO() {
        return tipoDocumentoAnexoSolicInfraestDTO;
    }
    public void setTipoDocumentoAnexoSolicInfraestDTO(TipoDocumentoAnexoSolicInfraestDTO tipoDocumentoAnexoSolicInfraestDTO) {
        this.tipoDocumentoAnexoSolicInfraestDTO = tipoDocumentoAnexoSolicInfraestDTO;
    }
    public TipoDocumentoIdentificacionDTO getTipoDocumentoIdentificacionDTO() {
        return tipoDocumentoIdentificacionDTO;
    }
    public void setTipoDocumentoIdentificacionDTO(TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO) {
        this.tipoDocumentoIdentificacionDTO = tipoDocumentoIdentificacionDTO;
    }
    public TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO getTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO() {
        return tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO;
    }
    public void setTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO(TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO) {
        this.tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO = tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO;
    }
    public TipoEntidadInstitucionalDTO getTipoEntidadInstitucionalDTO() {
        return tipoEntidadInstitucionalDTO;
    }
    public void setTipoEntidadInstitucionalDTO(TipoEntidadInstitucionalDTO tipoEntidadInstitucionalDTO) {
        this.tipoEntidadInstitucionalDTO = tipoEntidadInstitucionalDTO;
    }
    public TipoEstructuraInfraestructuraDTO getTipoEstructuraInfraestructuraDTO() {
        return tipoEstructuraInfraestructuraDTO;
    }
    public void setTipoEstructuraInfraestructuraDTO(TipoEstructuraInfraestructuraDTO tipoEstructuraInfraestructuraDTO) {
        this.tipoEstructuraInfraestructuraDTO = tipoEstructuraInfraestructuraDTO;
    }
    public TipoEstructuraInfraestructuraArrendadaDTO getTipoEstructuraInfraestructuraArrendadaDTO() {
        return tipoEstructuraInfraestructuraArrendadaDTO;
    }
    public void setTipoEstructuraInfraestructuraArrendadaDTO(TipoEstructuraInfraestructuraArrendadaDTO tipoEstructuraInfraestructuraArrendadaDTO) {
        this.tipoEstructuraInfraestructuraArrendadaDTO = tipoEstructuraInfraestructuraArrendadaDTO;
    }
    public TipoEventoApoyoRealizadoDTO getTipoEventoApoyoRealizadoDTO() {
        return tipoEventoApoyoRealizadoDTO;
    }
    public void setTipoEventoApoyoRealizadoDTO(TipoEventoApoyoRealizadoDTO tipoEventoApoyoRealizadoDTO) {
        this.tipoEventoApoyoRealizadoDTO = tipoEventoApoyoRealizadoDTO;
    }
    public TipoFuenteFinanciacionDTO getTipoFuenteFinanciacionDTO() {
        return tipoFuenteFinanciacionDTO;
    }
    public void setTipoFuenteFinanciacionDTO(TipoFuenteFinanciacionDTO tipoFuenteFinanciacionDTO) {
        this.tipoFuenteFinanciacionDTO = tipoFuenteFinanciacionDTO;
    }
    public TipoMantenimientoEquipoIngenieroDTO getTipoMantenimientoEquipoIngenieroDTO() {
        return tipoMantenimientoEquipoIngenieroDTO;
    }
    public void setTipoMantenimientoEquipoIngenieroDTO(TipoMantenimientoEquipoIngenieroDTO tipoMantenimientoEquipoIngenieroDTO) {
        this.tipoMantenimientoEquipoIngenieroDTO = tipoMantenimientoEquipoIngenieroDTO;
    }
    public TipoMantenimientoInfraestructuraDTO getTipoMantenimientoInfraestructuraDTO() {
        return tipoMantenimientoInfraestructuraDTO;
    }
    public void setTipoMantenimientoInfraestructuraDTO(TipoMantenimientoInfraestructuraDTO tipoMantenimientoInfraestructuraDTO) {
        this.tipoMantenimientoInfraestructuraDTO = tipoMantenimientoInfraestructuraDTO;
    }
    public TipoMantenimientoPozoDTO getTipoMantenimientoPozoDTO() {
        return tipoMantenimientoPozoDTO;
    }
    public void setTipoMantenimientoPozoDTO(TipoMantenimientoPozoDTO tipoMantenimientoPozoDTO) {
        this.tipoMantenimientoPozoDTO = tipoMantenimientoPozoDTO;
    }
    public TipoPersonalApoyoDTO getTipoPersonalApoyoDTO() {
        return tipoPersonalApoyoDTO;
    }
    public void setTipoPersonalApoyoDTO(TipoPersonalApoyoDTO tipoPersonalApoyoDTO) {
        this.tipoPersonalApoyoDTO = tipoPersonalApoyoDTO;
    }
    public TipoReduccionImpuestoTerrenoDTO getTipoReduccionImpuestoTerrenoDTO() {
        return tipoReduccionImpuestoTerrenoDTO;
    }
    public void setTipoReduccionImpuestoTerrenoDTO(TipoReduccionImpuestoTerrenoDTO tipoReduccionImpuestoTerrenoDTO) {
        this.tipoReduccionImpuestoTerrenoDTO = tipoReduccionImpuestoTerrenoDTO;
    }
    public TipoRequerimientoApoyoAtencionPrevencionDTO getTipoRequerimientoApoyoAtencionPrevencionDTO() {
        return tipoRequerimientoApoyoAtencionPrevencionDTO;
    }
    public void setTipoRequerimientoApoyoAtencionPrevencionDTO(TipoRequerimientoApoyoAtencionPrevencionDTO tipoRequerimientoApoyoAtencionPrevencionDTO) {
        this.tipoRequerimientoApoyoAtencionPrevencionDTO = tipoRequerimientoApoyoAtencionPrevencionDTO;
    }
    public TipoResponsabilidadContractualDTO getTipoResponsabilidadContractualDTO() {
        return tipoResponsabilidadContractualDTO;
    }
    public void setTipoResponsabilidadContractualDTO(TipoResponsabilidadContractualDTO tipoResponsabilidadContractualDTO) {
        this.tipoResponsabilidadContractualDTO = tipoResponsabilidadContractualDTO;
    }
    public TipoSeguroDTO getTipoSeguroDTO() {
        return tipoSeguroDTO;
    }
    public void setTipoSeguroDTO(TipoSeguroDTO tipoSeguroDTO) {
        this.tipoSeguroDTO = tipoSeguroDTO;
    }
    public TipoServicioPublicoDTO getTipoServicioPublicoDTO() {
        return tipoServicioPublicoDTO;
    }
    public void setTipoServicioPublicoDTO(TipoServicioPublicoDTO tipoServicioPublicoDTO) {
        this.tipoServicioPublicoDTO = tipoServicioPublicoDTO;
    }
    public TipoSolicitudInfraestructuraDTO getTipoSolicitudInfraestructuraDTO() {
        return tipoSolicitudInfraestructuraDTO;
    }
    public void setTipoSolicitudInfraestructuraDTO(TipoSolicitudInfraestructuraDTO tipoSolicitudInfraestructuraDTO) {
        this.tipoSolicitudInfraestructuraDTO = tipoSolicitudInfraestructuraDTO;
    }
    public TipoUsuarioDTO getTipoUsuarioDTO() {
        return tipoUsuarioDTO;
    }
    public void setTipoUsuarioDTO(TipoUsuarioDTO tipoUsuarioDTO) {
        this.tipoUsuarioDTO = tipoUsuarioDTO;
    }
    //public TokenAutenticacionUsuarioDTO getTokenAutenticacionUsuarioDTO() {
        //return tokenAutenticacionUsuarioDTO;
    //}
    //public void setAutenticacionUsuarioDTO(TokenAutenticacionUsuarioDTO tokenAutenticacionUsuarioDTO) {
        //this.tokenAutenticacionUsuarioDTO = tokenAutenticacionUsuarioDTO;
    //}
    public TokenCodigoActivacionRecuperacionContrasenaDTO getTokenCodigoActivacionRecuperacionContrasenaDTO() {
        return tokenCodigoActivacionRecuperacionContrasenaDTO;
    }
    public void setTokenCodigoActivacionRecuperacionContrasenaDTO(TokenCodigoActivacionRecuperacionContrasenaDTO tokenCodigoActivacionRecuperacionContrasenaDTO) {
        this.tokenCodigoActivacionRecuperacionContrasenaDTO = tokenCodigoActivacionRecuperacionContrasenaDTO;
    }
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
    public UnidadMilitarRealizadoraMantenimientoDTO getUnidadMilitarRealizadoraMantenimientoDTO() {
        return unidadMilitarRealizadoraMantenimientoDTO;
    }
    public void setUnidadMilitarRealizadoraMantenimientoDTO(UnidadMilitarRealizadoraMantenimientoDTO unidadMilitarRealizadoraMantenimientoDTO) {
        this.unidadMilitarRealizadoraMantenimientoDTO = unidadMilitarRealizadoraMantenimientoDTO;
    }
    public UnidadMedidaDTO getUnidadMedidaDTO() {
        return unidadMedidaDTO;
    }
    public void setUnidadMedidaDTO(UnidadMedidaDTO unidadMedidaDTO) {
        this.unidadMedidaDTO = unidadMedidaDTO;
    }
    public UsuarioDTO getUsuarioDTO() {
        return usuarioDTO;
    }
    public void setUsuarioDTO(UsuarioDTO usuarioDTO) {
        this.usuarioDTO = usuarioDTO;
    }
    public RespuestaDTO(String mensaje, boolean banderaexito) {
        this.mensaje = mensaje;
        this.banderaexito = banderaexito;
    }
}
