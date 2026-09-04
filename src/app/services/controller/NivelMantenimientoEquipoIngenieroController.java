//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.NivelMantenimientoEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.NivelMantenimientoEquipoIngenieroService;
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
public class NivelMantenimientoEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private NivelMantenimientoEquipoIngenieroService nivelMantenimientoEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE NIVELES MANTENIMIENTOS EQUIPOS INGENIEROS:
    @GetMapping("/nivelesMantenimientosEquiposIngenieros/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idNivelMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(nivelMantenimientoEquipoIngenieroService.contarTotalRegistros(idNivelMantenimientoEquipoIngeniero, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS NIVELES MANTENIMIENTOS EQUIPOS INGENIEROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/nivelesMantenimientosEquiposIngenieros/lista")
    public ResponseEntity<List<NivelMantenimientoEquipoIngenieroDTO>> listarNivelesMantenimientosEquiposIngenierosLista(
            @RequestParam(required = false) Long idNivelMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(nivelMantenimientoEquipoIngenieroService.listarNivelesMantenimientosEquiposIngenieros(idNivelMantenimientoEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR NIVELES MANTENIMIENTOS EQUIPOS INGENIEROS CON QUERY PARAMS:
    @GetMapping("/nivelesMantenimientosEquiposIngenieros/listaPag")
    public ResponseEntity<Slice<NivelMantenimientoEquipoIngenieroDTO>> listarNivelesMantenimientosEquiposIngenieros(
            @RequestParam(required = false) Long idNivelMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(nivelMantenimientoEquipoIngenieroService.listarNivelesMantenimientosEquiposIngenierosOrdenadosporIdPag(pageable, idNivelMantenimientoEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/nivelesMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/nivelesMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearNivelMantenimientoEquipoIngeniero(@RequestBody NivelMantenimientoEquipoIngenieroDTO nivelMantenimientoEquipoIngenieroDTO){
        System.out.println(nivelMantenimientoEquipoIngenieroDTO);
        return nivelMantenimientoEquipoIngenieroService.crearNivelMantenimientoEquipoIngeniero(nivelMantenimientoEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/nivelesMantenimientosEquiposIngenieros/{idNivelMantenimientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarNivelMantenimientoEquipoIngenierobyId(@PathVariable Long idNivelMantenimientoEquipoIngeniero){
        return nivelMantenimientoEquipoIngenieroService.consultarNivelMantenimientoEquipoIngenieroporId(idNivelMantenimientoEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/nivelesMantenimientosEquiposIngenieros/nombre/{nombreNivelMantenimientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarNivelMantenimientoEquipoIngenierobyNombre(@PathVariable String nombreNivelMantenimientoEquipoIngeniero){
        return nivelMantenimientoEquipoIngenieroService.consultarNivelMantenimientoEquipoIngenieroporNombre(nombreNivelMantenimientoEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/nivelesMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/nivelesMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarNivelMantenimientoEquipoIngeniero(@RequestBody NivelMantenimientoEquipoIngenieroDTO nivelMantenimientoEquipoIngenieroDTO){
        return nivelMantenimientoEquipoIngenieroService.actualizarNivelMantenimientoEquipoIngeniero(nivelMantenimientoEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/nivelesMantenimientosEquiposIngenieros/{idNivelMantenimientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarNivelMantenimientoEquipoIngeniero(@PathVariable Long idNivelMantenimientoEquipoIngeniero){
        return nivelMantenimientoEquipoIngenieroService.eliminarNivelMantenimientoEquipoIngeniero(idNivelMantenimientoEquipoIngeniero);
    }
}
