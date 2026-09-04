//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.DocumentacionAnexaSolicInfraestDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.DocumentacionAnexaSolicInfraestService;
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
* @Since 15/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class DocumentacionAnexaSolicInfraestController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private DocumentacionAnexaSolicInfraestService documentacionAnexaSolicInfraestService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasSolicInfraest/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idDocumentacionAnexaSolicInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idSolicitudInfraestructura) {
        return new ResponseEntity<>(documentacionAnexaSolicInfraestService.contarTotalRegistros(idDocumentacionAnexaSolicInfraest, keyword, idSolicitudInfraestructura), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODA LA DOCUMENTACION ANEXAS DE LAS SOLICITUDES DE INFRAESTRUCTURAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/documentacionAnexasSolicInfraest/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<DocumentacionAnexaSolicInfraestDTO>> listarDocumentacionAnexasSolicInfraestsLista(
            @RequestParam(required = false) Long idDocumentacionAnexaSolicInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(documentacionAnexaSolicInfraestService.listarDocumentacionAnexasSolicInfraest(idDocumentacionAnexaSolicInfraest, keyword, idSolicitudInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR DOCUMENTACION ANEXAS DE LAS SOLICITUDES DE INFRAESTRUCTURAS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasSolicInfraest/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<DocumentacionAnexaSolicInfraestDTO>> listarDocumentacionAnexasSolicInfraestsListaPag(
            @RequestParam(required = false) Long idDocumentacionAnexaSolicInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(documentacionAnexaSolicInfraestService.listarDocumentacionAnexasSolicInfraestPag(pageable, idDocumentacionAnexaSolicInfraest, keyword, idSolicitudInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/documentacionAnexasSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/documentacionAnexasSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearDocumentacionAnexaSolicInfraest(@RequestBody DocumentacionAnexaSolicInfraestDTO documentacionAnexaSolicInfraestDTO){
        System.out.println(documentacionAnexaSolicInfraestDTO);
        return documentacionAnexaSolicInfraestService.crearDocumentacionAnexaSolicInfraest(documentacionAnexaSolicInfraestDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/documentacionAnexasSolicInfraest/{idDocumentacionAnexaSolicInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarDocumentacionAnexaSolicInfraestbyId(@PathVariable Long idDocumentacionAnexaSolicInfraest){
        return documentacionAnexaSolicInfraestService.consultarDocumentacionAnexaSolicInfraestporId(idDocumentacionAnexaSolicInfraest);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/documentacionAnexasSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/documentacionAnexasSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarDocumentacionAnexaSolicInfraest(@RequestBody DocumentacionAnexaSolicInfraestDTO documentacionAnexaSolicInfraestDTO){
        return documentacionAnexaSolicInfraestService.actualizarDocumentacionAnexaSolicInfraest(documentacionAnexaSolicInfraestDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/documentacionAnexasSolicInfraest/{idDocumentacionAnexaSolicInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarDocumentacionAnexaSolicInfraest(@PathVariable Long idDocumentacionAnexaSolicInfraest){
        return documentacionAnexaSolicInfraestService.eliminarDocumentacionAnexaSolicInfraest(idDocumentacionAnexaSolicInfraest);
    }
}
