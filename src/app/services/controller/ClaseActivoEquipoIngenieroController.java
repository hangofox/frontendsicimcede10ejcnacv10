//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ClaseActivoEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ClaseActivoEquipoIngenieroService;
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
public class ClaseActivoEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ClaseActivoEquipoIngenieroService claseActivoEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/clasesActivosEquiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idClaseActivoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreClaseActivoEquipoIngeniero) {
        return new ResponseEntity<>(claseActivoEquipoIngenieroService.contarTotalRegistros(idClaseActivoEquipoIngeniero, keyword, nombreClaseActivoEquipoIngeniero), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/clasesActivosEquiposIngenieros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ClaseActivoEquipoIngenieroDTO>> listarClasesActivosEquiposIngenierosLista(
            @RequestParam(required = false) Long idClaseActivoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreClaseActivoEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(claseActivoEquipoIngenieroService.listarClasesActivosEquiposIngenieros(idClaseActivoEquipoIngeniero, keyword, nombreClaseActivoEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/clasesActivosEquiposIngenieros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ClaseActivoEquipoIngenieroDTO>> listarClasesActivosEquiposIngenieros(
            @RequestParam(required = false) Long idClaseActivoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreClaseActivoEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(claseActivoEquipoIngenieroService.listarClasesActivosEquiposIngenierosProPag(pageable, idClaseActivoEquipoIngeniero, keyword, nombreClaseActivoEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/clasesActivosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearClaseActivoEquipoIngeniero(@RequestBody ClaseActivoEquipoIngenieroDTO claseActivoEquipoIngenieroDTO) {
        System.out.println(claseActivoEquipoIngenieroDTO);
        return claseActivoEquipoIngenieroService.crearClaseActivoEquipoIngeniero(claseActivoEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/clasesActivosEquiposIngenieros/{idClaseActivoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarClaseActivoEquipoIngenieroporId(@PathVariable Long idClaseActivoEquipoIngeniero) {
        return claseActivoEquipoIngenieroService.consultarClaseActivoEquipoIngenieroporId(idClaseActivoEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/clasesActivosEquiposIngenieros/nombre/{nombreClaseActivoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NOMBRE.
    public RespuestaDTO consultarClaseActivoEquipoIngenieroporNombreClaseActivoEquipoIngeniero(@PathVariable String nombreClaseActivoEquipoIngeniero) {
        return claseActivoEquipoIngenieroService.consultarClaseActivoEquipoIngenieroporNombreClaseActivoEquipoIngeniero(nombreClaseActivoEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NÚMERO:
    @GetMapping("/clasesActivosEquiposIngenieros/numero/{numeroClaseActivoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NÚMERO.
    public RespuestaDTO consultarClaseActivoEquipoIngenieroporNumeroClaseActivoEquipoIngeniero(@PathVariable String numeroClaseActivoEquipoIngeniero) {
        return claseActivoEquipoIngenieroService.consultarClaseActivoEquipoIngenieroporNumeroClaseActivoEquipoIngeniero(numeroClaseActivoEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/clasesActivosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarClaseActivoEquipoIngeniero(@RequestBody ClaseActivoEquipoIngenieroDTO claseActivoEquipoIngenieroDTO) {
        return claseActivoEquipoIngenieroService.actualizarClaseActivoEquipoIngeniero(claseActivoEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/clasesActivosEquiposIngenieros/{idClaseActivoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarClaseActivoEquipoIngeniero(@PathVariable Long idClaseActivoEquipoIngeniero) {
        return claseActivoEquipoIngenieroService.eliminarClaseActivoEquipoIngeniero(idClaseActivoEquipoIngeniero);
    }
}
