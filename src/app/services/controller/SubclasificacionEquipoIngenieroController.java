//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.SubclasificacionEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.SubclasificacionEquipoIngenieroService;
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
* @Since 24/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class SubclasificacionEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private SubclasificacionEquipoIngenieroService subclasificacionEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/subclasificacionesEquiposIngenieros/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreTipoDocumentoIdentificacion,
            @RequestParam(required = false) String nombreSubclasificacionEquipoIngeniero
    ) {
        return new ResponseEntity<>(subclasificacionEquipoIngenieroService.contarTotalRegistros(idSubclasificacionEquipoIngeniero, keyword, nombreTipoDocumentoIdentificacion, nombreSubclasificacionEquipoIngeniero), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS SUBCLASIFICACIONES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/subclasificacionesEquiposIngenieros/lista")
    public ResponseEntity<List<SubclasificacionEquipoIngenieroDTO>> listarSubclasificacionesEquiposIngenierosLista(
            @RequestParam(required = false) Long idSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreClasificacionEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(subclasificacionEquipoIngenieroService.listarSubclasificacionesEquiposIngenieros(idSubclasificacionEquipoIngeniero, keyword, nombreSubclasificacionEquipoIngeniero, nombreClasificacionEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR SUBCLASIFICACIONES CON QUERY PARAMS:
    @GetMapping("/subclasificacionesEquiposIngenieros/listaPag")
    public ResponseEntity<Slice<SubclasificacionEquipoIngenieroDTO>> listarSubclasificacionesEquiposIngenierosListaPag(
            @RequestParam(required = false) Long idSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreClasificacionEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(subclasificacionEquipoIngenieroService.listarSubclasificacionesEquiposIngenierosPag(pageable, idSubclasificacionEquipoIngeniero, keyword, nombreSubclasificacionEquipoIngeniero, nombreClasificacionEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/subclasificacionesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/subclasificacionesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearSubclasificacionEquipoIngeniero(@RequestBody SubclasificacionEquipoIngenieroDTO subclasificacionEquipoIngenieroDTO){
        System.out.println(subclasificacionEquipoIngenieroDTO);
        return subclasificacionEquipoIngenieroService.crearSubclasificacionEquipoIngeniero(subclasificacionEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/subclasificacionesEquiposIngenieros/{idSubclasificacionEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarSubclasificacionEquipoIngenierobyId(@PathVariable Long idSubclasificacionEquipoIngeniero){
        return subclasificacionEquipoIngenieroService.consultarSubclasificacionEquipoIngenieroporId(idSubclasificacionEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE Y NOMBRE DE LA CLASIFICACIÓN:
    @GetMapping("/subclasificacionesEquiposIngenieros/subclasificacionEquipoIngeniero/{nombreSubclasificacionEquipoIngeniero}/{nombreClasificacionEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarSubclasificacionEquipoIngenierobyNombreSubclasificacionEquipoIngenieroYNombreClasificacionEquipoIngeniero(@PathVariable String nombreSubclasificacionEquipoIngeniero, @PathVariable String nombreClasificacionEquipoIngeniero){
        return subclasificacionEquipoIngenieroService.consultarSubclasificacionEquipoIngenieroporNombreSubclasificacionEquipoIngenieroYNombreClasificacionEquipoIngeniero(nombreSubclasificacionEquipoIngeniero, nombreClasificacionEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/subclasificacionesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/subclasificacionesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarSubclasificacionEquipoIngeniero(@RequestBody SubclasificacionEquipoIngenieroDTO subclasificacionEquipoIngenieroDTO){
        return subclasificacionEquipoIngenieroService.actualizarSubclasificacionEquipoIngeniero(subclasificacionEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/subclasificacionesEquiposIngenieros/{idSubclasificacionEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarSubclasificacionEquipoIngeniero(@PathVariable Long idSubclasificacionEquipoIngeniero){
        return subclasificacionEquipoIngenieroService.eliminarSubclasificacionEquipoIngeniero(idSubclasificacionEquipoIngeniero);
    }
}
