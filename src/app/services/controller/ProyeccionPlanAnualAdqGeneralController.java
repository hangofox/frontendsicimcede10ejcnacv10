//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProyeccionPlanAnualAdqGeneralDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProyeccionPlanAnualAdqGeneralService;
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
* @Since 16/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ProyeccionPlanAnualAdqGeneralController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProyeccionPlanAnualAdqGeneralService proyeccionPlanAnualAdqGeneralService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesAdqGenerales/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proyeccionPlanAnualAdqGeneralService.contarTotalRegistros(idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAdqGeneral, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LAS PROYECCIONES PLANES ANUALES ADQ GENERALES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proyeccionesPlanesAnualesAdqGenerales/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProyeccionPlanAnualAdqGeneralDTO>> listarProyeccionesPlanesAnualesAdqGeneralesLista(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(proyeccionPlanAnualAdqGeneralService.listarProyeccionesPlanesAnualesAdqGenerales(idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAdqGeneral, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROYECCIONES PLANES ANUALES ADQ GENERALES CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesAdqGenerales/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProyeccionPlanAnualAdqGeneralDTO>> listarProyeccionesPlanesAnualesAdqGeneralesListaPag(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proyeccionPlanAnualAdqGeneralService.listarProyeccionesPlanesAnualesAdqGeneralesPag(pageable, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAdqGeneral, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proyeccionesPlanesAnualesAdqGenerales")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProyeccionPlanAnualAdqGeneral(@RequestBody ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO){
        System.out.println(proyeccionPlanAnualAdqGeneralDTO);
        return proyeccionPlanAnualAdqGeneralService.crearProyeccionPlanAnualAdqGeneral(proyeccionPlanAnualAdqGeneralDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proyeccionesPlanesAnualesAdqGenerales/{idProyeccionPlanAnualAdqGeneral}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionPlanAnualAdqGeneralbyId(@PathVariable Long idProyeccionPlanAnualAdqGeneral){
        return proyeccionPlanAnualAdqGeneralService.consultarProyeccionPlanAnualAdqGeneralporId(idProyeccionPlanAnualAdqGeneral);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/proyeccionesPlanesAnualesAdqGenerales/nombre/{nombreProyeccionPlanAnualAdqGeneral}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionPlanAnualAdqGeneralbyNombre(@PathVariable String nombreProyeccionPlanAnualAdqGeneral){
        return proyeccionPlanAnualAdqGeneralService.consultarProyeccionPlanAnualAdqGeneralporNombre(nombreProyeccionPlanAnualAdqGeneral);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/proyeccionesPlanesAnualesAdqGenerales")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProyeccionPlanAnualAdqGeneral(@RequestBody ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO){
        return proyeccionPlanAnualAdqGeneralService.actualizarProyeccionPlanAnualAdqGeneral(proyeccionPlanAnualAdqGeneralDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proyeccionesPlanesAnualesAdqGenerales/{idProyeccionPlanAnualAdqGeneral}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProyeccionPlanAnualAdqGeneral(@PathVariable Long idProyeccionPlanAnualAdqGeneral){
        return proyeccionPlanAnualAdqGeneralService.eliminarProyeccionPlanAnualAdqGeneral(idProyeccionPlanAnualAdqGeneral);
    }
}
