//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TerrenoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TerrenoService;
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
public class TerrenoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TerrenoService terrenoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/terrenos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTerreno,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(terrenoService.contarTotalRegistros(idTerreno, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }

    //ENDPOINT LISTAR TODOS LOS TERRENOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/terrenos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TerrenoDTO>> listarTerrenosLista(
            @RequestParam(required = false) Long idTerreno,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(terrenoService.listarTerrenos(idTerreno, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }

    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR TERRENOS CON QUERY PARAMS:
    @GetMapping("/terrenos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TerrenoDTO>> listarTerrenosListaPag(
            @RequestParam(required = false) Long idTerreno,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(terrenoService.listarTerrenosPag(pageable, idTerreno, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/terrenos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/terrenos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTerreno(@RequestBody TerrenoDTO terrenoDTO){
        System.out.println(terrenoDTO);
        return terrenoService.crearTerreno(terrenoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/terrenos/{idTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTerrenobyId(@PathVariable Long idTerreno){
        return terrenoService.consultarTerrenoportId(idTerreno);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO INVENTARIO Y NUMERO ACTIVO FIJO (CAMPOS ÚNICOS COMBINADOS):
    @GetMapping("/terrenos/numero")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPOS ÚNICOS COMBINADOS.
    public RespuestaDTO consultarTerrenoporNumeroInventarioNumeroActivoFijo(
            @RequestParam(required = false) String numeroInventarioTerreno,
            @RequestParam(required = false) String numeroActivoFijoTerreno) {
        return terrenoService.consultarTerrenoportNumeroInventarioNumeroActivoFijo(numeroInventarioTerreno, numeroActivoFijoTerreno);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/terrenos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/terrenos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTerreno(@RequestBody TerrenoDTO terrenoDTO){
        return terrenoService.actualizarTerreno(terrenoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/terrenos/{idTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTerreno(@PathVariable Long idTerreno){
        return terrenoService.eliminarTerreno(idTerreno);
    }
}
