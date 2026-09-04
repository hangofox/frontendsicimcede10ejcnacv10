//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoMantenimientoEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoMantenimientoEquipoIngenieroService;
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
public class TipoMantenimientoEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoMantenimientoEquipoIngenieroService tipoMantenimientoEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposMantenimientosEquiposIngenieros/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(tipoMantenimientoEquipoIngenieroService.contarTotalRegistros(idTipoMantenimientoEquipoIngeniero, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS MANTENIMIENTO EQUIPO INGENIERO SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/tiposMantenimientosEquiposIngenieros/lista")
    public ResponseEntity<List<TipoMantenimientoEquipoIngenieroDTO>> listarTiposMantenimientosEquiposIngenieroLista(
            @RequestParam(required = false) Long idTipoMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(tipoMantenimientoEquipoIngenieroService.listarTiposMantenimientosEquiposIngenieros(idTipoMantenimientoEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS MANTENIMIENTO EQUIPO INGENIERO CON QUERY PARAMS:
    @GetMapping("/tiposMantenimientosEquiposIngenieros/listaPag")
    public ResponseEntity<Slice<TipoMantenimientoEquipoIngenieroDTO>> listarTiposMantenimientosEquiposIngenieros(
            @RequestParam(required = false) Long idTipoMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoMantenimientoEquipoIngenieroService.listarTiposMantenimientosEquiposIngenierosPag(pageable, idTipoMantenimientoEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoMantenimientoEquipoIngeniero(@RequestBody TipoMantenimientoEquipoIngenieroDTO tipoMantenimientoEquipoIngenieroDTO){
        System.out.println(tipoMantenimientoEquipoIngenieroDTO);
        return tipoMantenimientoEquipoIngenieroService.crearTipoMantenimientoEquipoIngeniero(tipoMantenimientoEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposMantenimientosEquiposIngenieros/{idTipoMantenimientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoMantenimientoEquipoIngenierobyId(@PathVariable Long idTipoMantenimientoEquipoIngeniero){
        return tipoMantenimientoEquipoIngenieroService.consultarTipoMantenimientoEquipoIngenieroporId(idTipoMantenimientoEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposMantenimientosEquiposIngenieros/nombre/{nombreTipoMantenimientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoMantenimientoEquipoIngenierobyNombre(@PathVariable String nombreTipoMantenimientoEquipoIngeniero){
        return tipoMantenimientoEquipoIngenieroService.consultarTipoMantenimientoEquipoIngenieroporNombre(nombreTipoMantenimientoEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoMantenimientoEquipoIngeniero(@RequestBody TipoMantenimientoEquipoIngenieroDTO tipoMantenimientoEquipoIngenieroDTO){
        return tipoMantenimientoEquipoIngenieroService.actualizarTipoMantenimientoEquipoIngeniero(tipoMantenimientoEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposMantenimientosEquiposIngenieros/{idTipoMantenimientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoMantenimientoEquipoIngeniero(@PathVariable Long idTipoMantenimientoEquipoIngeniero){
        return tipoMantenimientoEquipoIngenieroService.eliminarTipoMantenimientoEquipoIngeniero(idTipoMantenimientoEquipoIngeniero);
    }
}
