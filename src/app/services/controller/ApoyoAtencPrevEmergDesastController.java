//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ApoyoAtencPrevEmergDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ApoyoAtencPrevEmergDesastService;
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
public class ApoyoAtencPrevEmergDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ApoyoAtencPrevEmergDesastService apoyoAtencPrevEmergDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/apoyosAtencPrevEmergDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idApoyoAtencPrevEmergDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idUnidadMilitar,
            @RequestParam(required = false) Long idProcesoApoyoAtencionPrevencion) {
        return new ResponseEntity<>(apoyoAtencPrevEmergDesastService.contarTotalRegistros(idApoyoAtencPrevEmergDesast, keyword, idUnidadMilitar, idProcesoApoyoAtencionPrevencion), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS APOYOS ATENC PREV EMERG DESAST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/apoyosAtencPrevEmergDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ApoyoAtencPrevEmergDesastDTO>> listarApoyosAtencPrevEmergDesast(
            @RequestParam(required = false) Long idApoyoAtencPrevEmergDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idUnidadMilitar,
            @RequestParam(required = false) Long idProcesoApoyoAtencionPrevencion,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(apoyoAtencPrevEmergDesastService.listarApoyosAtencPrevEmergDesast(idApoyoAtencPrevEmergDesast, keyword, idUnidadMilitar, idProcesoApoyoAtencionPrevencion, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR APOYOS ATENC PREV EMERG DESAST CON QUERY PARAMS:
    @GetMapping("/apoyosAtencPrevEmergDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ApoyoAtencPrevEmergDesastDTO>> listarApoyosAtencPrevEmergDesastPag(
            @RequestParam(required = false) Long idApoyoAtencPrevEmergDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idUnidadMilitar,
            @RequestParam(required = false) Long idProcesoApoyoAtencionPrevencion,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(apoyoAtencPrevEmergDesastService.listarApoyosAtencPrevEmergDesastPag(pageable, idApoyoAtencPrevEmergDesast, keyword, idUnidadMilitar, idProcesoApoyoAtencionPrevencion, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/apoyosAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/apoyosAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearApoyoAtencPrevEmergDesast(@RequestBody ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO){
        System.out.println(apoyoAtencPrevEmergDesastDTO);
        return apoyoAtencPrevEmergDesastService.crearApoyoAtencPrevEmergDesast(apoyoAtencPrevEmergDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/apoyosAtencPrevEmergDesast/{idApoyoAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarApoyoAtencPrevEmergDesastbyId(@PathVariable Long idApoyoAtencPrevEmergDesast){
        return apoyoAtencPrevEmergDesastService.consultarApoyoAtencPrevEmergDesastporId(idApoyoAtencPrevEmergDesast);
    }
    
    //LEER CONSULTA DE REGISTRO POR CÓDIGO RADICADO (CAMPO ÚNICO):
    @GetMapping("/apoyosAtencPrevEmergDesast/codigoRadicado/{codigoRadicadoApoyoAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarApoyoAtencPrevEmergDesastporCodigoRadicado(@PathVariable String codigoRadicadoApoyoAtencPrevEmergDesast) {
        return apoyoAtencPrevEmergDesastService.consultarApoyoAtencPrevEmergDesastporCodigoRadicado(codigoRadicadoApoyoAtencPrevEmergDesast);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/apoyosAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/apoyosAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarApoyoAtencPrevEmergDesast(@RequestBody ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO){
        return apoyoAtencPrevEmergDesastService.actualizarApoyoAtencPrevEmergDesast(apoyoAtencPrevEmergDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/apoyosAtencPrevEmergDesast/{idApoyoAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarApoyoAtencPrevEmergDesast(@PathVariable Long idApoyoAtencPrevEmergDesast){
        return apoyoAtencPrevEmergDesastService.eliminarApoyoAtencPrevEmergDesast(idApoyoAtencPrevEmergDesast);
    }
}
