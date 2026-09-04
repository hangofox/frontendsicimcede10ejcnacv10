//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialOrdenApoyoMovimientoTropaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialOrdenApoyoMovimientoTropaService;
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
public class HistorialOrdenApoyoMovimientoTropaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialOrdenApoyoMovimientoTropaService historialOrdenApoyoMovimientoTropaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesOrdenesApoyosMovimientosTropas/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialOrdenApoyoMovimientoTropa,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialOrdenApoyoMovimientoTropaService.contarTotalRegistros(idHistorialOrdenApoyoMovimientoTropa, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesOrdenesApoyosMovimientosTropas/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialOrdenApoyoMovimientoTropaDTO>> listarHistorialesOrdenesApoyosMovimientosTropasLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialOrdenApoyoMovimientoTropa,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialOrdenApoyoMovimientoTropaService.listarHistorialesOrdenesApoyosMovimientosTropas(idHistorialOrdenApoyoMovimientoTropa, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES CON QUERY PARAMS:
    @GetMapping("/historialesOrdenesApoyosMovimientosTropas/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialOrdenApoyoMovimientoTropaDTO>> listarHistorialesOrdenesApoyosMovimientosTropasListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialOrdenApoyoMovimientoTropa,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialOrdenApoyoMovimientoTropaService.listarHistorialesOrdenesApoyosMovimientosTropasPag(pageable, idHistorialOrdenApoyoMovimientoTropa, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesOrdenesApoyosMovimientosTropas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialOrdenApoyoMovimientoTropa(@RequestBody HistorialOrdenApoyoMovimientoTropaDTO historialOrdenApoyoMovimientoTropaDTO){
        return historialOrdenApoyoMovimientoTropaService.crearHistorialOrdenApoyoMovimientoTropa(historialOrdenApoyoMovimientoTropaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesOrdenesApoyosMovimientosTropas/{idHistorialOrdenApoyoMovimientoTropa}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialOrdenApoyoMovimientoTropabyId(@PathVariable Long idHistorialOrdenApoyoMovimientoTropa){
        return historialOrdenApoyoMovimientoTropaService.consultarHistorialOrdenApoyoMovimientoTropaporId(idHistorialOrdenApoyoMovimientoTropa);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO (CAMPO ÚNICO):
    @GetMapping("/historialesOrdenesApoyosMovimientosTropas/numeroRegistro/{numRegHistorialOrdenApoyoMovimientoTropa}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarHistorialOrdenApoyoMovimientoTropaporNumReg(@PathVariable String numRegHistorialOrdenApoyoMovimientoTropa) {
        return historialOrdenApoyoMovimientoTropaService.consultarHistorialOrdenApoyoMovimientoTropaporNumReg(numRegHistorialOrdenApoyoMovimientoTropa);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesOrdenesApoyosMovimientosTropas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialOrdenApoyoMovimientoTropa(@RequestBody HistorialOrdenApoyoMovimientoTropaDTO historialOrdenApoyoMovimientoTropaDTO){
        return historialOrdenApoyoMovimientoTropaService.actualizarHistorialOrdenApoyoMovimientoTropa(historialOrdenApoyoMovimientoTropaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesOrdenesApoyosMovimientosTropas/{idHistorialOrdenApoyoMovimientoTropa}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialOrdenApoyoMovimientoTropa(@PathVariable Long idHistorialOrdenApoyoMovimientoTropa){
        return historialOrdenApoyoMovimientoTropaService.eliminarHistorialOrdenApoyoMovimientoTropa(idHistorialOrdenApoyoMovimientoTropa);
    }
}
