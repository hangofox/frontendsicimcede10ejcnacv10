//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.EquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.EquipoIngenieroService;
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
* @Since 30/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class EquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private EquipoIngenieroService equipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/equiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String nombreClasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String estado) {
        return new ResponseEntity<>(equipoIngenieroService.contarTotalRegistros(idEquipoIngeniero, keyword, siglaoAcronimoUnidadMilitar, nombreClasificacionEquipoIngeniero, nombreSubclasificacionEquipoIngeniero, nombreElementoSubclasificacionEquipoIngeniero, estado), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS EQUIPOS INGENIEROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/equiposIngenieros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<EquipoIngenieroDTO>> listarEquiposIngenieroLista(
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String nombreClasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(equipoIngenieroService.listarEquiposIngenieros(idEquipoIngeniero, keyword, siglaoAcronimoUnidadMilitar, nombreClasificacionEquipoIngeniero, nombreSubclasificacionEquipoIngeniero, nombreElementoSubclasificacionEquipoIngeniero, estado, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR EQUIPOS INGENIEROS CON QUERY PARAMS:
    @GetMapping("/equiposIngenieros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<EquipoIngenieroDTO>> listarEquiposIngenieroListaPag(
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String nombreClasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String nombreElementoSubclasificacionEquipoIngeniero,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(equipoIngenieroService.listarEquiposIngenierosPag(pageable, idEquipoIngeniero, keyword, siglaoAcronimoUnidadMilitar, nombreClasificacionEquipoIngeniero, nombreSubclasificacionEquipoIngeniero, nombreElementoSubclasificacionEquipoIngeniero, estado, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/equiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearEquipoIngeniero(@RequestBody EquipoIngenieroDTO equipoIngenieroDTO){
        return equipoIngenieroService.crearEquipoIngeniero(equipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/equiposIngenieros/{idEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarEquipoIngenierobyId(@PathVariable Long idEquipoIngeniero){
        return equipoIngenieroService.consultarEquipoIngenieroporId(idEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO INVENTARIO Y NUMERO ACTIVO FIJO (CAMPOS ÚNICOS COMBINADOS):
    @GetMapping("/equiposIngenieros/numeroInventario/{numeroInventarioEquipoIngeniero}/numeroActivoFijo/{numeroActivoFijoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPOS ÚNICOS COMBINADOS.
    public RespuestaDTO consultarEquipoIngenieroporNumeroInventarioNumeroActivoFijo(@PathVariable String numeroInventarioEquipoIngeniero, @PathVariable String numeroActivoFijoEquipoIngeniero) {
        return equipoIngenieroService.consultarEquipoIngenieroporNumeroInventarioNumeroActivoFijo(numeroInventarioEquipoIngeniero, numeroActivoFijoEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/equiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarEquipoIngeniero(@RequestBody EquipoIngenieroDTO equipoIngenieroDTO){
        return equipoIngenieroService.actualizarEquipoIngeniero(equipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/equiposIngenieros/{idEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarEquipoIngeniero(@PathVariable Long idEquipoIngeniero){
        return equipoIngenieroService.eliminarEquipoIngeniero(idEquipoIngeniero);
    }
}
