//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.SaneamientoBasicoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.SaneamientoBasicoService;
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
* @Since 30/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class SaneamientoBasicoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private SaneamientoBasicoService saneamientoBasicoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/saneamientosBasicos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idSaneamientoBasico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idInfraestructura) {
        return new ResponseEntity<>(saneamientoBasicoService.contarTotalRegistros(idSaneamientoBasico, keyword, idInfraestructura), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS SANEAMIENTOS BÁSICOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/saneamientosBasicos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<SaneamientoBasicoDTO>> listarSaneamientosBasicosLista(
            @RequestParam(required = false) Long idSaneamientoBasico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(saneamientoBasicoService.listarSaneamientosBasicos(idSaneamientoBasico, keyword, idInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR SANEAMIENTOS BÁSICOS CON QUERY PARAMS:
    @GetMapping("/saneamientosBasicos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<SaneamientoBasicoDTO>> listarSaneamientosBasicosListaPag(
            @RequestParam(required = false) Long idSaneamientoBasico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(saneamientoBasicoService.listarSaneamientosBasicosPag(pageable, idSaneamientoBasico, keyword, idInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/saneamientosBasicos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearSaneamientoBasico(@RequestBody SaneamientoBasicoDTO saneamientoBasicoDTO){
        return saneamientoBasicoService.crearSaneamientoBasico(saneamientoBasicoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/saneamientosBasicos/{idSaneamientoBasico}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarSaneamientoBasicobyId(@PathVariable Long idSaneamientoBasico){
        return saneamientoBasicoService.consultarSaneamientoBasicoporId(idSaneamientoBasico);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/saneamientosBasicos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarSaneamientoBasico(@RequestBody SaneamientoBasicoDTO saneamientoBasicoDTO){
        return saneamientoBasicoService.actualizarSaneamientoBasico(saneamientoBasicoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/saneamientosBasicos/{idSaneamientoBasico}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarSaneamientoBasico(@PathVariable Long idSaneamientoBasico){
        return saneamientoBasicoService.eliminarSaneamientoBasico(idSaneamientoBasico);
    }
}
