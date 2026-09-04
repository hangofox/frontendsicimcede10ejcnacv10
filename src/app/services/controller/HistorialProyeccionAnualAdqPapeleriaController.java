//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialProyeccionAnualAdqPapeleriaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialProyeccionAnualAdqPapeleriaService;
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
* @Since 10/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class HistorialProyeccionAnualAdqPapeleriaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialProyeccionAnualAdqPapeleriaService historialProyeccionAnualAdqPapeleriaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesProyeccionesAnualesAdqPapelerias/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialProyeccionAnualAdqPapeleria,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialProyeccionAnualAdqPapeleriaService.contarTotalRegistros(idHistorialProyeccionAnualAdqPapeleria, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesProyeccionesAnualesAdqPapelerias/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialProyeccionAnualAdqPapeleriaDTO>> listarHistorialesProyeccionesAnualesAdqPapeleriasLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialProyeccionAnualAdqPapeleria,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialProyeccionAnualAdqPapeleriaService.listarHistorialesProyeccionesAnualesAdqPapelerias(idHistorialProyeccionAnualAdqPapeleria, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES CON QUERY PARAMS:
    @GetMapping("/historialesProyeccionesAnualesAdqPapelerias/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialProyeccionAnualAdqPapeleriaDTO>> listarHistorialesProyeccionesAnualesAdqPapeleriasListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialProyeccionAnualAdqPapeleria,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialProyeccionAnualAdqPapeleriaService.listarHistorialesProyeccionesAnualesAdqPapeleriasPag(pageable, idHistorialProyeccionAnualAdqPapeleria, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesProyeccionesAnualesAdqPapelerias")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialProyeccionAnualAdqPapeleria(@RequestBody HistorialProyeccionAnualAdqPapeleriaDTO historialProyeccionAnualAdqPapeleriaDTO){
        return historialProyeccionAnualAdqPapeleriaService.crearHistorialProyeccionAnualAdqPapeleria(historialProyeccionAnualAdqPapeleriaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesProyeccionesAnualesAdqPapelerias/{idHistorialProyeccionAnualAdqPapeleria}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialProyeccionAnualAdqPapeleriabyId(@PathVariable Long idHistorialProyeccionAnualAdqPapeleria){
        return historialProyeccionAnualAdqPapeleriaService.consultarHistorialProyeccionAnualAdqPapeleriaaporId(idHistorialProyeccionAnualAdqPapeleria);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesProyeccionesAnualesAdqPapelerias")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialProyeccionAnualAdqPapeleria(@RequestBody HistorialProyeccionAnualAdqPapeleriaDTO historialProyeccionAnualAdqPapeleriaDTO){
        return historialProyeccionAnualAdqPapeleriaService.actualizarHistorialProyeccionAnualAdqPapeleria(historialProyeccionAnualAdqPapeleriaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesProyeccionesAnualesAdqPapelerias/{idHistorialProyeccionAnualAdqPapeleria}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialProyeccionAnualAdqPapeleria(@PathVariable Long idHistorialProyeccionAnualAdqPapeleria){
        return historialProyeccionAnualAdqPapeleriaService.eliminarHistorialProyeccionAnualAdqPapeleria(idHistorialProyeccionAnualAdqPapeleria);
    }
}
