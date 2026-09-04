//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.EstadoTerrenoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.EstadoTerrenoService;
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
* @Since 16/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class EstadoTerrenoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private EstadoTerrenoService estadoTerrenoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT LISTAR TODOS LOS ESTADOS TERRENOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/estadosTerrenos/lista")
    public ResponseEntity<List<EstadoTerrenoDTO>> listarEstadosTerrenosLista(
            @RequestParam(required = false) Long idEstadoTerreno,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(estadoTerrenoService.listarEstadosTerrenosOrdenadosporId(idEstadoTerreno, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/ORDENAR/PAGINAR ESTADOS TERRENOS CON QUERY PARAMS:
    @GetMapping("/estadosTerrenos/listaPag")
    public ResponseEntity<Slice<EstadoTerrenoDTO>> listarEstadosTerrenosPag(
            @RequestParam(required = false) Long idEstadoTerreno,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(estadoTerrenoService.listarEstadosTerrenosOrdenadosporIdPag(pageable, idEstadoTerreno, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/estadosTerrenos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/estadosTerrenos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearEstadoTerreno(@RequestBody EstadoTerrenoDTO estadoTerrenoDTO){
        System.out.println(estadoTerrenoDTO);
        return estadoTerrenoService.crearEstadoTerreno(estadoTerrenoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/estadosTerrenos/{idEstadoTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarEstadoTerrenoporId(@PathVariable Long idEstadoTerreno){
        return estadoTerrenoService.consultarEstadoTerrenoporId(idEstadoTerreno);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/estadosTerrenos/nombre/{nombreEstadoTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarEstadoTerrenoporNombre(@PathVariable String nombreEstadoTerreno){
        return estadoTerrenoService.consultarEstadoTerrenoporNombre(nombreEstadoTerreno);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/estadosTerrenos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/estadosTerrenos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarEstadoTerreno(@RequestBody EstadoTerrenoDTO estadoTerrenoDTO){
        return estadoTerrenoService.actualizarEstadoTerreno(estadoTerrenoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/estadosTerrenos/{idEstadoTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarEstadoTerreno(@PathVariable Long idEstadoTerreno){
        return estadoTerrenoService.eliminarEstadoTerreno(idEstadoTerreno);
    }
}
