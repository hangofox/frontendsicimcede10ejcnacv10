//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.LineaEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.LineaEquipoIngenieroService;
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
* @Since 17/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class LineaEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private LineaEquipoIngenieroService lineaEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/lineasEquiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idLineaEquipoIngeniero,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(lineaEquipoIngenieroService.contarTotalRegistros(idLineaEquipoIngeniero, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/lineasEquiposIngenieros/lista")
    public ResponseEntity<List<LineaEquipoIngenieroDTO>> listarLineasEquiposIngenierosLista(
            @RequestParam(required = false) Long idLineaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(lineaEquipoIngenieroService.listarLineasEquiposIngenieros(idLineaEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/lineasEquiposIngenieros/listaPag")
    public ResponseEntity<Slice<LineaEquipoIngenieroDTO>> listarLineasEquiposIngenierosPag(
            @RequestParam(required = false) Long idLineaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(lineaEquipoIngenieroService.listarLineasEquiposIngenierosPag(pageable, idLineaEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/lineasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/lineasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearLineaEquipoIngeniero(@RequestBody LineaEquipoIngenieroDTO lineaEquipoIngenieroDTO){
        System.out.println(lineaEquipoIngenieroDTO);
        return lineaEquipoIngenieroService.crearLineaEquipoIngeniero(lineaEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/lineasEquiposIngenieros/{idLineaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarLineaEquipoIngenierobyId(@PathVariable Long idLineaEquipoIngeniero){
        return lineaEquipoIngenieroService.consultarLineaEquipoIngenieroporId(idLineaEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/lineasEquiposIngenieros/nombre/{nombreLineaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarLineaEquipoIngenierobyNombre(@PathVariable String nombreLineaEquipoIngeniero){
        return lineaEquipoIngenieroService.consultarLineaEquipoIngenieroporNombre(nombreLineaEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/lineasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/lineasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarLineaEquipoIngeniero(@RequestBody LineaEquipoIngenieroDTO lineaEquipoIngenieroDTO){
        return lineaEquipoIngenieroService.actualizarLineaEquipoIngeniero(lineaEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/lineasEquiposIngenieros/{idLineaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarLineaEquipoIngeniero(@PathVariable Long idLineaEquipoIngeniero){
        return lineaEquipoIngenieroService.eliminarLineaEquipoIngeniero(idLineaEquipoIngeniero);
    }
}
