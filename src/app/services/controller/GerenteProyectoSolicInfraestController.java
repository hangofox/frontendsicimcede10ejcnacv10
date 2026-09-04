//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.GerenteProyectoSolicInfraestDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.GerenteProyectoSolicInfraestService;
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
* @Since 31/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class GerenteProyectoSolicInfraestController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private GerenteProyectoSolicInfraestService gerenteProyectoSolicInfraestService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/gerentesProyectosSolicInfraest/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idGerenteProyectoSolicInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idSolicitudInfraestructura) {
        return new ResponseEntity<>(gerenteProyectoSolicInfraestService.contarTotalRegistros(idGerenteProyectoSolicInfraest, keyword, idSolicitudInfraestructura), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS GERENTES PROYECTOS SOLIC INFRAEST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/gerentesProyectosSolicInfraest/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<GerenteProyectoSolicInfraestDTO>> listarGerentesProyectosSolicInfraest(
            @RequestParam(required = false) Long idGerenteProyectoSolicInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(gerenteProyectoSolicInfraestService.listarGerentesProyectosSolicInfraest(idGerenteProyectoSolicInfraest, keyword, idSolicitudInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR GERENTES PROYECTOS SOLIC INFRAEST CON QUERY PARAMS:
    @GetMapping("/gerentesProyectosSolicInfraest/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<GerenteProyectoSolicInfraestDTO>> listarGerentesProyectosSolicInfraestPag(
            @RequestParam(required = false) Long idGerenteProyectoSolicInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(gerenteProyectoSolicInfraestService.listarGerentesProyectosSolicInfraestPag(pageable, idGerenteProyectoSolicInfraest, keyword, idSolicitudInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/gerentesProyectosSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/gerentesProyectosSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearGerenteProyectoSolicInfraest(@RequestBody GerenteProyectoSolicInfraestDTO gerenteProyectoSolicInfraestDTO){
        System.out.println(gerenteProyectoSolicInfraestDTO);
        return gerenteProyectoSolicInfraestService.crearGerenteProyectoSolicInfraest(gerenteProyectoSolicInfraestDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/gerentesProyectosSolicInfraest/{idGerenteProyectoSolicInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarGerenteProyectoSolicInfraestbyId(@PathVariable Long idGerenteProyectoSolicInfraest){
        return gerenteProyectoSolicInfraestService.consultarGerenteProyectoSolicInfraestporId(idGerenteProyectoSolicInfraest);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/gerentesProyectosSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/gerentesProyectosSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarGerenteProyectoSolicInfraest(@RequestBody GerenteProyectoSolicInfraestDTO gerenteProyectoSolicInfraestDTO){
        return gerenteProyectoSolicInfraestService.actualizarGerenteProyectoSolicInfraest(gerenteProyectoSolicInfraestDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/gerentesProyectosSolicInfraest/{idGerenteProyectoSolicInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarGerenteProyectoSolicInfraest(@PathVariable Long idGerenteProyectoSolicInfraest){
        return gerenteProyectoSolicInfraestService.eliminarGerenteProyectoSolicInfraest(idGerenteProyectoSolicInfraest);
    }
}
