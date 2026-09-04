//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoDocumentoIdentificacionDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoDocumentoIdentificacionService;
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
* @Since 01/08/2023.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class TipoDocumentoIdentificacionController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoDocumentoIdentificacionService tipoDocumentoIdentificacionService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDocumentosIdentificacion/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTiposDocumentosIdentificacion(
            @RequestParam(required = false) Long idTipoDocumentoIdentificacion,
            @RequestParam(required = false) String keyword){
        return new ResponseEntity<>(tipoDocumentoIdentificacionService.contarTotalRegistros(idTipoDocumentoIdentificacion, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDocumentosIdentificacion/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoDocumentoIdentificacionDTO>> listarTiposDocumentosIdentificacion(
            @RequestParam(required = false) Long idTipoDocumentoIdentificacion,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode){
        return new ResponseEntity<>(tipoDocumentoIdentificacionService.listarTiposDocumentosIdentificacion(idTipoDocumentoIdentificacion, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS PAGINADOS:
    @GetMapping("/tiposDocumentosIdentificacion/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoDocumentoIdentificacionDTO>> listarTiposDocumentosIdentificacionPag(
            @RequestParam(required = false) Long idTipoDocumentoIdentificacion,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoDocumentoIdentificacionService.listarTiposDocumentosIdentificacionPag(pageable, idTipoDocumentoIdentificacion, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposDocumentosIdentificacion")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoDocumentoIdentificacion(@RequestBody TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO){
        System.out.println(tipoDocumentoIdentificacionDTO);
        return tipoDocumentoIdentificacionService.crearTipoDocumentoIdentificacion(tipoDocumentoIdentificacionDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposDocumentosIdentificacion/{idTipoDocumentoIdentificacion}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDocumentoIdentificacionporId(@PathVariable Long idTipoDocumentoIdentificacion){
        return tipoDocumentoIdentificacionService.consultarTipoDocumentoIdentificacionporId(idTipoDocumentoIdentificacion);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposDocumentosIdentificacion/nombre/{nombreTipoDocumentoIdentificacion}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDocumentoIdentificacionporNombre(@PathVariable String nombreTipoDocumentoIdentificacion){
        return tipoDocumentoIdentificacionService.consultarTipoDocumentoIdentificacionporNombre(nombreTipoDocumentoIdentificacion);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposDocumentosIdentificacion")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoDocumentoIdentificacion(@RequestBody TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO){
        return tipoDocumentoIdentificacionService.actualizarTipoDocumentoIdentificacion(tipoDocumentoIdentificacionDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposDocumentosIdentificacion/{idTipoDocumentoIdentificacion}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoDocumentoIdentificacion(@PathVariable Long idTipoDocumentoIdentificacion){
        return tipoDocumentoIdentificacionService.eliminarTipoDocumentoIdentificacion(idTipoDocumentoIdentificacion);
    }
}
