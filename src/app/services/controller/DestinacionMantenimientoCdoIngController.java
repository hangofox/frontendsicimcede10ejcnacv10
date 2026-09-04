//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.DestinacionMantenimientoCdoIngDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.DestinacionMantenimientoCdoIngService;
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
* @Since 22/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class DestinacionMantenimientoCdoIngController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private DestinacionMantenimientoCdoIngService destinacionMantenimientoCdoIngService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE DESTINACIONES MANTENIMIENTOS CDOS ING:
    @GetMapping("/destinacionesMantenimientosCdosIng/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idDestinacionMantenimientoCdoIng,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(destinacionMantenimientoCdoIngService.contarTotalRegistros(idDestinacionMantenimientoCdoIng, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS DESTINACIONES MANTENIMIENTOS CDOS ING SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/destinacionesMantenimientosCdosIng/lista")
    public ResponseEntity<List<DestinacionMantenimientoCdoIngDTO>> listarDestinacionesMantenimientosCdosIngLista(
            @RequestParam(required = false) Long idDestinacionMantenimientoCdoIng,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(destinacionMantenimientoCdoIngService.listarDestinacionesMantenimientosCdosIng(idDestinacionMantenimientoCdoIng, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR DESTINACIONES MANTENIMIENTOS CDOS ING CON QUERY PARAMS:
    @GetMapping("/destinacionesMantenimientosCdosIng/listaPag")
    public ResponseEntity<Slice<DestinacionMantenimientoCdoIngDTO>> listarDestinacionesMantenimientosCdosIng(
            @RequestParam(required = false) Long idDestinacionMantenimientoCdoIng,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(destinacionMantenimientoCdoIngService.listarDestinacionesMantenimientosCdosIngOrdenadosporIdPag(pageable, idDestinacionMantenimientoCdoIng, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/destinacionesMantenimientosCdosIng")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/destinacionesMantenimientosCdosIng")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTRecurso(@RequestBody DestinacionMantenimientoCdoIngDTO destinacionMantenimientoCdoIngDTO){
        System.out.println(destinacionMantenimientoCdoIngDTO);
        return destinacionMantenimientoCdoIngService.crearDestinacionMantenimientoCdoIng(destinacionMantenimientoCdoIngDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/destinacionesMantenimientosCdosIng/{idDestinacionMantenimientoCdoIng}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTRecursobyId(@PathVariable Long idDestinacionMantenimientoCdoIng){
        return destinacionMantenimientoCdoIngService.consultarDestinacionMantenimientoCdoIngporId(idDestinacionMantenimientoCdoIng);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/destinacionesMantenimientosCdosIng/nombre/{nombreDestinacionMantenimientoCdoIng}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTRecursobyNombre(@PathVariable String nombreDestinacionMantenimientoCdoIng){
        return destinacionMantenimientoCdoIngService.consultarDestinacionMantenimientoCdoIngporNombre(nombreDestinacionMantenimientoCdoIng);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/destinacionesMantenimientosCdosIng")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/destinacionesMantenimientosCdosIng")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTRecurso(@RequestBody DestinacionMantenimientoCdoIngDTO destinacionMantenimientoCdoIngDTO){
        return destinacionMantenimientoCdoIngService.actualizarDestinacionMantenimientoCdoIng(destinacionMantenimientoCdoIngDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/destinacionesMantenimientosCdosIng/{idDestinacionMantenimientoCdoIng}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTRecurso(@PathVariable Long idDestinacionMantenimientoCdoIng){
        return destinacionMantenimientoCdoIngService.eliminarDestinacionMantenimientoCdoIng(idDestinacionMantenimientoCdoIng);
    }
}
