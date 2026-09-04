//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoEntidadInstitucionalDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoEntidadInstitucionalService;
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
public class TipoEntidadInstitucionalController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoEntidadInstitucionalService tipoEntidadInstitucionalService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposEntidadesInstitucionales/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoEntidadInstitucional,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(tipoEntidadInstitucionalService.contarTotalRegistros(idTipoEntidadInstitucional, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS ENTIDAD INSTITUCIONAL SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/tiposEntidadesInstitucionales/lista")
    public ResponseEntity<List<TipoEntidadInstitucionalDTO>> listarTiposEntidadesInstitucionalesLista(
            @RequestParam(required = false) Long idTipoEntidadInstitucional,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(tipoEntidadInstitucionalService.listarTiposEntidadesInstitucionales(idTipoEntidadInstitucional, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS ENTIDAD INSTITUCIONAL CON QUERY PARAMS:
    @GetMapping("/tiposEntidadesInstitucionales/listaPag")
    public ResponseEntity<Slice<TipoEntidadInstitucionalDTO>> listarTiposEntidadesInstitucionales(
            @RequestParam(required = false) Long idTipoEntidadInstitucional,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoEntidadInstitucionalService.listarTiposEntidadesInstitucionalesPag(pageable, idTipoEntidadInstitucional, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposEntidadesInstitucionales")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoEntidadInstitucional(@RequestBody TipoEntidadInstitucionalDTO tipoEntidadInstitucionalDTO){
        System.out.println(tipoEntidadInstitucionalDTO);
        return tipoEntidadInstitucionalService.crearTipoEntidadInstitucional(tipoEntidadInstitucionalDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposEntidadesInstitucionales/{idTipoEntidadInstitucional}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoEntidadInstitucionalbyId(@PathVariable Long idTipoEntidadInstitucional){
        return tipoEntidadInstitucionalService.consultarTipoEntidadInstitucionalporId(idTipoEntidadInstitucional);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposEntidadesInstitucionales/nombre/{nombreTipoEntidadInstitucional}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoEntidadInstitucionalbyNombre(@PathVariable String nombreTipoEntidadInstitucional){
        return tipoEntidadInstitucionalService.consultarTipoEntidadInstitucionalporNombre(nombreTipoEntidadInstitucional);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposEntidadesInstitucionales")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoEntidadInstitucional(@RequestBody TipoEntidadInstitucionalDTO tipoEntidadInstitucionalDTO){
        return tipoEntidadInstitucionalService.actualizarTipoEntidadInstitucional(tipoEntidadInstitucionalDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposEntidadesInstitucionales/{idTipoEntidadInstitucional}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoEntidadInstitucional(@PathVariable Long idTipoEntidadInstitucional){
        return tipoEntidadInstitucionalService.eliminarTipoEntidadInstitucional(idTipoEntidadInstitucional);
    }
}
