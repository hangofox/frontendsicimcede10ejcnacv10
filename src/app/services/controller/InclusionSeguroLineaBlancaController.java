//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.InclusionSeguroLineaBlancaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.InclusionSeguroLineaBlancaService;
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
public class InclusionSeguroLineaBlancaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private InclusionSeguroLineaBlancaService inclusionSeguroLineaBlancaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/inclusionesSeguroLineaBlanca/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idInclusionSeguroLineaBlanca,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idAseguramientoLineaBlanca) {
        return new ResponseEntity<>(inclusionSeguroLineaBlancaService.contarTotalRegistros(idInclusionSeguroLineaBlanca, keyword, idAseguramientoLineaBlanca), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS INCLUSIONES SEGURO LINEA BLANCA SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/inclusionesSeguroLineaBlanca/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<InclusionSeguroLineaBlancaDTO>> listarInclusionesSeguroLineaBlancaLista(
            @RequestParam(required = false) Long idInclusionSeguroLineaBlanca,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idAseguramientoLineaBlanca,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(inclusionSeguroLineaBlancaService.listarInclusionesSeguroLineaBlanca(idInclusionSeguroLineaBlanca, keyword, idAseguramientoLineaBlanca, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR INCLUSIONES SEGURO LINEA BLANCA CON QUERY PARAMS:
    @GetMapping("/inclusionesSeguroLineaBlanca/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<InclusionSeguroLineaBlancaDTO>> listarInclusionesSeguroLineaBlancaListaPag(
            @RequestParam(required = false) Long idInclusionSeguroLineaBlanca,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idAseguramientoLineaBlanca,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(inclusionSeguroLineaBlancaService.listarInclusionesSeguroLineaBlancaPag(pageable, idInclusionSeguroLineaBlanca, keyword, idAseguramientoLineaBlanca, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/inclusionesSeguroLineaBlanca")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/inclusionesSeguroLineaBlanca")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearInclusionSeguroLineaBlanca(@RequestBody InclusionSeguroLineaBlancaDTO inclusionSeguroLineaBlancaDTO){
        System.out.println(inclusionSeguroLineaBlancaDTO);
        return inclusionSeguroLineaBlancaService.crearInclusionSeguroLineaBlanca(inclusionSeguroLineaBlancaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/inclusionesSeguroLineaBlanca/{idInclusionSeguroLineaBlanca}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarInclusionSeguroLineaBlancabyId(@PathVariable Long idInclusionSeguroLineaBlanca){
        return inclusionSeguroLineaBlancaService.consultarInclusionSeguroLineaBlancaporId(idInclusionSeguroLineaBlanca);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/inclusionesSeguroLineaBlanca")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/inclusionesSeguroLineaBlanca")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarInclusionSeguroLineaBlanca(@RequestBody InclusionSeguroLineaBlancaDTO inclusionSeguroLineaBlancaDTO){
        return inclusionSeguroLineaBlancaService.actualizarInclusionSeguroLineaBlanca(inclusionSeguroLineaBlancaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/inclusionesSeguroLineaBlanca/{idInclusionSeguroLineaBlanca}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarInclusionSeguroLineaBlanca(@PathVariable Long idInclusionSeguroLineaBlanca){
        return inclusionSeguroLineaBlancaService.eliminarInclusionSeguroLineaBlanca(idInclusionSeguroLineaBlanca);
    }
}
