//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.IntegrantesApoyosObrRedMitigGestRiesgDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.IntegrantesApoyosObrRedMitigGestRiesgDesastService;
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
public class IntegrantesApoyosObrRedMitigGestRiesgDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private IntegrantesApoyosObrRedMitigGestRiesgDesastService integrantesApoyosObrRedMitigGestRiesgDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/integrantesApoyosObrRedMitigGestRiesgDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idIntegrantesApoyosObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) Long idApoyoObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String gradoJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String nombresJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String primerApellidoJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String cargoJefeSeccionTecnicaUnidadMilitar,
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
        return new ResponseEntity<>(integrantesApoyosObrRedMitigGestRiesgDesastService.contarTotalRegistros(idIntegrantesApoyosObrRedMitigGestRiesgDesast, idApoyoObrRedMitigGestRiesgDesast, gradoJefeSeccionTecnicaUnidadMilitar, nombresJefeSeccionTecnicaUnidadMilitar, primerApellidoJefeSeccionTecnicaUnidadMilitar, segundoApellidoJefeSeccionTecnicaUnidadMilitar, cargoJefeSeccionTecnicaUnidadMilitar, gradoJefeOperacionesUnidadMilitar, nombresJefeOperacionesUnidadMilitar, primerApellidoJefeOperacionesUnidadMilitar, segundoApellidoJefeOperacionesUnidadMilitar, cargoJefeOperacionesUnidadMilitar, gradoCteUnidadMilitar, nombresCteUnidadMilitar, primerApellidoCteUnidadMilitar, segundoApellidoCteUnidadMilitar, cargoCteUnidadMilitar, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS INTEGRANTES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/integrantesApoyosObrRedMitigGestRiesgDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<IntegrantesApoyosObrRedMitigGestRiesgDesastDTO>> listarIntegrantesApoyosObrRedMitigGestRiesgDesastLista(
            @RequestParam(required = false) Long idIntegrantesApoyosObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) Long idApoyoObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String gradoJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String nombresJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String primerApellidoJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String cargoJefeSeccionTecnicaUnidadMilitar,
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
        return new ResponseEntity<>(integrantesApoyosObrRedMitigGestRiesgDesastService.listarIntegrantesApoyosObrRedMitigGestRiesgDesast(idIntegrantesApoyosObrRedMitigGestRiesgDesast, idApoyoObrRedMitigGestRiesgDesast, gradoJefeSeccionTecnicaUnidadMilitar, nombresJefeSeccionTecnicaUnidadMilitar, primerApellidoJefeSeccionTecnicaUnidadMilitar, segundoApellidoJefeSeccionTecnicaUnidadMilitar, cargoJefeSeccionTecnicaUnidadMilitar, gradoJefeOperacionesUnidadMilitar, nombresJefeOperacionesUnidadMilitar, primerApellidoJefeOperacionesUnidadMilitar, segundoApellidoJefeOperacionesUnidadMilitar, cargoJefeOperacionesUnidadMilitar, gradoCteUnidadMilitar, nombresCteUnidadMilitar, primerApellidoCteUnidadMilitar, segundoApellidoCteUnidadMilitar, cargoCteUnidadMilitar, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR INTEGRANTES CON QUERY PARAMS:
    @GetMapping("/integrantesApoyosObrRedMitigGestRiesgDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<IntegrantesApoyosObrRedMitigGestRiesgDesastDTO>> listarIntegrantesApoyosObrRedMitigGestRiesgDesastListaPag(
            @RequestParam(required = false) Long idIntegrantesApoyosObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) Long idApoyoObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String gradoJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String nombresJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String primerApellidoJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String segundoApellidoJefeSeccionTecnicaUnidadMilitar,
            @RequestParam(required = false) String cargoJefeSeccionTecnicaUnidadMilitar,
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
        return new ResponseEntity<>(integrantesApoyosObrRedMitigGestRiesgDesastService.listarIntegrantesApoyosObrRedMitigGestRiesgDesastPag(pageable, idIntegrantesApoyosObrRedMitigGestRiesgDesast, idApoyoObrRedMitigGestRiesgDesast, gradoJefeSeccionTecnicaUnidadMilitar, nombresJefeSeccionTecnicaUnidadMilitar, primerApellidoJefeSeccionTecnicaUnidadMilitar, segundoApellidoJefeSeccionTecnicaUnidadMilitar, cargoJefeSeccionTecnicaUnidadMilitar, gradoJefeOperacionesUnidadMilitar, nombresJefeOperacionesUnidadMilitar, primerApellidoJefeOperacionesUnidadMilitar, segundoApellidoJefeOperacionesUnidadMilitar, cargoJefeOperacionesUnidadMilitar, gradoCteUnidadMilitar, nombresCteUnidadMilitar, primerApellidoCteUnidadMilitar, segundoApellidoCteUnidadMilitar, cargoCteUnidadMilitar, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/integrantesApoyosObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearIntegrantesApoyosObrRedMitigGestRiesgDesast(@RequestBody IntegrantesApoyosObrRedMitigGestRiesgDesastDTO integrantesApoyosObrRedMitigGestRiesgDesastDTO){
        return integrantesApoyosObrRedMitigGestRiesgDesastService.crearIntegrantesApoyosObrRedMitigGestRiesgDesast(integrantesApoyosObrRedMitigGestRiesgDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/integrantesApoyosObrRedMitigGestRiesgDesast/{idIntegrantesApoyosObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarIntegrantesApoyosObrRedMitigGestRiesgDesastbyId(@PathVariable Long idIntegrantesApoyosObrRedMitigGestRiesgDesast){
        return integrantesApoyosObrRedMitigGestRiesgDesastService.consultarIntegrantesApoyosObrRedMitigGestRiesgDesastporId(idIntegrantesApoyosObrRedMitigGestRiesgDesast);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/integrantesApoyosObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarIntegrantesApoyosObrRedMitigGestRiesgDesast(@RequestBody IntegrantesApoyosObrRedMitigGestRiesgDesastDTO integrantesApoyosObrRedMitigGestRiesgDesastDTO){
        return integrantesApoyosObrRedMitigGestRiesgDesastService.actualizarIntegrantesApoyosObrRedMitigGestRiesgDesast(integrantesApoyosObrRedMitigGestRiesgDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/integrantesApoyosObrRedMitigGestRiesgDesast/{idIntegrantesApoyosObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarIntegrantesApoyosObrRedMitigGestRiesgDesast(@PathVariable Long idIntegrantesApoyosObrRedMitigGestRiesgDesast){
        return integrantesApoyosObrRedMitigGestRiesgDesastService.eliminarIntegrantesApoyosObrRedMitigGestRiesgDesast(idIntegrantesApoyosObrRedMitigGestRiesgDesast);
    }
}
