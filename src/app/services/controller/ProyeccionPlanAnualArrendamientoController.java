//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProyeccionPlanAnualArrendamientoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProyeccionPlanAnualArrendamientoService;
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
* @Since 08/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ProyeccionPlanAnualArrendamientoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProyeccionPlanAnualArrendamientoService proyeccionPlanAnualArrendamientoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesArrendamientos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProyeccionPlanAnualArrendamiento,
            @RequestParam(required = false) Long idInfraestructuraArrendada,
            @RequestParam(required = false) String nombreProyeccionPlanAnualArrendamiento,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proyeccionPlanAnualArrendamientoService.contarTotalRegistros(idProyeccionPlanAnualArrendamiento, idInfraestructuraArrendada, nombreProyeccionPlanAnualArrendamiento, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS PROYECCIONES PLANES ANUALES ARRENDAMIENTOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proyeccionesPlanesAnualesArrendamientos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProyeccionPlanAnualArrendamientoDTO>> listarProyeccionesPlanesAnualesArrendamientosLista(
            @RequestParam(required = false) Long idProyeccionPlanAnualArrendamiento,
            @RequestParam(required = false) Long idInfraestructuraArrendada,
            @RequestParam(required = false) String nombreProyeccionPlanAnualArrendamiento,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(proyeccionPlanAnualArrendamientoService.listarProyeccionesPlanesAnualesArrendamientos(idProyeccionPlanAnualArrendamiento, idInfraestructuraArrendada, nombreProyeccionPlanAnualArrendamiento, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROYECCIONES PLANES ANUALES ARRENDAMIENTOS CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesArrendamientos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProyeccionPlanAnualArrendamientoDTO>> listarProyeccionesPlanesAnualesArrendamientosListaPag(
            @RequestParam(required = false) Long idProyeccionPlanAnualArrendamiento,
            @RequestParam(required = false) Long idInfraestructuraArrendada,
            @RequestParam(required = false) String nombreProyeccionPlanAnualArrendamiento,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proyeccionPlanAnualArrendamientoService.listarProyeccionesPlanesAnualesArrendamientosPag(pageable, idProyeccionPlanAnualArrendamiento, idInfraestructuraArrendada, nombreProyeccionPlanAnualArrendamiento, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proyeccionesPlanesAnualesArrendamientos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProyeccionPlanAnualArrendamiento(@RequestBody ProyeccionPlanAnualArrendamientoDTO proyeccionPlanAnualArrendamientoDTO){
        System.out.println(proyeccionPlanAnualArrendamientoDTO);
        return proyeccionPlanAnualArrendamientoService.crearProyeccionPlanAnualArrendamiento(proyeccionPlanAnualArrendamientoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proyeccionesPlanesAnualesArrendamientos/{idProyeccionPlanAnualArrendamiento}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionPlanAnualArrendamientobyId(@PathVariable Long idProyeccionPlanAnualArrendamiento){
        return proyeccionPlanAnualArrendamientoService.consultarProyeccionPlanAnualArrendamientoporId(idProyeccionPlanAnualArrendamiento);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/proyeccionesPlanesAnualesArrendamientos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProyeccionPlanAnualArrendamiento(@RequestBody ProyeccionPlanAnualArrendamientoDTO proyeccionPlanAnualArrendamientoDTO){
        return proyeccionPlanAnualArrendamientoService.actualizarProyeccionPlanAnualArrendamiento(proyeccionPlanAnualArrendamientoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proyeccionesPlanesAnualesArrendamientos/{idProyeccionPlanAnualArrendamiento}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProyeccionPlanAnualArrendamiento(@PathVariable Long idProyeccionPlanAnualArrendamiento){
        return proyeccionPlanAnualArrendamientoService.eliminarProyeccionPlanAnualArrendamiento(idProyeccionPlanAnualArrendamiento);
    }
}
