//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoDocumentoAnexoAltaEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoDocumentoAnexoAltaEquipoIngenieroService;
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
public class TipoDocumentoAnexoAltaEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoDocumentoAnexoAltaEquipoIngenieroService tipoDocumentoAnexoAltaEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDocumentosAnexosAltasEquiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTiposDocumentosAnexosAltasEquiposIngenieros(
            @RequestParam(required = false) Long idTipoDocumentoAnexoAltaEquipoIngeniero,
            @RequestParam(required = false) String keyword){
        return new ResponseEntity<>(tipoDocumentoAnexoAltaEquipoIngenieroService.contarTotalRegistros(idTipoDocumentoAnexoAltaEquipoIngeniero, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDocumentosAnexosAltasEquiposIngenieros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoDocumentoAnexoAltaEquipoIngenieroDTO>> listarTiposDocumentosAnexosAltasEquiposIngenieros(
            @RequestParam(required = false) Long idTipoDocumentoAnexoAltaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode){
        return new ResponseEntity<>(tipoDocumentoAnexoAltaEquipoIngenieroService.listarTiposDocumentosAnexosAltasEquiposIngenieros(idTipoDocumentoAnexoAltaEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS PAGINADOS:
    @GetMapping("/tiposDocumentosAnexosAltasEquiposIngenieros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoDocumentoAnexoAltaEquipoIngenieroDTO>> listarTiposDocumentosAnexosAltasEquiposIngenierosPag(
            @RequestParam(required = false) Long idTipoDocumentoAnexoAltaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoDocumentoAnexoAltaEquipoIngenieroService.listarTiposDocumentosAnexosAltasEquiposIngenierosPag(pageable, idTipoDocumentoAnexoAltaEquipoIngeniero, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposDocumentosAnexosAltasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoDocumentoAnexoAltaEquipoIngeniero(@RequestBody TipoDocumentoAnexoAltaEquipoIngenieroDTO tipoDocumentoAnexoAltaEquipoIngenieroDTO){
        System.out.println(tipoDocumentoAnexoAltaEquipoIngenieroDTO);
        return tipoDocumentoAnexoAltaEquipoIngenieroService.crearTipoDocumentoAnexoAltaEquipoIngeniero(tipoDocumentoAnexoAltaEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposDocumentosAnexosAltasEquiposIngenieros/{idTipoDocumentoAnexoAltaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDocumentoAnexoAltaEquipoIngenieroporId(@PathVariable Long idTipoDocumentoAnexoAltaEquipoIngeniero){
        return tipoDocumentoAnexoAltaEquipoIngenieroService.consultarTipoDocumentoAnexoAltaEquipoIngenieroporId(idTipoDocumentoAnexoAltaEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposDocumentosAnexosAltasEquiposIngenieros/nombre/{nombreTipoDocumentoAnexoAltaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDocumentoAnexoAltaEquipoIngenieroporNombre(@PathVariable String nombreTipoDocumentoAnexoAltaEquipoIngeniero){
        return tipoDocumentoAnexoAltaEquipoIngenieroService.consultarTipoDocumentoAnexoAltaEquipoIngenieroporNombre(nombreTipoDocumentoAnexoAltaEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposDocumentosAnexosAltasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoDocumentoAnexoAltaEquipoIngeniero(@RequestBody TipoDocumentoAnexoAltaEquipoIngenieroDTO tipoDocumentoAnexoAltaEquipoIngenieroDTO){
        return tipoDocumentoAnexoAltaEquipoIngenieroService.actualizarTipoDocumentoAnexoAltaEquipoIngeniero(tipoDocumentoAnexoAltaEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposDocumentosAnexosAltasEquiposIngenieros/{idTipoDocumentoAnexoAltaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoDocumentoAnexoAltaEquipoIngeniero(@PathVariable Long idTipoDocumentoAnexoAltaEquipoIngeniero){
        return tipoDocumentoAnexoAltaEquipoIngenieroService.eliminarTipoDocumentoAnexoAltaEquipoIngeniero(idTipoDocumentoAnexoAltaEquipoIngeniero);
    }
}
