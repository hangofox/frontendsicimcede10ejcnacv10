//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ClasificacionEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ClasificacionEquipoIngenieroService;
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
public class ClasificacionEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ClasificacionEquipoIngenieroService clasificacionEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/clasificacionesEquiposIngenieros/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idClasificacionEquipoIngeniero,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(clasificacionEquipoIngenieroService.contarTotalRegistros(idClasificacionEquipoIngeniero, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS EQUIPO INGENIERO SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/clasificacionesEquiposIngenieros/lista")
    public ResponseEntity<List<ClasificacionEquipoIngenieroDTO>> listarClasificacionesEquiposIngenieroLista(
            @RequestParam(required = false) Long idClasificacionEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(clasificacionEquipoIngenieroService.listarClasificacionesEquiposIngenieros(idClasificacionEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS EQUIPO INGENIERO CON QUERY PARAMS:
    @GetMapping("/clasificacionesEquiposIngenieros/listaPag")
    public ResponseEntity<Slice<ClasificacionEquipoIngenieroDTO>> listarClasificacionesEquiposIngenieros(
            @RequestParam(required = false) Long idClasificacionEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(clasificacionEquipoIngenieroService.listarClasificacionesEquiposIngenierosPag(pageable, idClasificacionEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/clasificacionesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearClasificacionEquipoIngeniero(@RequestBody ClasificacionEquipoIngenieroDTO clasificacionEquipoIngenieroDTO){
        System.out.println(clasificacionEquipoIngenieroDTO);
        return clasificacionEquipoIngenieroService.crearClasificacionEquipoIngeniero(clasificacionEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/clasificacionesEquiposIngenieros/{idClasificacionEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarClasificacionEquipoIngenierobyId(@PathVariable Long idClasificacionEquipoIngeniero){
        return clasificacionEquipoIngenieroService.consultarClasificacionEquipoIngenieroporId(idClasificacionEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/clasificacionesEquiposIngenieros/nombre/{nombreClasificacionEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarClasificacionEquipoIngenierobyNombre(@PathVariable String nombreClasificacionEquipoIngeniero){
        return clasificacionEquipoIngenieroService.consultarClasificacionEquipoIngenieroporNombre(nombreClasificacionEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/clasificacionesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarClasificacionEquipoIngeniero(@RequestBody ClasificacionEquipoIngenieroDTO clasificacionEquipoIngenieroDTO){
        return clasificacionEquipoIngenieroService.actualizarClasificacionEquipoIngeniero(clasificacionEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/clasificacionesEquiposIngenieros/{idClasificacionEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarClasificacionEquipoIngeniero(@PathVariable Long idClasificacionEquipoIngeniero){
        return clasificacionEquipoIngenieroService.eliminarClasificacionEquipoIngeniero(idClasificacionEquipoIngeniero);
    }
}
