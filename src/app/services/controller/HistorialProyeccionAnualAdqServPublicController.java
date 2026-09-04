//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialProyeccionAnualAdqServPublicDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialProyeccionAnualAdqServPublicService;
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
public class HistorialProyeccionAnualAdqServPublicController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialProyeccionAnualAdqServPublicService historialProyeccionAnualAdqServPublicService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesProyeccionesAnualesAdqServPublic/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialProyeccionAnualAdqServPublic,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialProyeccionAnualAdqServPublicService.contarTotalRegistros(idHistorialProyeccionAnualAdqServPublic, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesProyeccionesAnualesAdqServPublic/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialProyeccionAnualAdqServPublicDTO>> listarHistorialesProyeccionesAnualesAdqServPublicLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialProyeccionAnualAdqServPublic,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialProyeccionAnualAdqServPublicService.listarHistorialesProyeccionesAnualesAdqServPublic(idHistorialProyeccionAnualAdqServPublic, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES CON QUERY PARAMS:
    @GetMapping("/historialesProyeccionesAnualesAdqServPublic/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialProyeccionAnualAdqServPublicDTO>> listarHistorialesProyeccionesAnualesAdqServPublicListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialProyeccionAnualAdqServPublic,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialProyeccionAnualAdqServPublicService.listarHistorialesProyeccionesAnualesAdqServPublicPag(pageable, idHistorialProyeccionAnualAdqServPublic, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesProyeccionesAnualesAdqServPublic")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialProyeccionAnualAdqServPublic(@RequestBody HistorialProyeccionAnualAdqServPublicDTO historialProyeccionAnualAdqServPublicDTO){
        return historialProyeccionAnualAdqServPublicService.crearHistorialProyeccionAnualAdqServPublic(historialProyeccionAnualAdqServPublicDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesProyeccionesAnualesAdqServPublic/{idHistorialProyeccionAnualAdqServPublic}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialProyeccionAnualAdqServPublicbyId(@PathVariable Long idHistorialProyeccionAnualAdqServPublic){
        return historialProyeccionAnualAdqServPublicService.consultarHistorialProyeccionAnualAdqServPublicporId(idHistorialProyeccionAnualAdqServPublic);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesProyeccionesAnualesAdqServPublic")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialProyeccionAnualAdqServPublic(@RequestBody HistorialProyeccionAnualAdqServPublicDTO historialProyeccionAnualAdqServPublicDTO){
        return historialProyeccionAnualAdqServPublicService.actualizarHistorialProyeccionAnualAdqServPublic(historialProyeccionAnualAdqServPublicDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesProyeccionesAnualesAdqServPublic/{idHistorialProyeccionAnualAdqServPublic}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialProyeccionAnualAdqServPublic(@PathVariable Long idHistorialProyeccionAnualAdqServPublic){
        return historialProyeccionAnualAdqServPublicService.eliminarHistorialProyeccionAnualAdqServPublic(idHistorialProyeccionAnualAdqServPublic);
    }
}
