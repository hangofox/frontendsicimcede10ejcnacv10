//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoRequerimientoApoyoAtencionPrevencionDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoRequerimientoApoyoAtencionPrevencionService;
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
public class TipoRequerimientoApoyoAtencionPrevencionController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoRequerimientoApoyoAtencionPrevencionService tipoRequerimientoApoyoAtencionPrevencionService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposRequerimientosApoyosAtencionPrevencion/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoRequerimientoApoyoAtencionPrevencion,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(tipoRequerimientoApoyoAtencionPrevencionService.contarTotalRegistros(idTipoRequerimientoApoyoAtencionPrevencion, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/tiposRequerimientosApoyosAtencionPrevencion/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoRequerimientoApoyoAtencionPrevencionDTO>> listarTiposRequerimientosApoyosAtencionPrevencionLista(
            @RequestParam(required = false) Long idTipoRequerimientoApoyoAtencionPrevencion,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(tipoRequerimientoApoyoAtencionPrevencionService.listarTiposRequerimientosApoyosAtencionPrevencion(idTipoRequerimientoApoyoAtencionPrevencion, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/tiposRequerimientosApoyosAtencionPrevencion/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoRequerimientoApoyoAtencionPrevencionDTO>> listarTiposRequerimientosApoyosAtencionPrevencion(
            @RequestParam(required = false) Long idTipoRequerimientoApoyoAtencionPrevencion,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoRequerimientoApoyoAtencionPrevencionService.listarTiposRequerimientosApoyosAtencionPrevencionPag(pageable, idTipoRequerimientoApoyoAtencionPrevencion, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposRequerimientosApoyosAtencionPrevencion")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoRequerimientoApoyoAtencionPrevencion(@RequestBody TipoRequerimientoApoyoAtencionPrevencionDTO tipoRequerimientoApoyoAtencionPrevencionDTO){
        System.out.println(tipoRequerimientoApoyoAtencionPrevencionDTO);
        return tipoRequerimientoApoyoAtencionPrevencionService.crearTipoRequerimientoApoyoAtencionPrevencion(tipoRequerimientoApoyoAtencionPrevencionDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposRequerimientosApoyosAtencionPrevencion/{idTipoRequerimientoApoyoAtencionPrevencion}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoRequerimientoApoyoAtencionPrevencionporId(@PathVariable Long idTipoRequerimientoApoyoAtencionPrevencion){
        return tipoRequerimientoApoyoAtencionPrevencionService.consultarTipoRequerimientoApoyoAtencionPrevencionporId(idTipoRequerimientoApoyoAtencionPrevencion);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposRequerimientosApoyosAtencionPrevencion/nombre/{nombreTipoRequerimientoApoyoAtencionPrevencion}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoRequerimientoApoyoAtencionPrevencionporNombre(@PathVariable String nombreTipoRequerimientoApoyoAtencionPrevencion){
        return tipoRequerimientoApoyoAtencionPrevencionService.consultarTipoRequerimientoApoyoAtencionPrevencionporNombre(nombreTipoRequerimientoApoyoAtencionPrevencion);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposRequerimientosApoyosAtencionPrevencion")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoRequerimientoApoyoAtencionPrevencion(@RequestBody TipoRequerimientoApoyoAtencionPrevencionDTO tipoRequerimientoApoyoAtencionPrevencionDTO){
        return tipoRequerimientoApoyoAtencionPrevencionService.actualizarTipoRequerimientoApoyoAtencionPrevencion(tipoRequerimientoApoyoAtencionPrevencionDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposRequerimientosApoyosAtencionPrevencion/{idTipoRequerimientoApoyoAtencionPrevencion}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoRequerimientoApoyoAtencionPrevencion(@PathVariable Long idTipoRequerimientoApoyoAtencionPrevencion){
        return tipoRequerimientoApoyoAtencionPrevencionService.eliminarTipoRequerimientoApoyoAtencionPrevencion(idTipoRequerimientoApoyoAtencionPrevencion);
    }
}
