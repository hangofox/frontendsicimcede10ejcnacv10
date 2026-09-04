//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialPagoAnualImpuestoTerrenoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialPagoAnualImpuestoTerrenoService;
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
public class HistorialPagoAnualImpuestoTerrenoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialPagoAnualImpuestoTerrenoService historialPagoAnualImpuestoTerrenoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesPagosAnualesImpuestosTerrenos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialPagoAnualImpuestoTerreno,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialPagoAnualImpuestoTerrenoService.contarTotalRegistros(idHistorialPagoAnualImpuestoTerreno, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesPagosAnualesImpuestosTerrenos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialPagoAnualImpuestoTerrenoDTO>> listarHistorialesPagosAnualesImpuestosLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialPagoAnualImpuestoTerreno,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialPagoAnualImpuestoTerrenoService.listarHistorialesPagosAnualesImpuestosTerrenos(idHistorialPagoAnualImpuestoTerreno, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES CON QUERY PARAMS:
    @GetMapping("/historialesPagosAnualesImpuestosTerrenos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialPagoAnualImpuestoTerrenoDTO>> listarHistorialesPagosAnualesImpuestosListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialPagoAnualImpuestoTerreno,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialPagoAnualImpuestoTerrenoService.listarHistorialesPagosAnualesImpuestosTerminosPag(pageable, idHistorialPagoAnualImpuestoTerreno, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesPagosAnualesImpuestosTerrenos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialPagoAnualImpuestoTerreno(@RequestBody HistorialPagoAnualImpuestoTerrenoDTO historialPagoAnualImpuestoTerrenoDTO){
        return historialPagoAnualImpuestoTerrenoService.crearHistorialPagoAnualImpuestoTerreno(historialPagoAnualImpuestoTerrenoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesPagosAnualesImpuestosTerrenos/{idHistorialPagoAnualImpuestoTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialPagoAnualImpuestoTerrenobyId(@PathVariable Long idHistorialPagoAnualImpuestoTerreno){
        return historialPagoAnualImpuestoTerrenoService.consultarHistorialPagoAnualImpuestoTerrenoportId(idHistorialPagoAnualImpuestoTerreno);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO (CAMPO ÚNICO):
    @GetMapping("/historialesPagosAnualesImpuestosTerrenos/numeroRegistro/{numRegHistorialPagoAnualImpuestoTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarHistorialPagoAnualImpuestoTerrenoportNumReg(@PathVariable String numRegHistorialPagoAnualImpuestoTerreno) {
        return historialPagoAnualImpuestoTerrenoService.consultarHistorialPagoAnualImpuestoTerrenoportNumReg(numRegHistorialPagoAnualImpuestoTerreno);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesPagosAnualesImpuestosTerrenos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialPagoAnualImpuestoTerreno(@RequestBody HistorialPagoAnualImpuestoTerrenoDTO historialPagoAnualImpuestoTerrenoDTO){
        return historialPagoAnualImpuestoTerrenoService.actualizarHistorialPagoAnualImpuestoTerreno(historialPagoAnualImpuestoTerrenoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesPagosAnualesImpuestosTerrenos/{idHistorialPagoAnualImpuestoTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialPagoAnualImpuestoTerreno(@PathVariable Long idHistorialPagoAnualImpuestoTerreno){
        return historialPagoAnualImpuestoTerrenoService.eliminarHistorialPagoAnualImpuestoTerreno(idHistorialPagoAnualImpuestoTerreno);
    }
}
