//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialQuimicoPiscinaInfraestDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialQuimicoPiscinaInfraestService;
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
public class HistorialQuimicoPiscinaInfraestController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialQuimicoPiscinaInfraestService historialQuimicoPiscinaInfraestService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesQuimicosPiscinasInfraest/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialQuimicoPiscinaInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idInfraestructura) {
        return new ResponseEntity<>(historialQuimicoPiscinaInfraestService.contarTotalRegistros(idHistorialQuimicoPiscinaInfraest, keyword, idInfraestructura), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES QUIMICOS PISCINAS INFRAEST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesQuimicosPiscinasInfraest/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialQuimicoPiscinaInfraestDTO>> listarHistorialesQuimicosPiscinasInfraestLista(
            @RequestParam(required = false) Long idHistorialQuimicoPiscinaInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialQuimicoPiscinaInfraestService.listarHistorialesQuimicosPiscinasInfraest(idHistorialQuimicoPiscinaInfraest, keyword, idInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES QUIMICOS PISCINAS INFRAEST CON QUERY PARAMS:
    @GetMapping("/historialesQuimicosPiscinasInfraest/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialQuimicoPiscinaInfraestDTO>> listarHistorialesQuimicosPiscinasInfraestListaPag(
            @RequestParam(required = false) Long idHistorialQuimicoPiscinaInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialQuimicoPiscinaInfraestService.listarHistorialesQuimicosPiscinasInfraestPag(pageable, idHistorialQuimicoPiscinaInfraest, keyword, idInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesQuimicosPiscinasInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/historialesQuimicosPiscinasInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialQuimicoPiscinaInfraest(@RequestBody HistorialQuimicoPiscinaInfraestDTO historialQuimicoPiscinaInfraestDTO){
        System.out.println(historialQuimicoPiscinaInfraestDTO);
        return historialQuimicoPiscinaInfraestService.crearHistorialQuimicoPiscinaInfraest(historialQuimicoPiscinaInfraestDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesQuimicosPiscinasInfraest/{idHistorialQuimicoPiscinaInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialQuimicoPiscinaInfraestbyId(@PathVariable Long idHistorialQuimicoPiscinaInfraest){
        return historialQuimicoPiscinaInfraestService.consultarHistorialQuimicoPiscinaInfraestporId(idHistorialQuimicoPiscinaInfraest);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO (CAMPO ÚNICO):
    @GetMapping("/historialesQuimicosPiscinasInfraest/numeroRegistro/{numRegHistorialQuimicoPiscinaInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarHistorialQuimicoPiscinaInfraestbyNumReg(@PathVariable String numRegHistorialQuimicoPiscinaInfraest) {
        return historialQuimicoPiscinaInfraestService.consultarHistorialQuimicoPiscinaInfraestporNumReg(numRegHistorialQuimicoPiscinaInfraest);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/historialesQuimicosPiscinasInfraest/nombre")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NOMBRE.
    public RespuestaDTO consultarHistorialQuimicoPiscinaInfraestbyNombre(@RequestParam(required = false) String nombreHistorialQuimicoPiscinaInfraest){
        return historialQuimicoPiscinaInfraestService.consultarHistorialQuimicoPiscinaInfraestporNombre(nombreHistorialQuimicoPiscinaInfraest);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/historialesQuimicosPiscinasInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/historialesQuimicosPiscinasInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialQuimicoPiscinaInfraest(@RequestBody HistorialQuimicoPiscinaInfraestDTO historialQuimicoPiscinaInfraestDTO){
        return historialQuimicoPiscinaInfraestService.actualizarHistorialQuimicoPiscinaInfraest(historialQuimicoPiscinaInfraestDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesQuimicosPiscinasInfraest/{idHistorialQuimicoPiscinaInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialQuimicoPiscinaInfraest(@PathVariable Long idHistorialQuimicoPiscinaInfraest){
        return historialQuimicoPiscinaInfraestService.eliminarHistorialQuimicoPiscinaInfraest(idHistorialQuimicoPiscinaInfraest);
    }
}
