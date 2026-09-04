//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProyeccionPlanAnualPozoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProyeccionPlanAnualPozoService;
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
* @Since 22/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ProyeccionPlanAnualPozoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProyeccionPlanAnualPozoService proyeccionPlanAnualPozoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesPozos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProyeccionPlanAnualPozo,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualPozo,
            @RequestParam(required = false) Long idTipoMantenimientoPozo,
            @RequestParam(required = false) String nombreYNumeroRubroProyeccionPlanAnualPozo,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualPozo,
            @RequestParam(required = false) String nombreBienOServicioProyeccionPlanAnualPozo,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proyeccionPlanAnualPozoService.contarTotalRegistros(idProyeccionPlanAnualPozo, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualPozo, idTipoMantenimientoPozo, nombreYNumeroRubroProyeccionPlanAnualPozo, valorSolicitadoProyeccionPlanAnualPozo, nombreBienOServicioProyeccionPlanAnualPozo, idInfraestructura, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LAS PROYECCIONES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proyeccionesPlanesAnualesPozos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProyeccionPlanAnualPozoDTO>> listarProyeccionesPlanesAnualesPozosLista(
            @RequestParam(required = false) Long idProyeccionPlanAnualPozo,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualPozo,
            @RequestParam(required = false) Long idTipoMantenimientoPozo,
            @RequestParam(required = false) String nombreYNumeroRubroProyeccionPlanAnualPozo,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualPozo,
            @RequestParam(required = false) String nombreBienOServicioProyeccionPlanAnualPozo,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(proyeccionPlanAnualPozoService.listarProyeccionesPlanesAnualesPozos(idProyeccionPlanAnualPozo, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualPozo, idTipoMantenimientoPozo, nombreYNumeroRubroProyeccionPlanAnualPozo, valorSolicitadoProyeccionPlanAnualPozo, nombreBienOServicioProyeccionPlanAnualPozo, idInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROYECCIONES CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesPozos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProyeccionPlanAnualPozoDTO>> listarProyeccionesPlanesAnualesPozosListaPag(
            @RequestParam(required = false) Long idProyeccionPlanAnualPozo,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualPozo,
            @RequestParam(required = false) Long idTipoMantenimientoPozo,
            @RequestParam(required = false) String nombreYNumeroRubroProyeccionPlanAnualPozo,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualPozo,
            @RequestParam(required = false) String nombreBienOServicioProyeccionPlanAnualPozo,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proyeccionPlanAnualPozoService.listarProyeccionesPlanesAnualesPozosPag(pageable, idProyeccionPlanAnualPozo, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualPozo, idTipoMantenimientoPozo, nombreYNumeroRubroProyeccionPlanAnualPozo, valorSolicitadoProyeccionPlanAnualPozo, nombreBienOServicioProyeccionPlanAnualPozo, idInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proyeccionesPlanesAnualesPozos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProyeccionPlanAnualPozo(@RequestBody ProyeccionPlanAnualPozoDTO proyeccionPlanAnualPozoDTO){
        return proyeccionPlanAnualPozoService.crearProyeccionPlanAnualPozo(proyeccionPlanAnualPozoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proyeccionesPlanesAnualesPozos/{idProyeccionPlanAnualPozo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionPlanAnualPozobyId(@PathVariable Long idProyeccionPlanAnualPozo){
        return proyeccionPlanAnualPozoService.consultarProyeccionPlanAnualPozoporId(idProyeccionPlanAnualPozo);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/proyeccionesPlanesAnualesPozos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProyeccionPlanAnualPozo(@RequestBody ProyeccionPlanAnualPozoDTO proyeccionPlanAnualPozoDTO){
        return proyeccionPlanAnualPozoService.actualizarProyeccionPlanAnualPozo(proyeccionPlanAnualPozoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proyeccionesPlanesAnualesPozos/{idProyeccionPlanAnualPozo}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProyeccionPlanAnualPozo(@PathVariable Long idProyeccionPlanAnualPozo){
        return proyeccionPlanAnualPozoService.eliminarProyeccionPlanAnualPozo(idProyeccionPlanAnualPozo);
    }
}
