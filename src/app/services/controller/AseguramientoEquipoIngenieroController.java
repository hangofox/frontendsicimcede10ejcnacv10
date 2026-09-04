//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.AseguramientoEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.AseguramientoEquipoIngenieroService;
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
public class AseguramientoEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private AseguramientoEquipoIngenieroService aseguramientoEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/aseguramientosEquiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idAseguramientoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero) {
        return new ResponseEntity<>(aseguramientoEquipoIngenieroService.contarTotalRegistros(idAseguramientoEquipoIngeniero, keyword, idEquipoIngeniero), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS ASEGURAMIENTOS DE EQUIPOS INGENIEROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/aseguramientosEquiposIngenieros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<AseguramientoEquipoIngenieroDTO>> listarAseguramientosEquiposIngenieros(
            @RequestParam(required = false) Long idAseguramientoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(aseguramientoEquipoIngenieroService.listarAseguramientosEquiposIngenieros(idAseguramientoEquipoIngeniero, keyword, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR ASEGURAMIENTOS DE EQUIPOS INGENIEROS CON QUERY PARAMS:
    @GetMapping("/aseguramientosEquiposIngenieros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<AseguramientoEquipoIngenieroDTO>> listarAseguramientosEquiposIngenierosPag(
            @RequestParam(required = false) Long idAseguramientoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(aseguramientoEquipoIngenieroService.listarAseguramientosEquiposIngenierosPag(pageable, idAseguramientoEquipoIngeniero, keyword, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/aseguramientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/aseguramientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearAseguramientoEquipoIngeniero(@RequestBody AseguramientoEquipoIngenieroDTO aseguramientoEquipoIngenieroDTO){
        System.out.println(aseguramientoEquipoIngenieroDTO);
        return aseguramientoEquipoIngenieroService.crearAseguramientoEquipoIngeniero(aseguramientoEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/aseguramientosEquiposIngenieros/{idAseguramientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarAseguramientoEquipoIngenierobyId(@PathVariable Long idAseguramientoEquipoIngeniero){
        return aseguramientoEquipoIngenieroService.consultarAseguramientoEquipoIngenieroporId(idAseguramientoEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/aseguramientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/aseguramientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarAseguramientoEquipoIngeniero(@RequestBody AseguramientoEquipoIngenieroDTO aseguramientoEquipoIngenieroDTO){
        return aseguramientoEquipoIngenieroService.actualizarAseguramientoEquipoIngeniero(aseguramientoEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/aseguramientosEquiposIngenieros/{idAseguramientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarAseguramientoEquipoIngeniero(@PathVariable Long idAseguramientoEquipoIngeniero){
        return aseguramientoEquipoIngenieroService.eliminarAseguramientoEquipoIngeniero(idAseguramientoEquipoIngeniero);
    }
}
