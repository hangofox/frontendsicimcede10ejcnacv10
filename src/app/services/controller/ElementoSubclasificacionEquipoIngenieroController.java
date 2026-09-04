//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ElementoSubclasificacionEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ElementoSubclasificacionEquipoIngenieroService;
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
* @Since 19/06/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ElementoSubclasificacionEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ElementoSubclasificacionEquipoIngenieroService elementoSubclasificacionEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/elementosSubclasificacionesEquiposIngenieros/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreElementoSubclasificacionEquipoIngeniero
    ) {
        return new ResponseEntity<>(elementoSubclasificacionEquipoIngenieroService.contarTotalRegistros(idElementoSubclasificacionEquipoIngeniero, keyword, nombreElementoSubclasificacionEquipoIngeniero), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS ELEMENTOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/elementosSubclasificacionesEquiposIngenieros/lista")
    public ResponseEntity<List<ElementoSubclasificacionEquipoIngenieroDTO>> listarElementosSubclasificacionesEquiposIngenierosLista(
            @RequestParam(required = false) Long idElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(elementoSubclasificacionEquipoIngenieroService.listarElementosSubclasificacionesEquiposIngenieros(idElementoSubclasificacionEquipoIngeniero, keyword, nombreElementoSubclasificacionEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR ELEMENTOS CON QUERY PARAMS:
    @GetMapping("/elementosSubclasificacionesEquiposIngenieros/listaPag")
    public ResponseEntity<Slice<ElementoSubclasificacionEquipoIngenieroDTO>> listarElementosSubclasificacionesEquiposIngenierosListaPag(
            @RequestParam(required = false) Long idElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(elementoSubclasificacionEquipoIngenieroService.listarElementosSubclasificacionesEquiposIngenierosPag(pageable, idElementoSubclasificacionEquipoIngeniero, keyword, nombreElementoSubclasificacionEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/elementosSubclasificacionesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/elementosSubclasificacionesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearElementoSubclasificacionEquipoIngeniero(@RequestBody ElementoSubclasificacionEquipoIngenieroDTO elementoSubclasificacionEquipoIngenieroDTO){
        System.out.println(elementoSubclasificacionEquipoIngenieroDTO);
        return elementoSubclasificacionEquipoIngenieroService.crearElementoSubclasificacionEquipoIngeniero(elementoSubclasificacionEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/elementosSubclasificacionesEquiposIngenieros/{idElementoSubclasificacionEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarElementoSubclasificacionEquipoIngenierobyId(@PathVariable Long idElementoSubclasificacionEquipoIngeniero){
        return elementoSubclasificacionEquipoIngenieroService.consultarElementoSubclasificacionEquipoIngenieroporId(idElementoSubclasificacionEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE, NOMBRE CLASIFICACION, NOMBRE SUBCLASIFICACION, NOMBRE CUENTA Y NOMBRE CLASE ACTIVO:
    @GetMapping("/elementosSubclasificacionesEquiposIngenieros/elementoSubclasificacionEquipoIngeniero/{nombreElementoSubclasificacionEquipoIngeniero}/{nombreClasificacionEquipoIngeniero}/{nombreSubclasificacionEquipoIngeniero}/{nombreCuentaEquipoIngeniero}/{nombreClaseActivoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarElementoSubclasificacionEquipoIngenierobyNombreElementoSubclasificacionEquipoIngenieroYNombreClasificacionEquipoIngenieroYNombreSubclasificacionEquipoIngenieroYNombreCuentaEquipoIngenieroYNombreClaseActivoEquipoIngeniero(@PathVariable String nombreElementoSubclasificacionEquipoIngeniero, @PathVariable String nombreClasificacionEquipoIngeniero, @PathVariable String nombreSubclasificacionEquipoIngeniero, @PathVariable String nombreCuentaEquipoIngeniero, @PathVariable String nombreClaseActivoEquipoIngeniero){
        return elementoSubclasificacionEquipoIngenieroService.consultarElementoSubclasificacionEquipoIngenieroporNombreElementoSubclasificacionEquipoIngenieroYNombreClasificacionEquipoIngenieroYNombreSubclasificacionEquipoIngenieroYNombreCuentaEquipoIngenieroYNombreClaseActivoEquipoIngeniero(nombreElementoSubclasificacionEquipoIngeniero, nombreClasificacionEquipoIngeniero, nombreSubclasificacionEquipoIngeniero, nombreCuentaEquipoIngeniero, nombreClaseActivoEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/elementosSubclasificacionesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/elementosSubclasificacionesEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarElementoSubclasificacionEquipoIngeniero(@RequestBody ElementoSubclasificacionEquipoIngenieroDTO elementoSubclasificacionEquipoIngenieroDTO){
        return elementoSubclasificacionEquipoIngenieroService.actualizarElementoSubclasificacionEquipoIngeniero(elementoSubclasificacionEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/elementosSubclasificacionesEquiposIngenieros/{idElementoSubclasificacionEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarElementoSubclasificacionEquipoIngeniero(@PathVariable Long idElementoSubclasificacionEquipoIngeniero){
        return elementoSubclasificacionEquipoIngenieroService.eliminarElementoSubclasificacionEquipoIngeniero(idElementoSubclasificacionEquipoIngeniero);
    }
}
