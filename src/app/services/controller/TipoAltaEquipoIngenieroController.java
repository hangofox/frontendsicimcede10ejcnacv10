//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoAltaEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoAltaEquipoIngenieroService;
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
* @Since 01/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class TipoAltaEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoAltaEquipoIngenieroService tipoAltaEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //1. CONTADORES DE REGISTROS FILTRADOS.
    //CONTAR TOTAL DE REGISTROS (CON FILTROS OPCIONALES POR KEYWORD DE TIPO ALTA EQUIPO INGENIERO):
    @GetMapping("/tiposAltasEquiposIngenieros/count")
    public ResponseEntity<Long> contarTotalTiposAltasEquiposIngenieros(
            @RequestParam(required = false) Long idTipoAltaEquipoIngeniero,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(tipoAltaEquipoIngenieroService.contarTotalRegistros(idTipoAltaEquipoIngeniero, keyword), HttpStatus.OK);
    }
    
    //1. LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
    //LISTAR REGISTROS (CON FILTROS OPCIONALES POR KEYWORD DE TIPO ALTA EQUIPO INGENIERO):
    @GetMapping("/tiposAltasEquiposIngenieros/lista")
    public ResponseEntity<List<TipoAltaEquipoIngenieroDTO>> listarTiposAltasEquiposIngenierosLista(
            @RequestParam(required = false) Long idTipoAltaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "id") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(tipoAltaEquipoIngenieroService.listarTiposAltasEquiposIngenieros(idTipoAltaEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //1. LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
    //LISTAR REGISTROS CON PAGINACIÓN (CON FILTROS OPCIONALES POR KEYWORD DE TIPO ALTA EQUIPO INGENIERO):
    @GetMapping("/tiposAltasEquiposIngenieros/listaPag")
    public ResponseEntity<Slice<TipoAltaEquipoIngenieroDTO>> listarTiposAltasEquiposIngenierosListaPag(
            @RequestParam(required = false) Long idTipoAltaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "id") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoAltaEquipoIngenieroService.listarTiposAltasEquiposIngenierosPag(pageable, idTipoAltaEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposAltasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoAltaEquipoIngeniero(@RequestBody TipoAltaEquipoIngenieroDTO tipoAltaEquipoIngenieroDTO){
        System.out.println(tipoAltaEquipoIngenieroDTO);
        return tipoAltaEquipoIngenieroService.crearTipoAltaEquipoIngeniero(tipoAltaEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposAltasEquiposIngenieros/{idTipoAltaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoAltaEquipoIngenierobyId(@PathVariable Long idTipoAltaEquipoIngeniero){
        return tipoAltaEquipoIngenieroService.consultarTipoAltaEquipoIngenieroporId(idTipoAltaEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposAltasEquiposIngenieros/nombre/{nombreTipoAltaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoAltaEquipoIngenierobyNombre(@PathVariable String nombreTipoAltaEquipoIngeniero){
        return tipoAltaEquipoIngenieroService.consultarTipoAltaEquipoIngenieroporNombre(nombreTipoAltaEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposAltasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoAltaEquipoIngeniero(@RequestBody TipoAltaEquipoIngenieroDTO tipoAltaEquipoIngenieroDTO){
        return tipoAltaEquipoIngenieroService.actualizarTipoAltaEquipoIngeniero(tipoAltaEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposAltasEquiposIngenieros/{idTipoAltaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoAltaEquipoIngeniero(@PathVariable Long idTipoAltaEquipoIngeniero){
        return tipoAltaEquipoIngenieroService.eliminarTipoAltaEquipoIngeniero(idTipoAltaEquipoIngeniero);
    }
}
