//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialMantenimientoEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialMantenimientoEquipoIngenieroService;
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
* @Since 15/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class HistorialMantenimientoEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialMantenimientoEquipoIngenieroService historialMantenimientoEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesMantenimientosEquiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialMantenimientoEquipoIngenieroService.contarTotalRegistros(idHistorialMantenimientoEquipoIngeniero, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES MANTENIMIENTOS EQUIPOS INGENIEROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesMantenimientosEquiposIngenieros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialMantenimientoEquipoIngenieroDTO>> listarHistorialesMantenimientosEquiposIngenierosTodos(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialMantenimientoEquipoIngenieroService.listarHistorialesMantenimientosEquiposIngenieros(idHistorialMantenimientoEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES MANTENIMIENTOS EQUIPOS INGENIEROS CON QUERY PARAMS:
    @GetMapping("/historialesMantenimientosEquiposIngenieros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialMantenimientoEquipoIngenieroDTO>> listarHistorialesMantenimientosEquiposIngenierosListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialMantenimientoEquipoIngenieroService.listarHistorialesMantenimientosEquiposIngenierosPag(pageable, idHistorialMantenimientoEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/historialesMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialMantenimientoEquipoIngeniero(@RequestBody HistorialMantenimientoEquipoIngenieroDTO historialMantenimientoEquipoIngenieroDTO){
        System.out.println(historialMantenimientoEquipoIngenieroDTO);
        return historialMantenimientoEquipoIngenieroService.crearHistorialMantenimientoEquipoIngeniero(historialMantenimientoEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesMantenimientosEquiposIngenieros/{idHistorialMantenimientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialMantenimientoEquipoIngenierobyId(@PathVariable Long idHistorialMantenimientoEquipoIngeniero){
        return historialMantenimientoEquipoIngenieroService.consultarHistorialMantenimientoEquipoIngenieroporId(idHistorialMantenimientoEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO:
    @GetMapping("/historialesMantenimientosEquiposIngenieros/numReg")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NUMERO DE REGISTRO.
    public RespuestaDTO consultarHistorialMantenimientoEquipoIngenierobyNumReg(@RequestParam(required = false) String numRegHistorialMantenimientoEquipoIngeniero){
        return historialMantenimientoEquipoIngenieroService.consultarHistorialMantenimientoEquipoIngenieroporNumReg(numRegHistorialMantenimientoEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/historialesMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/historialesMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialMantenimientoEquipoIngeniero(@RequestBody HistorialMantenimientoEquipoIngenieroDTO historialMantenimientoEquipoIngenieroDTO){
        return historialMantenimientoEquipoIngenieroService.actualizarHistorialMantenimientoEquipoIngeniero(historialMantenimientoEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesMantenimientosEquiposIngenieros/{idHistorialMantenimientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialMantenimientoEquipoIngeniero(@PathVariable Long idHistorialMantenimientoEquipoIngeniero){
        return historialMantenimientoEquipoIngenieroService.eliminarHistorialMantenimientoEquipoIngeniero(idHistorialMantenimientoEquipoIngeniero);
    }
}
