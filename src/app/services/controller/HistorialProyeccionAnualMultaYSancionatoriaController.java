//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialProyeccionAnualMultaYSancionatoriaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialProyeccionAnualMultaYSancionatoriaService;
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
public class HistorialProyeccionAnualMultaYSancionatoriaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialProyeccionAnualMultaYSancionatoriaService historialProyeccionAnualMultaYSancionatoriaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesProyeccionesAnualesMultasYSancionatorias/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialProyeccionAnualMultaYSancionatoria,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialProyeccionAnualMultaYSancionatoriaService.contarTotalRegistros(idHistorialProyeccionAnualMultaYSancionatoria, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesProyeccionesAnualesMultasYSancionatorias/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialProyeccionAnualMultaYSancionatoriaDTO>> listarHistorialesProyeccionesAnualesMultasYSancionatoriasLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialProyeccionAnualMultaYSancionatoria,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialProyeccionAnualMultaYSancionatoriaService.listarHistorialesProyeccionesAnualesMultasYSancionatorias(idHistorialProyeccionAnualMultaYSancionatoria, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES CON QUERY PARAMS:
    @GetMapping("/historialesProyeccionesAnualesMultasYSancionatorias/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialProyeccionAnualMultaYSancionatoriaDTO>> listarHistorialesProyeccionesAnualesMultasYSancionatoriasListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialProyeccionAnualMultaYSancionatoria,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialProyeccionAnualMultaYSancionatoriaService.listarHistorialesProyeccionesAnualesMultasYSancionatoriasPag(pageable, idHistorialProyeccionAnualMultaYSancionatoria, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesProyeccionesAnualesMultasYSancionatorias")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialProyeccionAnualMultaYSancionatoria(@RequestBody HistorialProyeccionAnualMultaYSancionatoriaDTO historialProyeccionAnualMultaYSancionatoriaDTO){
        return historialProyeccionAnualMultaYSancionatoriaService.crearHistorialProyeccionAnualMultaYSancionatoria(historialProyeccionAnualMultaYSancionatoriaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesProyeccionesAnualesMultasYSancionatorias/{idHistorialProyeccionAnualMultaYSancionatoria}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialProyeccionAnualMultaYSancionatoriabyId(@PathVariable Long idHistorialProyeccionAnualMultaYSancionatoria){
        return historialProyeccionAnualMultaYSancionatoriaService.consultarHistorialProyeccionAnualMultaYSancionatoriaporId(idHistorialProyeccionAnualMultaYSancionatoria);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO (CAMPO ÚNICO):
    @GetMapping("/historialesProyeccionesAnualesMultasYSancionatorias/numReg")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarHistorialProyeccionAnualMultaYSancionatoriaporNumReg(
            @RequestParam(required = false) String numRegHistorialProyeccionAnualMultaYSancionatoria) {
        return historialProyeccionAnualMultaYSancionatoriaService.consultarHistorialProyeccionAnualMultaYSancionatoriaporNumReg(numRegHistorialProyeccionAnualMultaYSancionatoria);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesProyeccionesAnualesMultasYSancionatorias")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialProyeccionAnualMultaYSancionatoria(@RequestBody HistorialProyeccionAnualMultaYSancionatoriaDTO historialProyeccionAnualMultaYSancionatoriaDTO){
        return historialProyeccionAnualMultaYSancionatoriaService.actualizarHistorialProyeccionAnualMultaYSancionatoria(historialProyeccionAnualMultaYSancionatoriaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesProyeccionesAnualesMultasYSancionatorias/{idHistorialProyeccionAnualMultaYSancionatoria}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialProyeccionAnualMultaYSancionatoria(@PathVariable Long idHistorialProyeccionAnualMultaYSancionatoria){
        return historialProyeccionAnualMultaYSancionatoriaService.eliminarHistorialProyeccionAnualMultaYSancionatoria(idHistorialProyeccionAnualMultaYSancionatoria);
    }
}
