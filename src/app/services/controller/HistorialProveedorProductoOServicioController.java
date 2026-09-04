//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialProveedorProductoOServicioDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialProveedorProductoOServicioService;
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
* @Since 02/06/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class HistorialProveedorProductoOServicioController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialProveedorProductoOServicioService historialProveedorProductoOServicioService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesProveedoresProductosOServicios/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialProveedorProductoOServicio,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialProveedorProductoOServicioService.contarTotalRegistros(idHistorialProveedorProductoOServicio, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES PROVEEDORES PRODUCTOS O SERVICIOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesProveedoresProductosOServicios/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialProveedorProductoOServicioDTO>> listarHistorialesProveedoresProductosOServiciosLista(
            @RequestParam(required = false) Long idHistorialProveedorProductoOServicio,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialProveedorProductoOServicioService.listarHistorialesProveedoresProductosOServicios(idHistorialProveedorProductoOServicio, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES PROVEEDORES PRODUCTOS O SERVICIOS CON QUERY PARAMS:
    @GetMapping("/historialesProveedoresProductosOServicios/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialProveedorProductoOServicioDTO>> listarHistorialesProveedoresProductosOServiciosListaPag(
            @RequestParam(required = false) Long idHistorialProveedorProductoOServicio,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialProveedorProductoOServicioService.listarHistorialesProveedoresProductosOServiciosPag(pageable, idHistorialProveedorProductoOServicio, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesProveedoresProductosOServicios")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialProveedorProductoOServicio(@RequestBody HistorialProveedorProductoOServicioDTO historialProveedorProductoOServicioDTO){
        System.out.println(historialProveedorProductoOServicioDTO);
        return historialProveedorProductoOServicioService.crearHistorialProveedorProductoOServicio(historialProveedorProductoOServicioDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesProveedoresProductosOServicios/{idHistorialProveedorProductoOServicio}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialProveedorProductoOServiciobyId(@PathVariable Long idHistorialProveedorProductoOServicio){
        return historialProveedorProductoOServicioService.consultarHistorialProveedorProductoOServicioporId(idHistorialProveedorProductoOServicio);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO (CAMPO ÚNICO):
    @GetMapping("/historialesProveedoresProductosOServicios/numeroRegistro/{numRegHistorialProveedorProductoOServicio}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarHistorialProveedorProductoOServiciobyNumReg(@PathVariable String numRegHistorialProveedorProductoOServicio) {
        return historialProveedorProductoOServicioService.consultarHistorialProveedorProductoOServicioporNumReg(numRegHistorialProveedorProductoOServicio);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/historialesProveedoresProductosOServicios")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialProveedorProductoOServicio(@RequestBody HistorialProveedorProductoOServicioDTO historialProveedorProductoOServicioDTO){
        return historialProveedorProductoOServicioService.actualizarHistorialProveedorProductoOServicio(historialProveedorProductoOServicioDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesProveedoresProductosOServicios/{idHistorialProveedorProductoOServicio}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialProveedorProductoOServicio(@PathVariable Long idHistorialProveedorProductoOServicio){
        return historialProveedorProductoOServicioService.eliminarHistorialProveedorProductoOServicio(idHistorialProveedorProductoOServicio);
    }
}
