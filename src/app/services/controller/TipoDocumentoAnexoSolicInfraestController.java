//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoDocumentoAnexoSolicInfraestDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoDocumentoAnexoSolicInfraestService;
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
public class TipoDocumentoAnexoSolicInfraestController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoDocumentoAnexoSolicInfraestService tipoDocumentoAnexoSolicInfraestService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDocumentosAnexosSolicInfraest/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTiposDocumentosAnexosSolicInfraest(
            @RequestParam(required = false) Long idTipoDocumentoAnexoSolicInfraest,
            @RequestParam(required = false) String keyword){
        return new ResponseEntity<>(tipoDocumentoAnexoSolicInfraestService.contarTotalRegistros(idTipoDocumentoAnexoSolicInfraest, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDocumentosAnexosSolicInfraest/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoDocumentoAnexoSolicInfraestDTO>> listarTiposDocumentosAnexosSolicInfraest(
            @RequestParam(required = false) Long idTipoDocumentoAnexoSolicInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode){
        return new ResponseEntity<>(tipoDocumentoAnexoSolicInfraestService.listarTiposDocumentosAnexosSolicInfraest(idTipoDocumentoAnexoSolicInfraest, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS PAGINADOS:
    @GetMapping("/tiposDocumentosAnexosSolicInfraest/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoDocumentoAnexoSolicInfraestDTO>> listarTiposDocumentosAnexosSolicInfraestPag(
            @RequestParam(required = false) Long idTipoDocumentoAnexoSolicInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoDocumentoAnexoSolicInfraestService.listarTiposDocumentosAnexosSolicInfraestPag(pageable, idTipoDocumentoAnexoSolicInfraest, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposDocumentosAnexosSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoDocumentoAnexoSolicInfraest(@RequestBody TipoDocumentoAnexoSolicInfraestDTO tipoDocumentoAnexoSolicInfraestDTO){
        System.out.println(tipoDocumentoAnexoSolicInfraestDTO);
        return tipoDocumentoAnexoSolicInfraestService.crearTipoDocumentoAnexoSolicInfraest(tipoDocumentoAnexoSolicInfraestDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposDocumentosAnexosSolicInfraest/{idTipoDocumentoAnexoSolicInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDocumentoAnexoSolicInfraestporId(@PathVariable Long idTipoDocumentoAnexoSolicInfraest){
        return tipoDocumentoAnexoSolicInfraestService.consultarTipoDocumentoAnexoSolicInfraestporId(idTipoDocumentoAnexoSolicInfraest);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposDocumentosAnexosSolicInfraest/nombre/{nombreTipoDocumentoAnexoSolicInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDocumentoAnexoSolicInfraestporNombre(@PathVariable String nombreTipoDocumentoAnexoSolicInfraest){
        return tipoDocumentoAnexoSolicInfraestService.consultarTipoDocumentoAnexoSolicInfraestporNombre(nombreTipoDocumentoAnexoSolicInfraest);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposDocumentosAnexosSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoDocumentoAnexoSolicInfraest(@RequestBody TipoDocumentoAnexoSolicInfraestDTO tipoDocumentoAnexoSolicInfraestDTO){
        return tipoDocumentoAnexoSolicInfraestService.actualizarTipoDocumentoAnexoSolicInfraest(tipoDocumentoAnexoSolicInfraestDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposDocumentosAnexosSolicInfraest/{idTipoDocumentoAnexoSolicInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoDocumentoAnexoSolicInfraest(@PathVariable Long idTipoDocumentoAnexoSolicInfraest){
        return tipoDocumentoAnexoSolicInfraestService.eliminarTipoDocumentoAnexoSolicInfraest(idTipoDocumentoAnexoSolicInfraest);
    }
}
