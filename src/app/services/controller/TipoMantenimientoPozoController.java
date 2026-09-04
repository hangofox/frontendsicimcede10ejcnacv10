//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoMantenimientoPozoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoMantenimientoPozoService;
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
* @Since 01/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class TipoMantenimientoPozoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoMantenimientoPozoService tipoMantenimientoPozoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposMantenimientosPozos/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoMantenimientoPozo,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(tipoMantenimientoPozoService.contarTotalRegistros(idTipoMantenimientoPozo, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS MANTENIMIENTO POZO SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/tiposMantenimientosPozos/lista")
    public ResponseEntity<List<TipoMantenimientoPozoDTO>> listarTiposMantenimientosPozosLista(
            @RequestParam(required = false) Long idTipoMantenimientoPozo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(tipoMantenimientoPozoService.listarTiposMantenimientosPozos(idTipoMantenimientoPozo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS MANTENIMIENTO POZO CON QUERY PARAMS:
    @GetMapping("/tiposMantenimientosPozos/listaPag")
    public ResponseEntity<Slice<TipoMantenimientoPozoDTO>> listarTiposMantenimientosPozos(
            @RequestParam(required = false) Long idTipoMantenimientoPozo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoMantenimientoPozoService.listarTiposMantenimientosPozosPag(pageable, idTipoMantenimientoPozo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposMantenimientosPozos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoMantenimientoPozo(@RequestBody TipoMantenimientoPozoDTO tipoMantenimientoPozoDTO){
        System.out.println(tipoMantenimientoPozoDTO);
        return tipoMantenimientoPozoService.crearTipoMantenimientoPozo(tipoMantenimientoPozoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposMantenimientosPozos/{idTipoMantenimientoPozo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoMantenimientoPozobyId(@PathVariable Long idTipoMantenimientoPozo){
        return tipoMantenimientoPozoService.consultarTipoMantenimientoPozoporId(idTipoMantenimientoPozo);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposMantenimientosPozos/nombre/{nombreTipoMantenimientoPozo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoMantenimientoPozobyNombre(@PathVariable String nombreTipoMantenimientoPozo){
        return tipoMantenimientoPozoService.consultarTipoMantenimientoPozoporNombre(nombreTipoMantenimientoPozo);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposMantenimientosPozos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoMantenimientoPozo(@RequestBody TipoMantenimientoPozoDTO tipoMantenimientoPozoDTO){
        return tipoMantenimientoPozoService.actualizarTipoMantenimientoPozo(tipoMantenimientoPozoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposMantenimientosPozos/{idTipoMantenimientoPozo}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoMantenimientoPozo(@PathVariable Long idTipoMantenimientoPozo){
        return tipoMantenimientoPozoService.eliminarTipoMantenimientoPozo(idTipoMantenimientoPozo);
    }
}
