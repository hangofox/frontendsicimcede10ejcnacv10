//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProyeccionPlanAnualAdqInfraestDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProyeccionPlanAnualAdqInfraestService;
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
public class ProyeccionPlanAnualAdqInfraestController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProyeccionPlanAnualAdqInfraestService proyeccionPlanAnualAdqInfraestService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesAdqInfraest/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqInfraest,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualInfraest,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proyeccionPlanAnualAdqInfraestService.contarTotalRegistros(idProyeccionPlanAnualAdqInfraest, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualInfraest, idInfraestructura, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS PROYECCIONES PLANES ANUALES ADQ INFRAEST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proyeccionesPlanesAnualesAdqInfraest/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProyeccionPlanAnualAdqInfraestDTO>> listarProyeccionesPlanesAnualesAdqInfraestLista(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqInfraest,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualInfraest,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(proyeccionPlanAnualAdqInfraestService.listarProyeccionesPlanesAnualesAdqInfraest(idProyeccionPlanAnualAdqInfraest, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualInfraest, idInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROYECCIONES PLANES ANUALES ADQ INFRAEST CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesAdqInfraest/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProyeccionPlanAnualAdqInfraestDTO>> listarProyeccionesPlanesAnualesAdqInfraestListaPag(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqInfraest,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualInfraest,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proyeccionPlanAnualAdqInfraestService.listarProyeccionesPlanesAnualesAdqInfraestPag(pageable, idProyeccionPlanAnualAdqInfraest, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualInfraest, idInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proyeccionesPlanesAnualesAdqInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProyeccionPlanAnualAdqInfraest(@RequestBody ProyeccionPlanAnualAdqInfraestDTO proyeccionPlanAnualAdqInfraestDTO){
        System.out.println(proyeccionPlanAnualAdqInfraestDTO);
        return proyeccionPlanAnualAdqInfraestService.crearProyeccionPlanAnualAdqInfraest(proyeccionPlanAnualAdqInfraestDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proyeccionesPlanesAnualesAdqInfraest/{idProyeccionPlanAnualAdqInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionPlanAnualAdqInfraestbyId(@PathVariable Long idProyeccionPlanAnualAdqInfraest){
        return proyeccionPlanAnualAdqInfraestService.consultarProyeccionPlanAnualAdqInfraestporId(idProyeccionPlanAnualAdqInfraest);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/proyeccionesPlanesAnualesAdqInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProyeccionPlanAnualAdqInfraest(@RequestBody ProyeccionPlanAnualAdqInfraestDTO proyeccionPlanAnualAdqInfraestDTO){
        return proyeccionPlanAnualAdqInfraestService.actualizarProyeccionPlanAnualAdqInfraest(proyeccionPlanAnualAdqInfraestDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proyeccionesPlanesAnualesAdqInfraest/{idProyeccionPlanAnualAdqInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProyeccionPlanAnualAdqInfraest(@PathVariable Long idProyeccionPlanAnualAdqInfraest){
        return proyeccionPlanAnualAdqInfraestService.eliminarProyeccionPlanAnualAdqInfraest(idProyeccionPlanAnualAdqInfraest);
    }
}
