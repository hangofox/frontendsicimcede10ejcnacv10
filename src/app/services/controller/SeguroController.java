//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.SeguroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.SeguroService;
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
* @Since 24/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class SeguroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private SeguroService seguroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/seguros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idSeguro,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String estadoSeguro) {
        return new ResponseEntity<>(seguroService.contarTotalRegistros(idSeguro, keyword, estadoSeguro), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS SEGUROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/seguros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<SeguroDTO>> listarSegurosLista(
            @RequestParam(required = false) Long idSeguro,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String estadoSeguro,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(seguroService.listarSeguros(idSeguro, keyword, estadoSeguro, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR SEGUROS CON QUERY PARAMS:
    @GetMapping("/seguros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<SeguroDTO>> listarSegurosListaPag(
            @RequestParam(required = false) Long idSeguro,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String estadoSeguro,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(seguroService.listarSegurosPag(pageable, idSeguro, keyword, estadoSeguro, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/seguros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/seguros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearSeguro(@RequestBody SeguroDTO seguroDTO){
        System.out.println(seguroDTO);
        return seguroService.crearSeguro(seguroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/seguros/{idSeguro}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarSegurobyId(@PathVariable Long idSeguro){
        return seguroService.consultarSeguroportId(idSeguro);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE ASEGURADORA Y NOMBRE TIPO SEGURO (CAMPOS ÚNICOS COMBINADOS):
    @GetMapping("/seguros/aseguradora/{nombreAseguradora}/tipoSeguro/{nombreTipoSeguro}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPOS ÚNICOS COMBINADOS.
    public RespuestaDTO consultarSeguroporNombreAseguradoraAndNombreTipoSeguro(@PathVariable String nombreAseguradora, @PathVariable String nombreTipoSeguro){
        return seguroService.consultarSeguroportNombreAseguradoraAndNombreTipoSeguro(nombreAseguradora, nombreTipoSeguro);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/seguros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/seguros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarSeguro(@RequestBody SeguroDTO seguroDTO){
        return seguroService.actualizarSeguro(seguroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/seguros/{idSeguro}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarSeguro(@PathVariable Long idSeguro){
        return seguroService.eliminarSeguro(idSeguro);
    }
}
