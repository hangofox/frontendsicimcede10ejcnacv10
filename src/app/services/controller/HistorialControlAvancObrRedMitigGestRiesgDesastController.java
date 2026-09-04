//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialControlAvancObrRedMitigGestRiesgDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialControlAvancObrRedMitigGestRiesgDesastService;
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
public class HistorialControlAvancObrRedMitigGestRiesgDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialControlAvancObrRedMitigGestRiesgDesastService historialControlAvancObrRedMitigGestRiesgDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesControlesAvancsObrRedMitigGestRiesgDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialControlAvancObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialControlAvancObrRedMitigGestRiesgDesastService.contarTotalRegistros(idHistorialControlAvancObrRedMitigGestRiesgDesast, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesControlesAvancsObrRedMitigGestRiesgDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialControlAvancObrRedMitigGestRiesgDesastDTO>> listarHistorialesControlesAvancsObrRedMitigGestRiesgDesastLista(
            @RequestParam(required = false) Long idHistorialControlAvancObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialControlAvancObrRedMitigGestRiesgDesastService.listarHistorialesControlesAvancsObrRedMitigGestRiesgDesast(idHistorialControlAvancObrRedMitigGestRiesgDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES CON QUERY PARAMS:
    @GetMapping("/historialesControlesAvancsObrRedMitigGestRiesgDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialControlAvancObrRedMitigGestRiesgDesastDTO>> listarHistorialesControlesAvancsObrRedMitigGestRiesgDesastListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialControlAvancObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialControlAvancObrRedMitigGestRiesgDesastService.listarHistorialesControlesAvancsObrRedMitigGestRiesgDesastPag(pageable, idHistorialControlAvancObrRedMitigGestRiesgDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesControlesAvancsObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialControlAvancObrRedMitigGestRiesgDesast(@RequestBody HistorialControlAvancObrRedMitigGestRiesgDesastDTO historialControlAvancObrRedMitigGestRiesgDesastDTO){
        return historialControlAvancObrRedMitigGestRiesgDesastService.crearHistorialControlAvancObrRedMitigGestRiesgDesast(historialControlAvancObrRedMitigGestRiesgDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesControlesAvancsObrRedMitigGestRiesgDesast/{idHistorialControlAvancObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialControlAvancObrRedMitigGestRiesgDesastbyId(@PathVariable Long idHistorialControlAvancObrRedMitigGestRiesgDesast){
        return historialControlAvancObrRedMitigGestRiesgDesastService.consultarHistorialControlAvancObrRedMitigGestRiesgDesastporId(idHistorialControlAvancObrRedMitigGestRiesgDesast);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO (CAMPO ÚNICO):
    @GetMapping("/historialesControlesAvancsObrRedMitigGestRiesgDesast/numeroRegistro/{numRegHistorialControlAvancObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarHistorialControlAvancObrRedMitigGestRiesgDesastporNumReg(@PathVariable String numRegHistorialControlAvancObrRedMitigGestRiesgDesast) {
        return historialControlAvancObrRedMitigGestRiesgDesastService.consultarHistorialControlAvancObrRedMitigGestRiesgDesastporNumReg(numRegHistorialControlAvancObrRedMitigGestRiesgDesast);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesControlesAvancsObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialControlAvancObrRedMitigGestRiesgDesast(@RequestBody HistorialControlAvancObrRedMitigGestRiesgDesastDTO historialControlAvancObrRedMitigGestRiesgDesastDTO){
        return historialControlAvancObrRedMitigGestRiesgDesastService.actualizarHistorialControlAvancObrRedMitigGestRiesgDesast(historialControlAvancObrRedMitigGestRiesgDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesControlesAvancsObrRedMitigGestRiesgDesast/{idHistorialControlAvancObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialControlAvancObrRedMitigGestRiesgDesast(@PathVariable Long idHistorialControlAvancObrRedMitigGestRiesgDesast){
        return historialControlAvancObrRedMitigGestRiesgDesastService.eliminarHistorialControlAvancObrRedMitigGestRiesgDesast(idHistorialControlAvancObrRedMitigGestRiesgDesast);
    }
}
