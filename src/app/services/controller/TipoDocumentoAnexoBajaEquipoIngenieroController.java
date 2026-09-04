//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoDocumentoAnexoBajaEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoDocumentoAnexoBajaEquipoIngenieroService;
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
public class TipoDocumentoAnexoBajaEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoDocumentoAnexoBajaEquipoIngenieroService tipoDocumentoAnexoBajaEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDocumentosAnexosBajasEquiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTiposDocumentosAnexosBajasEquiposIngenieros(
            @RequestParam(required = false) Long idTipoDocumentoAnexoBajaEquipoIngeniero,
            @RequestParam(required = false) String keyword){
        return new ResponseEntity<>(tipoDocumentoAnexoBajaEquipoIngenieroService.contarTotalRegistros(idTipoDocumentoAnexoBajaEquipoIngeniero, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDocumentosAnexosBajasEquiposIngenieros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoDocumentoAnexoBajaEquipoIngenieroDTO>> listarTiposDocumentosAnexosBajasEquiposIngenieros(
            @RequestParam(required = false) Long idTipoDocumentoAnexoBajaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode){
        return new ResponseEntity<>(tipoDocumentoAnexoBajaEquipoIngenieroService.listarTiposDocumentosAnexosBajasEquiposIngenieros(idTipoDocumentoAnexoBajaEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS PAGINADOS:
    @GetMapping("/tiposDocumentosAnexosBajasEquiposIngenieros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoDocumentoAnexoBajaEquipoIngenieroDTO>> listarTiposDocumentosAnexosBajasEquiposIngenierosPag(
            @RequestParam(required = false) Long idTipoDocumentoAnexoBajaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoDocumentoAnexoBajaEquipoIngenieroService.listarTiposDocumentosAnexosBajasEquiposIngenierosPag(pageable, idTipoDocumentoAnexoBajaEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposDocumentosAnexosBajasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoDocumentoAnexoBajaEquipoIngeniero(@RequestBody TipoDocumentoAnexoBajaEquipoIngenieroDTO tipoDocumentoAnexoBajaEquipoIngenieroDTO){
        System.out.println(tipoDocumentoAnexoBajaEquipoIngenieroDTO);
        return tipoDocumentoAnexoBajaEquipoIngenieroService.crearTipoDocumentoAnexoBajaEquipoIngeniero(tipoDocumentoAnexoBajaEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposDocumentosAnexosBajasEquiposIngenieros/{idTipoDocumentoAnexoBajaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDocumentoAnexoBajaEquipoIngenieroporId(@PathVariable Long idTipoDocumentoAnexoBajaEquipoIngeniero){
        return tipoDocumentoAnexoBajaEquipoIngenieroService.consultarTipoDocumentoAnexoBajaEquipoIngenieroporId(idTipoDocumentoAnexoBajaEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposDocumentosAnexosBajasEquiposIngenieros/nombre/{nombreTipoDocumentoAnexoBajaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDocumentoAnexoBajaEquipoIngenieroporNombre(@PathVariable String nombreTipoDocumentoAnexoBajaEquipoIngeniero){
        return tipoDocumentoAnexoBajaEquipoIngenieroService.consultarTipoDocumentoAnexoBajaEquipoIngenieroporNombre(nombreTipoDocumentoAnexoBajaEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposDocumentosAnexosBajasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoDocumentoAnexoBajaEquipoIngeniero(@RequestBody TipoDocumentoAnexoBajaEquipoIngenieroDTO tipoDocumentoAnexoBajaEquipoIngenieroDTO){
        return tipoDocumentoAnexoBajaEquipoIngenieroService.actualizarTipoDocumentoAnexoBajaEquipoIngeniero(tipoDocumentoAnexoBajaEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposDocumentosAnexosBajasEquiposIngenieros/{idTipoDocumentoAnexoBajaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoDocumentoAnexoBajaEquipoIngeniero(@PathVariable Long idTipoDocumentoAnexoBajaEquipoIngeniero){
        return tipoDocumentoAnexoBajaEquipoIngenieroService.eliminarTipoDocumentoAnexoBajaEquipoIngeniero(idTipoDocumentoAnexoBajaEquipoIngeniero);
    }
}
