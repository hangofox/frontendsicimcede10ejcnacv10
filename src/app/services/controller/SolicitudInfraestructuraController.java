//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.SolicitudInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.SolicitudInfraestructuraService;
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
* @Since 27/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class SolicitudInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private SolicitudInfraestructuraService solicitudInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS.
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/solicitudesInfraestructuras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(solicitudInfraestructuraService.contarTotalRegistros(idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
    //ENDPOINT PARA LISTAR TODAS LAS SOLICITUDES DE INFRAESTRUCTURA SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/solicitudesInfraestructuras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<SolicitudInfraestructuraDTO>> listarSolicitudesInfraestructurasLista(
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(solicitudInfraestructuraService.listarSolicitudesInfraestructuras(idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR SOLICITUDES DE INFRAESTRUCTURA CON QUERY PARAMS:
    @GetMapping("/solicitudesInfraestructuras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<SolicitudInfraestructuraDTO>> listarSolicitudesInfraestructurasListaPag(
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(solicitudInfraestructuraService.listarSolicitudesInfraestructurasPag(pageable, idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/solicitudesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearSolicitudInfraestructura(@RequestBody SolicitudInfraestructuraDTO solicitudInfraestructuraDTO){
        System.out.println(solicitudInfraestructuraDTO);
        return solicitudInfraestructuraService.crearSolicitudInfraestructura(solicitudInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/solicitudesInfraestructuras/{idSolicitudInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarSolicitudInfraestructurabyId(@PathVariable Long idSolicitudInfraestructura){
        return solicitudInfraestructuraService.consultarSolicitudInfraestructuraporId(idSolicitudInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR CÓDIGO RADICADO:
    @GetMapping("/solicitudesInfraestructuras/codigoRadicado/{codigoRadicadoSolicitudInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CÓDIGO RADICADO.
    public RespuestaDTO consultarSolicitudInfraestructuraporCodigoRadicado(@PathVariable String codigoRadicadoSolicitudInfraestructura){
        return solicitudInfraestructuraService.consultarSolicitudInfraestructuraporCodigoRadicado(codigoRadicadoSolicitudInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/solicitudesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarSolicitudInfraestructura(@RequestBody SolicitudInfraestructuraDTO solicitudInfraestructuraDTO){
        return solicitudInfraestructuraService.actualizarSolicitudInfraestructura(solicitudInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/solicitudesInfraestructuras/{idSolicitudInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarSolicitudInfraestructura(@PathVariable Long idSolicitudInfraestructura){
        return solicitudInfraestructuraService.eliminarSolicitudInfraestructura(idSolicitudInfraestructura);
    }
}
