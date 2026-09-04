//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProveedorProductoOServicioDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProveedorProductoOServicioService;
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
* @Since 27/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ProveedorProductoOServicioController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProveedorProductoOServicioService proveedorProductoOServicioService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS.
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proveedoresProductosOServicios/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProveedorProductoOServicio,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proveedorProductoOServicioService.contarTotalRegistros(idProveedorProductoOServicio, estado, keyword), HttpStatus.OK);
    }

    //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
    //ENDPOINT PARA LISTAR TODOS LOS PROVEEDORES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proveedoresProductosOServicios/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProveedorProductoOServicioDTO>> listarProveedoresProductosOServiciosLista(
            @RequestParam(required = false) Long idProveedorProductoOServicio,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(proveedorProductoOServicioService.listarProveedoresProductosOServicios(idProveedorProductoOServicio, estado, keyword, orderBy, orderMode), HttpStatus.OK);
    }

    //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROVEEDORES CON QUERY PARAMS:
    @GetMapping("/proveedoresProductosOServicios/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProveedorProductoOServicioDTO>> listarProveedoresProductosOServiciosListaPag(
            @RequestParam(required = false) Long idProveedorProductoOServicio,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proveedorProductoOServicioService.listarProveedoresProductosOServiciosPag(pageable, idProveedorProductoOServicio, estado, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proveedoresProductosOServicios")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProveedorProductoOServicio(@RequestBody ProveedorProductoOServicioDTO proveedorProductoOServicioDTO){
        System.out.println(proveedorProductoOServicioDTO);
        return proveedorProductoOServicioService.crearProveedorProductoOServicio(proveedorProductoOServicioDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proveedoresProductosOServicios/{idProveedorProductoOServicio}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProveedorProductoOServiciobyId(@PathVariable Long idProveedorProductoOServicio){
        return proveedorProductoOServicioService.consultarProveedorProductoOServicioporId(idProveedorProductoOServicio);
    }
    
    //LEER CONSULTA DE REGISTRO POR NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN:
    @GetMapping("/proveedoresProductosOServicios/numeroDocumento/{numeroDocumentoIdentificacionProvProdOServ}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN.
    public RespuestaDTO consultarProveedorProductoOServiciobyNumeroDocumentoIdentificacion(@PathVariable String numeroDocumentoIdentificacionProvProdOServ){
        return proveedorProductoOServicioService.consultarProveedorProductoOServicioporNumeroDocumentoIdentificacion(numeroDocumentoIdentificacionProvProdOServ);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/proveedoresProductosOServicios")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProveedorProductoOServicio(@RequestBody ProveedorProductoOServicioDTO proveedorProductoOServicioDTO){
        return proveedorProductoOServicioService.actualizarProveedorProductoOServicio(proveedorProductoOServicioDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proveedoresProductosOServicios/{idProveedorProductoOServicio}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProveedorProductoOServicio(@PathVariable Long idProveedorProductoOServicio){
        return proveedorProductoOServicioService.eliminarProveedorProductoOServicio(idProveedorProductoOServicio);
    }
}
