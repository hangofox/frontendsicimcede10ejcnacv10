//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.IntegrantesApoyosAtencPrevEmergDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.IntegrantesApoyosAtencPrevEmergDesastService;
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
* @Since 01/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class IntegrantesApoyosAtencPrevEmergDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private IntegrantesApoyosAtencPrevEmergDesastService integrantesApoyosAtencPrevEmergDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/integrantesApoyosAtencPrevEmergDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idIntegrantesApoyosAtencPrevEmergDesast,
            @RequestParam(required = false) Long idApoyoAtencPrevEmergDesast,
            @RequestParam(required = false) String gradoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String nombresJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String primerApellidoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String cargoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String gradoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String nombresJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String primerApellidoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String cargoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String gradoCteUnidadMilitar,
            @RequestParam(required = false) String nombresCteUnidadMilitar,
            @RequestParam(required = false) String primerApellidoCteUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoCteUnidadMilitar,
            @RequestParam(required = false) String cargoCteUnidadMilitar,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(integrantesApoyosAtencPrevEmergDesastService.contarTotalRegistros(idIntegrantesApoyosAtencPrevEmergDesast, idApoyoAtencPrevEmergDesast, gradoJefeGestionRiesgoUnidadMilitar, nombresJefeGestionRiesgoUnidadMilitar, primerApellidoJefeGestionRiesgoUnidadMilitar, segundoApellidoJefeGestionRiesgoUnidadMilitar, cargoJefeGestionRiesgoUnidadMilitar, gradoJefeOperacionesUnidadMilitar, nombresJefeOperacionesUnidadMilitar, primerApellidoJefeOperacionesUnidadMilitar, segundoApellidoJefeOperacionesUnidadMilitar, cargoJefeOperacionesUnidadMilitar, gradoCteUnidadMilitar, nombresCteUnidadMilitar, primerApellidoCteUnidadMilitar, segundoApellidoCteUnidadMilitar, cargoCteUnidadMilitar, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS INTEGRANTES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/integrantesApoyosAtencPrevEmergDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<IntegrantesApoyosAtencPrevEmergDesastDTO>> listarIntegrantesApoyosAtencPrevEmergDesastLista(
            @RequestParam(required = false) Long idIntegrantesApoyosAtencPrevEmergDesast,
            @RequestParam(required = false) Long idApoyoAtencPrevEmergDesast,
            @RequestParam(required = false) String gradoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String nombresJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String primerApellidoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String cargoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String gradoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String nombresJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String primerApellidoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String cargoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String gradoCteUnidadMilitar,
            @RequestParam(required = false) String nombresCteUnidadMilitar,
            @RequestParam(required = false) String primerApellidoCteUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoCteUnidadMilitar,
            @RequestParam(required = false) String cargoCteUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode) {
        return new ResponseEntity<>(integrantesApoyosAtencPrevEmergDesastService.listarIntegrantesApoyosAtencPrevEmergDesast(idIntegrantesApoyosAtencPrevEmergDesast, idApoyoAtencPrevEmergDesast, gradoJefeGestionRiesgoUnidadMilitar, nombresJefeGestionRiesgoUnidadMilitar, primerApellidoJefeGestionRiesgoUnidadMilitar, segundoApellidoJefeGestionRiesgoUnidadMilitar, cargoJefeGestionRiesgoUnidadMilitar, gradoJefeOperacionesUnidadMilitar, nombresJefeOperacionesUnidadMilitar, primerApellidoJefeOperacionesUnidadMilitar, segundoApellidoJefeOperacionesUnidadMilitar, cargoJefeOperacionesUnidadMilitar, gradoCteUnidadMilitar, nombresCteUnidadMilitar, primerApellidoCteUnidadMilitar, segundoApellidoCteUnidadMilitar, cargoCteUnidadMilitar, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR INTEGRANTES CON QUERY PARAMS:
    @GetMapping("/integrantesApoyosAtencPrevEmergDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<IntegrantesApoyosAtencPrevEmergDesastDTO>> listarIntegrantesApoyosAtencPrevEmergDesastListaPag(
            @RequestParam(required = false) Long idIntegrantesApoyosAtencPrevEmergDesast,
            @RequestParam(required = false) Long idApoyoAtencPrevEmergDesast,
            @RequestParam(required = false) String gradoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String nombresJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String primerApellidoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String cargoJefeGestionRiesgoUnidadMilitar,
            @RequestParam(required = false) String gradoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String nombresJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String primerApellidoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String cargoJefeOperacionesUnidadMilitar,
            @RequestParam(required = false) String gradoCteUnidadMilitar,
            @RequestParam(required = false) String nombresCteUnidadMilitar,
            @RequestParam(required = false) String primerApellidoCteUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoCteUnidadMilitar,
            @RequestParam(required = false) String cargoCteUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(integrantesApoyosAtencPrevEmergDesastService.listarIntegrantesApoyosAtencPrevEmergDesastPag(pageable, idIntegrantesApoyosAtencPrevEmergDesast, idApoyoAtencPrevEmergDesast, gradoJefeGestionRiesgoUnidadMilitar, nombresJefeGestionRiesgoUnidadMilitar, primerApellidoJefeGestionRiesgoUnidadMilitar, segundoApellidoJefeGestionRiesgoUnidadMilitar, cargoJefeGestionRiesgoUnidadMilitar, gradoJefeOperacionesUnidadMilitar, nombresJefeOperacionesUnidadMilitar, primerApellidoJefeOperacionesUnidadMilitar, segundoApellidoJefeOperacionesUnidadMilitar, cargoJefeOperacionesUnidadMilitar, gradoCteUnidadMilitar, nombresCteUnidadMilitar, primerApellidoCteUnidadMilitar, segundoApellidoCteUnidadMilitar, cargoCteUnidadMilitar, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/integrantesApoyosAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearIntegrantesApoyosAtencPrevEmergDesast(@RequestBody IntegrantesApoyosAtencPrevEmergDesastDTO integrantesApoyosAtencPrevEmergDesastDTO){
        return integrantesApoyosAtencPrevEmergDesastService.crearIntegrantesApoyosAtencPrevEmergDesast(integrantesApoyosAtencPrevEmergDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/integrantesApoyosAtencPrevEmergDesast/{idIntegrantesApoyosAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarIntegrantesApoyosAtencPrevEmergDesastbyId(@PathVariable Long idIntegrantesApoyosAtencPrevEmergDesast){
        return integrantesApoyosAtencPrevEmergDesastService.consultarIntegrantesApoyosAtencPrevEmergDesastporId(idIntegrantesApoyosAtencPrevEmergDesast);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/integrantesApoyosAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarIntegrantesApoyosAtencPrevEmergDesast(@RequestBody IntegrantesApoyosAtencPrevEmergDesastDTO integrantesApoyosAtencPrevEmergDesastDTO){
        return integrantesApoyosAtencPrevEmergDesastService.actualizarIntegrantesApoyosAtencPrevEmergDesast(integrantesApoyosAtencPrevEmergDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/integrantesApoyosAtencPrevEmergDesast/{idIntegrantesApoyosAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarIntegrantesApoyosAtencPrevEmergDesast(@PathVariable Long idIntegrantesApoyosAtencPrevEmergDesast){
        return integrantesApoyosAtencPrevEmergDesastService.eliminarIntegrantesApoyosAtencPrevEmergDesast(idIntegrantesApoyosAtencPrevEmergDesast);
    }
}
