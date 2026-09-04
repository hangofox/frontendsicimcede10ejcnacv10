//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialMantenimientoInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialMantenimientoInfraestructuraService;
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
public class HistorialMantenimientoInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialMantenimientoInfraestructuraService historialMantenimientoInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesMantenimientosInfraestructuras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialMantenimientoInfraestructura,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialMantenimientoInfraestructuraService.contarTotalRegistros(idHistorialMantenimientoInfraestructura, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES MANTENIMIENTOS INFRAESTRUCTURAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesMantenimientosInfraestructuras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialMantenimientoInfraestructuraDTO>> listarHistorialesMantenimientosInfraestructurasLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialMantenimientoInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialMantenimientoInfraestructuraService.listarHistorialesMantenimientosInfraestructuras(idHistorialMantenimientoInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES MANTENIMIENTOS INFRAESTRUCTURAS CON QUERY PARAMS:
    @GetMapping("/historialesMantenimientosInfraestructuras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialMantenimientoInfraestructuraDTO>> listarHistorialesMantenimientosInfraestructurasListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialMantenimientoInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialMantenimientoInfraestructuraService.listarHistorialesMantenimientosInfraestructurasPag(pageable, idHistorialMantenimientoInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesMantenimientosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/historialesMantenimientosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialMantenimientoInfraestructura(@RequestBody HistorialMantenimientoInfraestructuraDTO historialMantenimientoInfraestructuraDTO){
        System.out.println(historialMantenimientoInfraestructuraDTO);
        return historialMantenimientoInfraestructuraService.crearHistorialMantenimientoInfraestructura(historialMantenimientoInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesMantenimientosInfraestructuras/{idHistorialMantenimientoInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialMantenimientoInfraestructurabyId(@PathVariable Long idHistorialMantenimientoInfraestructura){
        return historialMantenimientoInfraestructuraService.consultarHistorialMantenimientoInfraestructuraporId(idHistorialMantenimientoInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO:
    @GetMapping("/historialesMantenimientosInfraestructuras/numReg")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NUMERO DE REGISTRO.
    public RespuestaDTO consultarHistorialMantenimientoInfraestructurabyNumReg(@RequestParam(required = false) String numRegHistorialMantenimientoInfraestructura){
        return historialMantenimientoInfraestructuraService.consultarHistorialMantenimientoInfraestructuraporNumReg(numRegHistorialMantenimientoInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/historialesMantenimientosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/historialesMantenimientosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialMantenimientoInfraestructura(@RequestBody HistorialMantenimientoInfraestructuraDTO historialMantenimientoInfraestructuraDTO){
        return historialMantenimientoInfraestructuraService.actualizarHistorialMantenimientoInfraestructura(historialMantenimientoInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesMantenimientosInfraestructuras/{idHistorialMantenimientoInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialMantenimientoInfraestructura(@PathVariable Long idHistorialMantenimientoInfraestructura){
        return historialMantenimientoInfraestructuraService.eliminarHistorialMantenimientoInfraestructura(idHistorialMantenimientoInfraestructura);
    }
}
