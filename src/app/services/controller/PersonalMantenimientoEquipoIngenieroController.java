//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.PersonalMantenimientoEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.PersonalMantenimientoEquipoIngenieroService;
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
public class PersonalMantenimientoEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private PersonalMantenimientoEquipoIngenieroService personalMantenimientoEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/personalMantenimientosEquiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idPersonalMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(personalMantenimientoEquipoIngenieroService.contarTotalRegistros(idPersonalMantenimientoEquipoIngeniero, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS PERSONAL MANTENIMIENTOS EQUIPOS INGENIEROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/personalMantenimientosEquiposIngenieros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<PersonalMantenimientoEquipoIngenieroDTO>> listarPersonalMantenimientosEquiposIngenieroLista(
            @RequestParam(required = false) Long idPersonalMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(personalMantenimientoEquipoIngenieroService.listarPersonalMantenimientosEquiposIngenieros(idPersonalMantenimientoEquipoIngeniero, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR PERSONAL MANTENIMIENTOS EQUIPOS INGENIEROS CON QUERY PARAMS:
    @GetMapping("/personalMantenimientosEquiposIngenieros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<PersonalMantenimientoEquipoIngenieroDTO>> listarPersonalMantenimientosEquiposIngenieros(
            @RequestParam(required = false) Long idPersonalMantenimientoEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(personalMantenimientoEquipoIngenieroService.listarPersonalMantenimientosEquiposIngenierosPag(pageable, idPersonalMantenimientoEquipoIngeniero, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/personalMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearPersonalMantenimientoEquipoIngeniero(@RequestBody PersonalMantenimientoEquipoIngenieroDTO personalMantenimientoEquipoIngenieroDTO) {
        System.out.println(personalMantenimientoEquipoIngenieroDTO);
        return personalMantenimientoEquipoIngenieroService.crearPersonalMantenimientoEquipoIngeniero(personalMantenimientoEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/personalMantenimientosEquiposIngenieros/{idPersonalMantenimientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarPersonalMantenimientoEquipoIngenieroporId(@PathVariable Long idPersonalMantenimientoEquipoIngeniero) {
        return personalMantenimientoEquipoIngenieroService.consultarPersonalMantenimientoEquipoIngenieroporId(idPersonalMantenimientoEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE DOCUMENTO DE IDENTIFICACION:
    @GetMapping("/personalMantenimientosEquiposIngenieros/numDoc/{numDocIdentifPersonalMantenimientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarPersonalMantenimientoEquipoIngenieroporNumDocIdentif(@PathVariable String numDocIdentifPersonalMantenimientoEquipoIngeniero) {
        return personalMantenimientoEquipoIngenieroService.consultarPersonalMantenimientoEquipoIngenieroporNumDocIdentif(numDocIdentifPersonalMantenimientoEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/personalMantenimientosEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarPersonalMantenimientoEquipoIngeniero(@RequestBody PersonalMantenimientoEquipoIngenieroDTO personalMantenimientoEquipoIngenieroDTO) {
        return personalMantenimientoEquipoIngenieroService.actualizarPersonalMantenimientoEquipoIngeniero(personalMantenimientoEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/personalMantenimientosEquiposIngenieros/{idPersonalMantenimientoEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarPersonalMantenimientoEquipoIngeniero(@PathVariable Long idPersonalMantenimientoEquipoIngeniero) {
        return personalMantenimientoEquipoIngenieroService.eliminarPersonalMantenimientoEquipoIngeniero(idPersonalMantenimientoEquipoIngeniero);
    }
}
