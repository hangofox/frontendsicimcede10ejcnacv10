//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialIntegranteSolicitudInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialIntegranteSolicitudInfraestructuraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 20/10/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class HistorialIntegranteSolicitudInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialIntegranteSolicitudInfraestructuraService historialIntegranteSolicitudInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesIntegrantesSolicitudesInfraestructuras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialIntegranteSolicitudInfraestructura,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(historialIntegranteSolicitudInfraestructuraService.contarTotalRegistros(idHistorialIntegranteSolicitudInfraestructura, idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES DE INTEGRANTES DE SOLICITUDES DE INFRAESTRUCTURAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesIntegrantesSolicitudesInfraestructuras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialIntegranteSolicitudInfraestructuraDTO>> listarHistorialesIntegrantesSolicitudesInfraestructurasLista(
            @RequestParam(required = false) Long idHistorialIntegranteSolicitudInfraestructura,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialIntegranteSolicitudInfraestructuraService.listarHistorialesIntegrantesSolicitudesInfraestructuras(idHistorialIntegranteSolicitudInfraestructura, idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES DE INTEGRANTES DE SOLICITUDES DE INFRAESTRUCTURAS CON QUERY PARAMS:
    @GetMapping("/historialesIntegrantesSolicitudesInfraestructuras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialIntegranteSolicitudInfraestructuraDTO>> listarHistorialesIntegrantesSolicitudesInfraestructurasListaPag(
            @RequestParam(required = false) Long idHistorialIntegranteSolicitudInfraestructura,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialIntegranteSolicitudInfraestructuraService.listarHistorialesIntegrantesSolicitudesInfraestructurasPag(pageable, idHistorialIntegranteSolicitudInfraestructura, idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesIntegrantesSolicitudesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialIntegranteSolicitudInfraestructura(@RequestBody HistorialIntegranteSolicitudInfraestructuraDTO historialIntegranteSolicitudInfraestructuraDTO){
        System.out.println(historialIntegranteSolicitudInfraestructuraDTO);
        return historialIntegranteSolicitudInfraestructuraService.crearHistorialIntegranteSolicitudInfraestructura(historialIntegranteSolicitudInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesIntegrantesSolicitudesInfraestructuras/{idHistorialIntegranteSolicitudInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialIntegranteSolicitudInfraestructurabyId(@PathVariable Long idHistorialIntegranteSolicitudInfraestructura){
        return historialIntegranteSolicitudInfraestructuraService.consultarHistorialIntegranteSolicitudInfraestructuraporId(idHistorialIntegranteSolicitudInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO (CAMPO ÚNICO):
    @GetMapping("/historialesIntegrantesSolicitudesInfraestructuras/numeroRegistro/{numRegHistorialIntegranteSolicitudInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarHistorialIntegranteSolicitudInfraestructurabyNumReg(@PathVariable String numRegHistorialIntegranteSolicitudInfraestructura) {
        return historialIntegranteSolicitudInfraestructuraService.consultarHistorialIntegranteSolicitudInfraestructuraporNumReg(numRegHistorialIntegranteSolicitudInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesIntegrantesSolicitudesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialIntegranteSolicitudInfraestructura(@RequestBody HistorialIntegranteSolicitudInfraestructuraDTO historialIntegranteSolicitudInfraestructuraDTO){
        return historialIntegranteSolicitudInfraestructuraService.actualizarHistorialIntegranteSolicitudInfraestructura(historialIntegranteSolicitudInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesIntegrantesSolicitudesInfraestructuras/{idHistorialIntegranteSolicitudInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialIntegranteSolicitudInfraestructura(@PathVariable Long idHistorialIntegranteSolicitudInfraestructura){
        return historialIntegranteSolicitudInfraestructuraService.eliminarHistorialIntegranteSolicitudInfraestructura(idHistorialIntegranteSolicitudInfraestructura);
    }
}
