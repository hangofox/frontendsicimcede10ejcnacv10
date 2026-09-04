//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProyeccionPlanAnualAdqCdoIngDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProyeccionPlanAnualAdqCdoIngService;
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
public class ProyeccionPlanAnualAdqCdoIngController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProyeccionPlanAnualAdqCdoIngService proyeccionPlanAnualAdqCdoIngService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesAdqCdosIng/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) Long idDestinacionMantenimientoCdoIng,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proyeccionPlanAnualAdqCdoIngService.contarTotalRegistros(idProyeccionPlanAnualAdqCdoIng, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAdqCdoIng, idDestinacionMantenimientoCdoIng, valorSolicitadoProyeccionPlanAnualAdqCdoIng, idInfraestructura, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS PROYECCIONES PLANES ANUALES ADQ CDOS ING SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proyeccionesPlanesAnualesAdqCdosIng/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProyeccionPlanAnualAdqCdoIngDTO>> listarProyeccionesPlanesAnualesAdqCdosIngLista(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) Long idDestinacionMantenimientoCdoIng,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(proyeccionPlanAnualAdqCdoIngService.listarProyeccionesPlanesAnualesAdqCdosIng(idProyeccionPlanAnualAdqCdoIng, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAdqCdoIng, idDestinacionMantenimientoCdoIng, valorSolicitadoProyeccionPlanAnualAdqCdoIng, idInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROYECCIONES PLANES ANUALES ADQ CDOS ING CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesAdqCdosIng/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProyeccionPlanAnualAdqCdoIngDTO>> listarProyeccionesPlanesAnualesAdqCdosIngListaPag(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) Long idDestinacionMantenimientoCdoIng,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proyeccionPlanAnualAdqCdoIngService.listarProyeccionesPlanesAnualesAdqCdosIngPag(pageable, idProyeccionPlanAnualAdqCdoIng, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAdqCdoIng, idDestinacionMantenimientoCdoIng, valorSolicitadoProyeccionPlanAnualAdqCdoIng, idInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proyeccionesPlanesAnualesAdqCdosIng")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProyeccionPlanAnualAdqCdoIng(@RequestBody ProyeccionPlanAnualAdqCdoIngDTO proyeccionPlanAnualAdqCdoIngDTO){
        System.out.println(proyeccionPlanAnualAdqCdoIngDTO);
        return proyeccionPlanAnualAdqCdoIngService.crearProyeccionPlanAnualAdqCdoIng(proyeccionPlanAnualAdqCdoIngDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proyeccionesPlanesAnualesAdqCdosIng/{idProyeccionPlanAnualAdqCdoIng}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionPlanAnualAdqCdoIngbyId(@PathVariable Long idProyeccionPlanAnualAdqCdoIng){
        return proyeccionPlanAnualAdqCdoIngService.consultarProyeccionPlanAnualAdqCdoIngporId(idProyeccionPlanAnualAdqCdoIng);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/proyeccionesPlanesAnualesAdqCdosIng")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProyeccionPlanAnualAdqCdoIng(@RequestBody ProyeccionPlanAnualAdqCdoIngDTO proyeccionPlanAnualAdqCdoIngDTO){
        return proyeccionPlanAnualAdqCdoIngService.actualizarProyeccionPlanAnualAdqCdoIng(proyeccionPlanAnualAdqCdoIngDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proyeccionesPlanesAnualesAdqCdosIng/{idProyeccionPlanAnualAdqCdoIng}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProyeccionPlanAnualAdqCdoIng(@PathVariable Long idProyeccionPlanAnualAdqCdoIng){
        return proyeccionPlanAnualAdqCdoIngService.eliminarProyeccionPlanAnualAdqCdoIng(idProyeccionPlanAnualAdqCdoIng);
    }
}
