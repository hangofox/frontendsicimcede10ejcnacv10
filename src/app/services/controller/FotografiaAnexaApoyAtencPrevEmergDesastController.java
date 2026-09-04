//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.FotografiaAnexaApoyAtencPrevEmergDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.FotografiaAnexaApoyAtencPrevEmergDesastService;
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
public class FotografiaAnexaApoyAtencPrevEmergDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private FotografiaAnexaApoyAtencPrevEmergDesastService fotografiaAnexaApoyAtencPrevEmergDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/fotografiasAnexasApoyosAtencPrevEmergDesast/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idFotografiasAnexasApoyAtencPrevEmergDesast,
            @RequestParam(required = false) Long idApoyoAtencPrevEmergDesast) {
        return new ResponseEntity<>(fotografiaAnexaApoyAtencPrevEmergDesastService.contarTotalRegistros(idFotografiasAnexasApoyAtencPrevEmergDesast, idApoyoAtencPrevEmergDesast), HttpStatus.OK);
    }

    //ENDPOINT LISTAR TODAS LAS FOTOGRAFIAS ANEXAS APOYOS ATENC PREV EMERG DESAST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/fotografiasAnexasApoyosAtencPrevEmergDesast/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<FotografiaAnexaApoyAtencPrevEmergDesastDTO>> listarFotografiasAnexasApoyosAtencPrevEmergDesast(
            @RequestParam(required = false) Long idFotografiasAnexasApoyAtencPrevEmergDesast,
            @RequestParam(required = false) Long idApoyoAtencPrevEmergDesast,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(fotografiaAnexaApoyAtencPrevEmergDesastService.listarFotografiasAnexasApoyosAtencPrevEmergDesast(idFotografiasAnexasApoyAtencPrevEmergDesast, idApoyoAtencPrevEmergDesast, orderBy, orderMode), HttpStatus.OK);
    }

    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR FOTOGRAFIAS ANEXAS APOYOS ATENC PREV EMERG DESAST CON QUERY PARAMS:
    @GetMapping("/fotografiasAnexasApoyosAtencPrevEmergDesast/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<FotografiaAnexaApoyAtencPrevEmergDesastDTO>> listarFotografiasAnexasApoyosAtencPrevEmergDesastPag(
            @RequestParam(required = false) Long idFotografiasAnexasApoyAtencPrevEmergDesast,
            @RequestParam(required = false) Long idApoyoAtencPrevEmergDesast,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(fotografiaAnexaApoyAtencPrevEmergDesastService.listarFotografiasAnexasApoyosAtencPrevEmergDesastPag(pageable, idFotografiasAnexasApoyAtencPrevEmergDesast, idApoyoAtencPrevEmergDesast, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/fotografiasAnexasApoyosAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/fotografiasAnexasApoyosAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearFotografiaAnexaApoyAtencPrevEmergDesast(@RequestBody FotografiaAnexaApoyAtencPrevEmergDesastDTO fotografiaAnexaApoyAtencPrevEmergDesastDTO){
        System.out.println(fotografiaAnexaApoyAtencPrevEmergDesastDTO);
        return fotografiaAnexaApoyAtencPrevEmergDesastService.crearFotografiaAnexaApoyAtencPrevEmergDesast(fotografiaAnexaApoyAtencPrevEmergDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/fotografiasAnexasApoyosAtencPrevEmergDesast/{idFotografiasAnexasApoyAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarFotografiaAnexaApoyAtencPrevEmergDesastbyId(@PathVariable Long idFotografiasAnexasApoyAtencPrevEmergDesast){
        return fotografiaAnexaApoyAtencPrevEmergDesastService.consultarFotografiaAnexaApoyAtencPrevEmergDesastporId(idFotografiasAnexasApoyAtencPrevEmergDesast);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/fotografiasAnexasApoyosAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/fotografiasAnexasApoyosAtencPrevEmergDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarFotografiaAnexaApoyAtencPrevEmergDesast(@RequestBody FotografiaAnexaApoyAtencPrevEmergDesastDTO fotografiaAnexaApoyAtencPrevEmergDesastDTO){
        return fotografiaAnexaApoyAtencPrevEmergDesastService.actualizarFotografiaAnexaApoyAtencPrevEmergDesast(fotografiaAnexaApoyAtencPrevEmergDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/fotografiasAnexasApoyosAtencPrevEmergDesast/{idFotografiasAnexasApoyAtencPrevEmergDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarFotografiaAnexaApoyAtencPrevEmergDesast(@PathVariable Long idFotografiasAnexasApoyAtencPrevEmergDesast){
        return fotografiaAnexaApoyAtencPrevEmergDesastService.eliminarFotografiaAnexaApoyAtencPrevEmergDesast(idFotografiasAnexasApoyAtencPrevEmergDesast);
    }
}
