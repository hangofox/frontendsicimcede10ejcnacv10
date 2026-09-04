//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialProyeccionAnualAseoLimpInfraestDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialProyeccionAnualAseoLimpInfraestService;
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
* @Since 13/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class HistorialProyeccionAnualAseoLimpInfraestController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialProyeccionAnualAseoLimpInfraestService historialProyeccionAnualAseoLimpInfraestService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesProyeccionesAnualesAseoLimpInfraest/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialProyeccionAnualAseoLimpInfraest,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialProyeccionAnualAseoLimpInfraestService.contarTotalRegistros(idHistorialProyeccionAnualAseoLimpInfraest, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesProyeccionesAnualesAseoLimpInfraest/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialProyeccionAnualAseoLimpInfraestDTO>> listarHistorialesProyeccionesAnualesAseoLimpInfraestLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialProyeccionAnualAseoLimpInfraest,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialProyeccionAnualAseoLimpInfraestService.listarHistorialesProyeccionesAnualesAseoLimpInfraest(idHistorialProyeccionAnualAseoLimpInfraest, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES CON QUERY PARAMS:
    @GetMapping("/historialesProyeccionesAnualesAseoLimpInfraest/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialProyeccionAnualAseoLimpInfraestDTO>> listarHistorialesProyeccionesAnualesAseoLimpInfraestListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialProyeccionAnualAseoLimpInfraest,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialProyeccionAnualAseoLimpInfraestService.listarHistorialesProyeccionesAnualesAseoLimpInfraestPag(pageable, idHistorialProyeccionAnualAseoLimpInfraest, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesProyeccionesAnualesAseoLimpInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialProyeccionAnualAseoLimpInfraest(@RequestBody HistorialProyeccionAnualAseoLimpInfraestDTO historialProyeccionAnualAseoLimpInfraestDTO){
        return historialProyeccionAnualAseoLimpInfraestService.crearHistorialProyeccionAnualAseoLimpInfraest(historialProyeccionAnualAseoLimpInfraestDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesProyeccionesAnualesAseoLimpInfraest/{idHistorialProyeccionAnualAseoLimpInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialProyeccionAnualAseoLimpInfraestbyId(@PathVariable Long idHistorialProyeccionAnualAseoLimpInfraest){
        return historialProyeccionAnualAseoLimpInfraestService.consultarHistorialProyeccionAnualAseoLimpInfraestportId(idHistorialProyeccionAnualAseoLimpInfraest);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO (CAMPO ÚNICO):
    @GetMapping("/historialesProyeccionesAnualesAseoLimpInfraest/numReg")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarHistorialProyeccionAnualAseoLimpInfraestportNumReg(
            @RequestParam(required = false) String numRegHistorialProyeccionAnualAseoLimpInfraest) {
        return historialProyeccionAnualAseoLimpInfraestService.consultarHistorialProyeccionAnualAseoLimpInfraestportNumReg(numRegHistorialProyeccionAnualAseoLimpInfraest);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesProyeccionesAnualesAseoLimpInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialProyeccionAnualAseoLimpInfraest(@RequestBody HistorialProyeccionAnualAseoLimpInfraestDTO historialProyeccionAnualAseoLimpInfraestDTO){
        return historialProyeccionAnualAseoLimpInfraestService.actualizarHistorialProyeccionAnualAseoLimpInfraest(historialProyeccionAnualAseoLimpInfraestDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesProyeccionesAnualesAseoLimpInfraest/{idHistorialProyeccionAnualAseoLimpInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialProyeccionAnualAseoLimpInfraest(@PathVariable Long idHistorialProyeccionAnualAseoLimpInfraest){
        return historialProyeccionAnualAseoLimpInfraestService.eliminarHistorialProyeccionAnualAseoLimpInfraest(idHistorialProyeccionAnualAseoLimpInfraest);
    }
}
