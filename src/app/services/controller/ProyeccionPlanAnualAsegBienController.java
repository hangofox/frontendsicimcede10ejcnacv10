//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProyeccionPlanAnualAsegBienDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProyeccionPlanAnualAsegBienService;
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
* @Since 13/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ProyeccionPlanAnualAsegBienController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProyeccionPlanAnualAsegBienService proyeccionPlanAnualAsegBienService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesAsegBienes/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProyeccionPlanAnualAsegBien,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAsegBien,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proyeccionPlanAnualAsegBienService.contarTotalRegistros(idProyeccionPlanAnualAsegBien, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAsegBien, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LAS PROYECCIONES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proyeccionesPlanesAnualesAsegBienes/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProyeccionPlanAnualAsegBienDTO>> listarProyeccionesPlanesAnualesAsegBienesLista(
            @RequestParam(required = false) Long idProyeccionPlanAnualAsegBien,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAsegBien,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(proyeccionPlanAnualAsegBienService.listarProyeccionesPlanesAnualesAsegBienes(idProyeccionPlanAnualAsegBien, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAsegBien, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROYECCIONES CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesAsegBienes/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProyeccionPlanAnualAsegBienDTO>> listarProyeccionesPlanesAnualesAsegBienesListaPag(
            @RequestParam(required = false) Long idProyeccionPlanAnualAsegBien,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAsegBien,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proyeccionPlanAnualAsegBienService.listarProyeccionesPlanesAnualesAsegBienesPag(pageable, idProyeccionPlanAnualAsegBien, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAsegBien, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proyeccionesPlanesAnualesAsegBienes")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProyeccionPlanAnualAsegBien(@RequestBody ProyeccionPlanAnualAsegBienDTO proyeccionPlanAnualAsegBienDTO){
        return proyeccionPlanAnualAsegBienService.crearProyeccionPlanAnualAsegBien(proyeccionPlanAnualAsegBienDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proyeccionesPlanesAnualesAsegBienes/{idProyeccionPlanAnualAsegBien}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionPlanAnualAsegBienbyId(@PathVariable Long idProyeccionPlanAnualAsegBien){
        return proyeccionPlanAnualAsegBienService.consultarProyeccionPlanAnualAsegBienporId(idProyeccionPlanAnualAsegBien);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/proyeccionesPlanesAnualesAsegBienes")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProyeccionPlanAnualAsegBien(@RequestBody ProyeccionPlanAnualAsegBienDTO proyeccionPlanAnualAsegBienDTO){
        return proyeccionPlanAnualAsegBienService.actualizarProyeccionPlanAnualAsegBien(proyeccionPlanAnualAsegBienDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proyeccionesPlanesAnualesAsegBienes/{idProyeccionPlanAnualAsegBien}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProyeccionPlanAnualAsegBien(@PathVariable Long idProyeccionPlanAnualAsegBien){
        return proyeccionPlanAnualAsegBienService.eliminarProyeccionPlanAnualAsegBien(idProyeccionPlanAnualAsegBien);
    }
}
