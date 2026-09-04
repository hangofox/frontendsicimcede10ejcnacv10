//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.InclusionSeguroInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.InclusionSeguroInfraestructuraService;
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
* @Since 15/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class InclusionSeguroInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private InclusionSeguroInfraestructuraService inclusionSeguroInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/inclusionesSeguroInfraestructura/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idInclusionSeguroInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionSeguroInfraestructura) {
        return new ResponseEntity<>(inclusionSeguroInfraestructuraService.contarTotalRegistros(idInclusionSeguroInfraestructura, keyword, idProyeccionSeguroInfraestructura), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS INCLUSIONES SEGURO INFRAESTRUCTURA SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/inclusionesSeguroInfraestructura/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<InclusionSeguroInfraestructuraDTO>> listarInclusionesSeguroInfraestructuraLista(
            @RequestParam(required = false) Long idInclusionSeguroInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionSeguroInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(inclusionSeguroInfraestructuraService.listarInclusionesSeguroInfraestructura(idInclusionSeguroInfraestructura, keyword, idProyeccionSeguroInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR INCLUSIONES SEGURO INFRAESTRUCTURA CON QUERY PARAMS:
    @GetMapping("/inclusionesSeguroInfraestructura/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<InclusionSeguroInfraestructuraDTO>> listarInclusionesSeguroInfraestructuraListaPag(
            @RequestParam(required = false) Long idInclusionSeguroInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionSeguroInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(inclusionSeguroInfraestructuraService.listarInclusionesSeguroInfraestructuraPag(pageable, idInclusionSeguroInfraestructura, keyword, idProyeccionSeguroInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/inclusionesSeguroInfraestructura")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/inclusionesSeguroInfraestructura")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearInclusionSeguroInfraestructura(@RequestBody InclusionSeguroInfraestructuraDTO inclusionSeguroInfraestructuraDTO){
        System.out.println(inclusionSeguroInfraestructuraDTO);
        return inclusionSeguroInfraestructuraService.crearInclusionSeguroInfraestructura(inclusionSeguroInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/inclusionesSeguroInfraestructura/{idInclusionSeguroInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarInclusionSeguroInfraestructurabyId(@PathVariable Long idInclusionSeguroInfraestructura){
        return inclusionSeguroInfraestructuraService.consultarInclusionSeguroInfraestructuraporId(idInclusionSeguroInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/inclusionesSeguroInfraestructura")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/inclusionesSeguroInfraestructura")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarInclusionSeguroInfraestructura(@RequestBody InclusionSeguroInfraestructuraDTO inclusionSeguroInfraestructuraDTO){
        return inclusionSeguroInfraestructuraService.actualizarInclusionSeguroInfraestructura(inclusionSeguroInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/inclusionesSeguroInfraestructura/{idInclusionSeguroInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarInclusionSeguroInfraestructura(@PathVariable Long idInclusionSeguroInfraestructura){
        return inclusionSeguroInfraestructuraService.eliminarInclusionSeguroInfraestructura(idInclusionSeguroInfraestructura);
    }
}
