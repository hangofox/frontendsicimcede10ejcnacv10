//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.InclusionSeguroEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.InclusionSeguroEquipoIngenieroService;
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
public class InclusionSeguroEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private InclusionSeguroEquipoIngenieroService inclusionSeguroEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/inclusionesSeguroEquipoIngeniero/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idInclusionSeguroEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idAseguramientoEquipoIngeniero) {
        return new ResponseEntity<>(inclusionSeguroEquipoIngenieroService.contarTotalRegistros(idInclusionSeguroEquipoIngeniero, keyword, idAseguramientoEquipoIngeniero), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS INCLUSIONES SEGURO EQUIPO INGENIERO SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/inclusionesSeguroEquipoIngeniero/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<InclusionSeguroEquipoIngenieroDTO>> listarInclusionesSeguroEquipoIngenieroLista(
            @RequestParam(required = false) Long idInclusionSeguroEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idAseguramientoEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(inclusionSeguroEquipoIngenieroService.listarInclusionesSeguroEquipoIngeniero(idInclusionSeguroEquipoIngeniero, keyword, idAseguramientoEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR INCLUSIONES SEGURO EQUIPO INGENIERO CON QUERY PARAMS:
    @GetMapping("/inclusionesSeguroEquipoIngeniero/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<InclusionSeguroEquipoIngenieroDTO>> listarInclusionesSeguroEquipoIngenieroListaPag(
            @RequestParam(required = false) Long idInclusionSeguroEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idAseguramientoEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(inclusionSeguroEquipoIngenieroService.listarInclusionesSeguroEquipoIngeneroPag(pageable, idInclusionSeguroEquipoIngeniero, keyword, idAseguramientoEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/inclusionesSeguroEquipoIngeniero")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/inclusionesSeguroEquipoIngeniero")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearInclusionSeguroEquipoIngeniero(@RequestBody InclusionSeguroEquipoIngenieroDTO inclusionSeguroEquipoIngenieroDTO){
        System.out.println(inclusionSeguroEquipoIngenieroDTO);
        return inclusionSeguroEquipoIngenieroService.crearInclusionSeguroEquipoIngeniero(inclusionSeguroEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/inclusionesSeguroEquipoIngeniero/{idInclusionSeguroEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarInclusionSeguroEquipoIngenierobyId(@PathVariable Long idInclusionSeguroEquipoIngeniero){
        return inclusionSeguroEquipoIngenieroService.consultarInclusionSeguroEquipoIngenieroporId(idInclusionSeguroEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/inclusionesSeguroEquipoIngeniero")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/inclusionesSeguroEquipoIngeniero")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarInclusionSeguroEquipoIngeniero(@RequestBody InclusionSeguroEquipoIngenieroDTO inclusionSeguroEquipoIngenieroDTO){
        return inclusionSeguroEquipoIngenieroService.actualizarInclusionSeguroEquipoIngeniero(inclusionSeguroEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/inclusionesSeguroEquipoIngeniero/{idInclusionSeguroEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarInclusionSeguroEquipoIngeniero(@PathVariable Long idInclusionSeguroEquipoIngeniero){
        return inclusionSeguroEquipoIngenieroService.eliminarInclusionSeguroEquipoIngeniero(idInclusionSeguroEquipoIngeniero);
    }
}
