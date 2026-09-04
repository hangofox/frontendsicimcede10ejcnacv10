//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProyeccionPlanAnualEquipSubsDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProyeccionPlanAnualEquipSubsService;
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
public class ProyeccionPlanAnualEquipSubsController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProyeccionPlanAnualEquipSubsService proyeccionPlanAnualEquipSubsService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesEquipSubs/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String nombreYNumeroRubroProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) String nombreBienOServicioProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proyeccionPlanAnualEquipSubsService.contarTotalRegistros(idProyeccionPlanAnualEquipSubs, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualEquipSubs, idEquipoIngeniero, nombreYNumeroRubroProyeccionPlanAnualEquipSubs, valorSolicitadoProyeccionPlanAnualEquipSubs, nombreBienOServicioProyeccionPlanAnualEquipSubs, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS PROYECCIONES PLANES ANUALES EQUIP SUBS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proyeccionesPlanesAnualesEquipSubs/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProyeccionPlanAnualEquipSubsDTO>> listarProyeccionesPlanesAnualesEquipSubsLista(
            @RequestParam(required = false) Long idProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String nombreYNumeroRubroProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) String nombreBienOServicioProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(proyeccionPlanAnualEquipSubsService.listarProyeccionesPlanesAnualesEquipSubs(idProyeccionPlanAnualEquipSubs, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualEquipSubs, idEquipoIngeniero, nombreYNumeroRubroProyeccionPlanAnualEquipSubs, valorSolicitadoProyeccionPlanAnualEquipSubs, nombreBienOServicioProyeccionPlanAnualEquipSubs, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROYECCIONES PLANES ANUALES EQUIP SUBS CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesEquipSubs/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProyeccionPlanAnualEquipSubsDTO>> listarProyeccionesPlanesAnualesEquipSubsListaPag(
            @RequestParam(required = false) Long idProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String nombreYNumeroRubroProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) String valorSolicitadoProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) String nombreBienOServicioProyeccionPlanAnualEquipSubs,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proyeccionPlanAnualEquipSubsService.listarProyeccionesPlanesAnualesEquipSubsPag(pageable, idProyeccionPlanAnualEquipSubs, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualEquipSubs, idEquipoIngeniero, nombreYNumeroRubroProyeccionPlanAnualEquipSubs, valorSolicitadoProyeccionPlanAnualEquipSubs, nombreBienOServicioProyeccionPlanAnualEquipSubs, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proyeccionesPlanesAnualesEquipSubs")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProyeccionPlanAnualEquipSubs(@RequestBody ProyeccionPlanAnualEquipSubsDTO proyeccionPlanAnualEquipSubsDTO){
        System.out.println(proyeccionPlanAnualEquipSubsDTO);
        return proyeccionPlanAnualEquipSubsService.crearProyeccionPlanAnualEquipSubs(proyeccionPlanAnualEquipSubsDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proyeccionesPlanesAnualesEquipSubs/{idProyeccionPlanAnualEquipSubs}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionPlanAnualEquipSubsbyId(@PathVariable Long idProyeccionPlanAnualEquipSubs){
        return proyeccionPlanAnualEquipSubsService.consultarProyeccionPlanAnualEquipSubsporId(idProyeccionPlanAnualEquipSubs);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/proyeccionesPlanesAnualesEquipSubs")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProyeccionPlanAnualEquipSubs(@RequestBody ProyeccionPlanAnualEquipSubsDTO proyeccionPlanAnualEquipSubsDTO){
        return proyeccionPlanAnualEquipSubsService.actualizarProyeccionPlanAnualEquipSubs(proyeccionPlanAnualEquipSubsDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proyeccionesPlanesAnualesEquipSubs/{idProyeccionPlanAnualEquipSubs}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProyeccionPlanAnualEquipSubs(@PathVariable Long idProyeccionPlanAnualEquipSubs){
        return proyeccionPlanAnualEquipSubsService.eliminarProyeccionPlanAnualEquipSubs(idProyeccionPlanAnualEquipSubs);
    }
}
