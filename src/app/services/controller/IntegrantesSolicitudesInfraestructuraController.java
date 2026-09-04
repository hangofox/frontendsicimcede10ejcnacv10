//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.IntegrantesSolicitudesInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.IntegrantesSolicitudesInfraestructuraService;
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
* @Since 01/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class IntegrantesSolicitudesInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private IntegrantesSolicitudesInfraestructuraService integrantesSolicitudesInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/integrantesSolicitudesInfraestructuras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idIntegrantesSolicitudesInfraestructura,
            @RequestParam(required = false) Long idSolicitudInfraestructura) {
        return new ResponseEntity<>(integrantesSolicitudesInfraestructuraService.contarTotalRegistros(idIntegrantesSolicitudesInfraestructura, idSolicitudInfraestructura), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS INTEGRANTES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/integrantesSolicitudesInfraestructuras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<IntegrantesSolicitudesInfraestructuraDTO>> listarIntegrantesSolicitudesInfraestructurasLista(
            @RequestParam(required = false) Long idIntegrantesSolicitudesInfraestructura,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(integrantesSolicitudesInfraestructuraService.listarIntegrantesSolicitudesInfraestructuras(idIntegrantesSolicitudesInfraestructura, idSolicitudInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR INTEGRANTES CON QUERY PARAMS:
    @GetMapping("/integrantesSolicitudesInfraestructuras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<IntegrantesSolicitudesInfraestructuraDTO>> listarIntegrantesSolicitudesInfraestructurasListaPag(
            @RequestParam(required = false) Long idIntegrantesSolicitudesInfraestructura,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(integrantesSolicitudesInfraestructuraService.listarIntegrantesSolicitudesInfraestructurasPag(pageable, idIntegrantesSolicitudesInfraestructura, idSolicitudInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/integrantesSolicitudesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearIntegrantesSolicitudesInfraestructura(@RequestBody IntegrantesSolicitudesInfraestructuraDTO integrantesSolicitudesInfraestructuraDTO){
        return integrantesSolicitudesInfraestructuraService.crearIntegrantesSolicitudesInfraestructura(integrantesSolicitudesInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/integrantesSolicitudesInfraestructuras/{idIntegrantesSolicitudesInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarIntegrantesSolicitudesInfraestructurabyId(@PathVariable Long idIntegrantesSolicitudesInfraestructura){
        return integrantesSolicitudesInfraestructuraService.consultarIntegrantesSolicitudesInfraestructuraporId(idIntegrantesSolicitudesInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/integrantesSolicitudesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarIntegrantesSolicitudesInfraestructura(@RequestBody IntegrantesSolicitudesInfraestructuraDTO integrantesSolicitudesInfraestructuraDTO){
        return integrantesSolicitudesInfraestructuraService.actualizarIntegrantesSolicitudesInfraestructura(integrantesSolicitudesInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/integrantesSolicitudesInfraestructuras/{idIntegrantesSolicitudesInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarIntegrantesSolicitudesInfraestructura(@PathVariable Long idIntegrantesSolicitudesInfraestructura){
        return integrantesSolicitudesInfraestructuraService.eliminarIntegrantesSolicitudesInfraestructura(idIntegrantesSolicitudesInfraestructura);
    }
}
