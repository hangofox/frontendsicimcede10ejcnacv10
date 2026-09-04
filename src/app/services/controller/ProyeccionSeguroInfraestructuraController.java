//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProyeccionSeguroInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProyeccionSeguroInfraestructuraService;
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
* @Since 14/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ProyeccionSeguroInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProyeccionSeguroInfraestructuraService proyeccionSeguroInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/proyeccionesSegurosInfraestructuras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProyeccionSeguroInfraestructura,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String valorSolicitadoProySegInfraest,
            @RequestParam(required = false) String valorSolicitadoTodoRiesgoProySegInfraest,
            @RequestParam(required = false) String valorSolicitadoRenegociacionProySegInfraest,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(proyeccionSeguroInfraestructuraService.contarTotalRegistros(idProyeccionSeguroInfraestructura, idInfraestructura, valorSolicitadoProySegInfraest, valorSolicitadoTodoRiesgoProySegInfraest, valorSolicitadoRenegociacionProySegInfraest, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LAS PROYECCIONES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/proyeccionesSegurosInfraestructuras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProyeccionSeguroInfraestructuraDTO>> listarProyeccionesSegurosInfraestructurasLista(
            @RequestParam(required = false) Long idProyeccionSeguroInfraestructura,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String valorSolicitadoProySegInfraest,
            @RequestParam(required = false) String valorSolicitadoTodoRiesgoProySegInfraest,
            @RequestParam(required = false) String valorSolicitadoRenegociacionProySegInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(proyeccionSeguroInfraestructuraService.listarProyeccionesSegurosInfraestructuras(idProyeccionSeguroInfraestructura, idInfraestructura, valorSolicitadoProySegInfraest, valorSolicitadoTodoRiesgoProySegInfraest, valorSolicitadoRenegociacionProySegInfraest, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PROYECCIONES CON QUERY PARAMS:
    @GetMapping("/proyeccionesSegurosInfraestructuras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProyeccionSeguroInfraestructuraDTO>> listarProyeccionesSegurosInfraestructurasListaPag(
            @RequestParam(required = false) Long idProyeccionSeguroInfraestructura,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String valorSolicitadoProySegInfraest,
            @RequestParam(required = false) String valorSolicitadoTodoRiesgoProySegInfraest,
            @RequestParam(required = false) String valorSolicitadoRenegociacionProySegInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(proyeccionSeguroInfraestructuraService.listarProyeccionesSegurosInfraestructurasPag(pageable, idProyeccionSeguroInfraestructura, idInfraestructura, valorSolicitadoProySegInfraest, valorSolicitadoTodoRiesgoProySegInfraest, valorSolicitadoRenegociacionProySegInfraest, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/proyeccionesSegurosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProyeccionSeguroInfraestructura(@RequestBody ProyeccionSeguroInfraestructuraDTO proyeccionSeguroInfraestructuraDTO){
        return proyeccionSeguroInfraestructuraService.crearProyeccionSeguroInfraestructura(proyeccionSeguroInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/proyeccionesSegurosInfraestructuras/{idProyeccionSeguroInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProyeccionSeguroInfraestructurabyId(@PathVariable Long idProyeccionSeguroInfraestructura){
        return proyeccionSeguroInfraestructuraService.consultarProyeccionSeguroInfraestructuraporId(idProyeccionSeguroInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/proyeccionesSegurosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProyeccionSeguroInfraestructura(@RequestBody ProyeccionSeguroInfraestructuraDTO proyeccionSeguroInfraestructuraDTO){
        return proyeccionSeguroInfraestructuraService.actualizarProyeccionSeguroInfraestructura(proyeccionSeguroInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/proyeccionesSegurosInfraestructuras/{idProyeccionSeguroInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProyeccionSeguroInfraestructura(@PathVariable Long idProyeccionSeguroInfraestructura){
        return proyeccionSeguroInfraestructuraService.eliminarProyeccionSeguroInfraestructura(idProyeccionSeguroInfraestructura);
    }
}
