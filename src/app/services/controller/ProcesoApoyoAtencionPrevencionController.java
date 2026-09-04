//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ProcesoApoyoAtencionPrevencionDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ProcesoApoyoAtencionPrevencionService;
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
* @Since 25/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ProcesoApoyoAtencionPrevencionController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ProcesoApoyoAtencionPrevencionService procesoApoyoAtencionPrevencionService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/procesosApoyosAtencionPrevencion/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idProcesoApoyoAtencionPrevencion,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreTipoRequerimientoApoyoAtencionPrevencion) {
        return new ResponseEntity<>(procesoApoyoAtencionPrevencionService.contarTotalRegistros(idProcesoApoyoAtencionPrevencion, keyword, nombreTipoRequerimientoApoyoAtencionPrevencion), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/procesosApoyosAtencionPrevencion/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ProcesoApoyoAtencionPrevencionDTO>> listarProcesosApoyosAtencionPrevencionLista(
            @RequestParam(required = false) Long idProcesoApoyoAtencionPrevencion,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreTipoRequerimientoApoyoAtencionPrevencion,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(procesoApoyoAtencionPrevencionService.listarProcesosApoyosAtencionPrevencion(idProcesoApoyoAtencionPrevencion, keyword, nombreTipoRequerimientoApoyoAtencionPrevencion, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/procesosApoyosAtencionPrevencion/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ProcesoApoyoAtencionPrevencionDTO>> listarProcesosApoyosAtencionPrevencion(
            @RequestParam(required = false) Long idProcesoApoyoAtencionPrevencion,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreTipoRequerimientoApoyoAtencionPrevencion,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(procesoApoyoAtencionPrevencionService.listarProcesosApoyosAtencionPrevencionPag(pageable, idProcesoApoyoAtencionPrevencion, keyword, nombreTipoRequerimientoApoyoAtencionPrevencion, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/procesosApoyosAtencionPrevencion")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearProcesoApoyoAtencionPrevencion(@RequestBody ProcesoApoyoAtencionPrevencionDTO procesoApoyoAtencionPrevencionDTO) {
        System.out.println(procesoApoyoAtencionPrevencionDTO);
        return procesoApoyoAtencionPrevencionService.crearProcesoApoyoAtencionPrevencion(procesoApoyoAtencionPrevencionDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/procesosApoyosAtencionPrevencion/{idProcesoApoyoAtencionPrevencion}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProcesoApoyoAtencionPrevencionporId(@PathVariable Long idProcesoApoyoAtencionPrevencion) {
        return procesoApoyoAtencionPrevencionService.consultarProcesoApoyoAtencionPrevencionporId(idProcesoApoyoAtencionPrevencion);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE Y NOMBRE DE TIPO DE REQUERIMIENTO APOYO ATENCIÓN PREVENCIÓN:
    @GetMapping("/procesosApoyosAtencionPrevencion/nombre/{nombreProcesoApoyoAtencionPrevencion}/tipoRequerimientoApoyoAtencionPrevencion/{nombreTipoRequerimientoApoyoAtencionPrevencion}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarProcesoApoyoAtencionPrevencionporNombreYNombreTipoRequerimientoApoyoAtencionPrevencion(@PathVariable String nombreProcesoApoyoAtencionPrevencion, @PathVariable String nombreTipoRequerimientoApoyoAtencionPrevencion) {
        return procesoApoyoAtencionPrevencionService.consultarProcesoApoyoAtencionPrevencionporNombreYNombreTipoRequerimientoApoyoAtencionPrevencion(nombreProcesoApoyoAtencionPrevencion, nombreTipoRequerimientoApoyoAtencionPrevencion);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/procesosApoyosAtencionPrevencion")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarProcesoApoyoAtencionPrevencion(@RequestBody ProcesoApoyoAtencionPrevencionDTO procesoApoyoAtencionPrevencionDTO) {
        return procesoApoyoAtencionPrevencionService.actualizarProcesoApoyoAtencionPrevencion(procesoApoyoAtencionPrevencionDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/procesosApoyosAtencionPrevencion/{idProcesoApoyoAtencionPrevencion}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarProcesoApoyoAtencionPrevencion(@PathVariable Long idProcesoApoyoAtencionPrevencion) {
        return procesoApoyoAtencionPrevencionService.eliminarProcesoApoyoAtencionPrevencion(idProcesoApoyoAtencionPrevencion);
    }
}
