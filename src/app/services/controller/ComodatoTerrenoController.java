//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ComodatoTerrenoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ComodatoTerrenoService;
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
public class ComodatoTerrenoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ComodatoTerrenoService comodatoTerrenoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/comodatosTerrenos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idComodatoTerreno,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idTerreno) {
        return new ResponseEntity<>(comodatoTerrenoService.contarTotalRegistros(idComodatoTerreno, keyword, idTerreno), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS COMODATOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/comodatosTerrenos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ComodatoTerrenoDTO>> listarComodatosTerrenosLista(
            @RequestParam(required = false) Long idComodatoTerreno,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idTerreno,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(comodatoTerrenoService.listarComodatosTerrenos(idComodatoTerreno, keyword, idTerreno, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR COMODATOS CON QUERY PARAMS:
    @GetMapping("/comodatosTerrenos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ComodatoTerrenoDTO>> listarComodatosTerrenosListaPag(
            @RequestParam(required = false) Long idComodatoTerreno,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idTerreno,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(comodatoTerrenoService.listarComodatosTerrenosPag(pageable, idComodatoTerreno, keyword, idTerreno, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/comodatosTerrenos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearComodatoTerreno(@RequestBody ComodatoTerrenoDTO comodatoTerrenoDTO){
        return comodatoTerrenoService.crearComodatoTerreno(comodatoTerrenoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/comodatosTerrenos/{idComodatoTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarComodatoTerrenobyId(@PathVariable Long idComodatoTerreno){
        return comodatoTerrenoService.consultarComodatoTerrenoporId(idComodatoTerreno);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/comodatosTerrenos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarComodatoTerreno(@RequestBody ComodatoTerrenoDTO comodatoTerrenoDTO){
        return comodatoTerrenoService.actualizarComodatoTerreno(comodatoTerrenoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/comodatosTerrenos/{idComodatoTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarComodatoTerreno(@PathVariable Long idComodatoTerreno){
        return comodatoTerrenoService.eliminarComodatoTerreno(idComodatoTerreno);
    }
}
