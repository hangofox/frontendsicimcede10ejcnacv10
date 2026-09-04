//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialProyeccionMunicionEspecialDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialProyeccionMunicionEspecialService;
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
* @Since 14/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class HistorialProyeccionMunicionEspecialController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialProyeccionMunicionEspecialService historialProyeccionMunicionEspecialService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesProyeccionesMunicionesEspeciales/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialProyeccionMunicionEspecial,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialProyeccionMunicionEspecialService.contarTotalRegistros(idHistorialProyeccionMunicionEspecial, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesProyeccionesMunicionesEspeciales/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialProyeccionMunicionEspecialDTO>> listarHistorialesProyeccionesMunicionesEspecialesLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialProyeccionMunicionEspecial,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialProyeccionMunicionEspecialService.listarHistorialesProyeccionesMunicionesEspeciales(idHistorialProyeccionMunicionEspecial, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES CON QUERY PARAMS:
    @GetMapping("/historialesProyeccionesMunicionesEspeciales/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialProyeccionMunicionEspecialDTO>> listarHistorialesProyeccionesMunicionesEspecialesListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialProyeccionMunicionEspecial,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialProyeccionMunicionEspecialService.listarHistorialesProyeccionesMunicionesEspecialesPag(pageable, idHistorialProyeccionMunicionEspecial, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesProyeccionesMunicionesEspeciales")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialProyeccionMunicionEspecial(@RequestBody HistorialProyeccionMunicionEspecialDTO historialProyeccionMunicionEspecialDTO){
        return historialProyeccionMunicionEspecialService.crearHistorialProyeccionMunicionEspecial(historialProyeccionMunicionEspecialDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesProyeccionesMunicionesEspeciales/{idHistorialProyeccionMunicionEspecial}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialProyeccionMunicionEspecialbyId(@PathVariable Long idHistorialProyeccionMunicionEspecial){
        return historialProyeccionMunicionEspecialService.consultarHistorialProyeccionMunicionEspecialportId(idHistorialProyeccionMunicionEspecial);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO (CAMPO ÚNICO):
    @GetMapping("/historialesProyeccionesMunicionesEspeciales/numReg")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarHistorialProyeccionMunicionEspecialportNumReg(
            @RequestParam(required = false) String numRegHistorialProyeccionMunicionEspecial) {
        return historialProyeccionMunicionEspecialService.consultarHistorialProyeccionMunicionEspecialportNumReg(numRegHistorialProyeccionMunicionEspecial);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesProyeccionesMunicionesEspeciales")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialProyeccionMunicionEspecial(@RequestBody HistorialProyeccionMunicionEspecialDTO historialProyeccionMunicionEspecialDTO){
        return historialProyeccionMunicionEspecialService.actualizarHistorialProyeccionMunicionEspecial(historialProyeccionMunicionEspecialDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesProyeccionesMunicionesEspeciales/{idHistorialProyeccionMunicionEspecial}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialProyeccionMunicionEspecial(@PathVariable Long idHistorialProyeccionMunicionEspecial){
        return historialProyeccionMunicionEspecialService.eliminarHistorialProyeccionMunicionEspecial(idHistorialProyeccionMunicionEspecial);
    }
}
