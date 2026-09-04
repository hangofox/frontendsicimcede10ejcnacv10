//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProyeccionPlanAnualAdqEquipFijIngDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProyeccionPlanAnualAdqEquipFijIngService;
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
public class ProyeccionPlanAnualAdqEquipFijIngController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProyeccionPlanAnualAdqEquipFijIngService proyeccionPlanAnualAdqEquipFijIngService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesAdqEquipFijIng/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqEquipFijIng,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAdqEquipFijIng,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proyeccionPlanAnualAdqEquipFijIngService.contarTotalRegistros(idProyeccionPlanAnualAdqEquipFijIng, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAdqEquipFijIng, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS PROYECCIONES PLANES ANUALES ADQ EQUIP FIJ ING SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proyeccionesPlanesAnualesAdqEquipFijIng/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProyeccionPlanAnualAdqEquipFijIngDTO>> listarProyeccionesPlanesAnualesAdqEquipFijIngLista(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqEquipFijIng,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAdqEquipFijIng,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(proyeccionPlanAnualAdqEquipFijIngService.listarProyeccionesPlanesAnualesAdqEquipFijIng(idProyeccionPlanAnualAdqEquipFijIng, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAdqEquipFijIng, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROYECCIONES PLANES ANUALES ADQ EQUIP FIJ ING CON QUERY PARAMS:
    @GetMapping("/proyeccionesPlanesAnualesAdqEquipFijIng/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProyeccionPlanAnualAdqEquipFijIngDTO>> listarProyeccionesPlanesAnualesAdqEquipFijIngListaPag(
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqEquipFijIng,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqGeneral,
            @RequestParam(required = false) String nombreProyeccionPlanAnualAdqEquipFijIng,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proyeccionPlanAnualAdqEquipFijIngService.listarProyeccionesPlanesAnualesAdqEquipFijIngPag(pageable, idProyeccionPlanAnualAdqEquipFijIng, idProyeccionPlanAnualAdqGeneral, nombreProyeccionPlanAnualAdqEquipFijIng, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proyeccionesPlanesAnualesAdqEquipFijIng")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProyeccionPlanAnualAdqEquipFijIng(@RequestBody ProyeccionPlanAnualAdqEquipFijIngDTO proyeccionPlanAnualAdqEquipFijIngDTO){
        System.out.println(proyeccionPlanAnualAdqEquipFijIngDTO);
        return proyeccionPlanAnualAdqEquipFijIngService.crearProyeccionPlanAnualAdqEquipFijIng(proyeccionPlanAnualAdqEquipFijIngDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proyeccionesPlanesAnualesAdqEquipFijIng/{idProyeccionPlanAnualAdqEquipFijIng}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionPlanAnualAdqEquipFijIngbyId(@PathVariable Long idProyeccionPlanAnualAdqEquipFijIng){
        return proyeccionPlanAnualAdqEquipFijIngService.consultarProyeccionPlanAnualAdqEquipFijIngporId(idProyeccionPlanAnualAdqEquipFijIng);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/proyeccionesPlanesAnualesAdqEquipFijIng")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProyeccionPlanAnualAdqEquipFijIng(@RequestBody ProyeccionPlanAnualAdqEquipFijIngDTO proyeccionPlanAnualAdqEquipFijIngDTO){
        return proyeccionPlanAnualAdqEquipFijIngService.actualizarProyeccionPlanAnualAdqEquipFijIng(proyeccionPlanAnualAdqEquipFijIngDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proyeccionesPlanesAnualesAdqEquipFijIng/{idProyeccionPlanAnualAdqEquipFijIng}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProyeccionPlanAnualAdqEquipFijIng(@PathVariable Long idProyeccionPlanAnualAdqEquipFijIng){
        return proyeccionPlanAnualAdqEquipFijIngService.eliminarProyeccionPlanAnualAdqEquipFijIng(idProyeccionPlanAnualAdqEquipFijIng);
    }
}
