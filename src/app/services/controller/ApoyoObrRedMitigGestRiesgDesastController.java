//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ApoyoObrRedMitigGestRiesgDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ApoyoObrRedMitigGestRiesgDesastService;
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
* @Since 27/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ApoyoObrRedMitigGestRiesgDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ApoyoObrRedMitigGestRiesgDesastService apoyoObrRedMitigGestRiesgDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS.
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/apoyosObrRedMitigGestRiesgDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idApoyoObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(apoyoObrRedMitigGestRiesgDesastService.contarTotalRegistros(idApoyoObrRedMitigGestRiesgDesast, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
    //ENDPOINT PARA LISTAR TODOS LOS APOYOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/apoyosObrRedMitigGestRiesgDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ApoyoObrRedMitigGestRiesgDesastDTO>> listarApoyosObrRedMitigGestRiesgDesastLista(
            @RequestParam(required = false) Long idApoyoObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(apoyoObrRedMitigGestRiesgDesastService.listarApoyosObrRedMitigGestRiesgDesast(idApoyoObrRedMitigGestRiesgDesast, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR APOYOS CON QUERY PARAMS:
    @GetMapping("/apoyosObrRedMitigGestRiesgDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ApoyoObrRedMitigGestRiesgDesastDTO>> listarApoyosObrRedMitigGestRiesgDesastListaPag(
            @RequestParam(required = false) Long idApoyoObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(apoyoObrRedMitigGestRiesgDesastService.listarApoyosObrRedMitigGestRiesgDesastPag(pageable, idApoyoObrRedMitigGestRiesgDesast, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/apoyosObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearApoyoObrRedMitigGestRiesgDesast(@RequestBody ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO){
        System.out.println(apoyoObrRedMitigGestRiesgDesastDTO);
        return apoyoObrRedMitigGestRiesgDesastService.crearApoyoObrRedMitigGestRiesgDesast(apoyoObrRedMitigGestRiesgDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/apoyosObrRedMitigGestRiesgDesast/{idApoyoObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarApoyoObrRedMitigGestRiesgDesastbyId(@PathVariable Long idApoyoObrRedMitigGestRiesgDesast){
        return apoyoObrRedMitigGestRiesgDesastService.consultarApoyoObrRedMitigGestRiesgDesastporId(idApoyoObrRedMitigGestRiesgDesast);
    }
    
    //LEER CONSULTA DE REGISTRO POR CÓDIGO RADICADO:
    @GetMapping("/apoyosObrRedMitigGestRiesgDesast/codigoRadicado/{codigoRadicadoApoyoObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CÓDIGO RADICADO.
    public RespuestaDTO consultarApoyoObrRedMitigGestRiesgDesastporCodigoRadicado(@PathVariable String codigoRadicadoApoyoObrRedMitigGestRiesgDesast){
        return apoyoObrRedMitigGestRiesgDesastService.consultarApoyoObrRedMitigGestRiesgDesastporCodigoRadicado(codigoRadicadoApoyoObrRedMitigGestRiesgDesast);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/apoyosObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarApoyoObrRedMitigGestRiesgDesast(@RequestBody ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO){
        return apoyoObrRedMitigGestRiesgDesastService.actualizarApoyoObrRedMitigGestRiesgDesast(apoyoObrRedMitigGestRiesgDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/apoyosObrRedMitigGestRiesgDesast/{idApoyoObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarApoyoObrRedMitigGestRiesgDesast(@PathVariable Long idApoyoObrRedMitigGestRiesgDesast){
        return apoyoObrRedMitigGestRiesgDesastService.eliminarApoyoObrRedMitigGestRiesgDesast(idApoyoObrRedMitigGestRiesgDesast);
    }
}
