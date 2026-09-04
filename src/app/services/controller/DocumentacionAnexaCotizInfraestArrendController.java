//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.DocumentacionAnexaCotizInfraestArrendDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.DocumentacionAnexaCotizInfraestArrendService;
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
* @Since 08/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class DocumentacionAnexaCotizInfraestArrendController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private DocumentacionAnexaCotizInfraestArrendService documentacionAnexaCotizInfraestArrendService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasCotizInfraestArrend/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idDocumentacionAnexaCotizInfraestArrend,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionPlanAnualArrendamiento) {
        return new ResponseEntity<>(documentacionAnexaCotizInfraestArrendService.contarTotalRegistros(idDocumentacionAnexaCotizInfraestArrend, keyword, idProyeccionPlanAnualArrendamiento), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODA LA DOCUMENTACION ANEXAS DE LAS COTIZACIONES DE LAS INFRAESTRUCTURAS ARRENDADAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/documentacionAnexasCotizInfraestArrend/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<DocumentacionAnexaCotizInfraestArrendDTO>> listarDocumentacionAnexasCotizInfraestArrendLista(
            @RequestParam(required = false) Long idDocumentacionAnexaCotizInfraestArrend,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionPlanAnualArrendamiento,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(documentacionAnexaCotizInfraestArrendService.listarDocumentacionAnexasCotizInfraestArrend(idDocumentacionAnexaCotizInfraestArrend, keyword, idProyeccionPlanAnualArrendamiento, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR DOCUMENTACION ANEXAS DE LAS COTIZACIONES DE LAS INFRAESTRUCTURAS ARRENDADAS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasCotizInfraestArrend/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<DocumentacionAnexaCotizInfraestArrendDTO>> listarDocumentacionAnexasCotizInfraestArrendListaPag(
            @RequestParam(required = false) Long idDocumentacionAnexaCotizInfraestArrend,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionPlanAnualArrendamiento,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(documentacionAnexaCotizInfraestArrendService.listarDocumentacionAnexasCotizInfraestArrendPag(pageable, idDocumentacionAnexaCotizInfraestArrend, keyword, idProyeccionPlanAnualArrendamiento, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/documentacionAnexasCotizInfraestArrend")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearDocumentacionAnexaCotizInfraestArrend(@RequestBody DocumentacionAnexaCotizInfraestArrendDTO documentacionAnexaCotizInfraestArrendDTO){
        System.out.println(documentacionAnexaCotizInfraestArrendDTO);
        return documentacionAnexaCotizInfraestArrendService.crearDocumentacionAnexaCotizInfraestArrend(documentacionAnexaCotizInfraestArrendDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/documentacionAnexasCotizInfraestArrend/{idDocumentacionAnexaCotizInfraestArrend}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarDocumentacionAnexaCotizInfraestArrendbyId(@PathVariable Long idDocumentacionAnexaCotizInfraestArrend){
        return documentacionAnexaCotizInfraestArrendService.consultarDocumentacionAnexaCotizInfraestArrendporId(idDocumentacionAnexaCotizInfraestArrend);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/documentacionAnexasCotizInfraestArrend")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarDocumentacionAnexaCotizInfraestArrend(@RequestBody DocumentacionAnexaCotizInfraestArrendDTO documentacionAnexaCotizInfraestArrendDTO){
        return documentacionAnexaCotizInfraestArrendService.actualizarDocumentacionAnexaCotizInfraestArrend(documentacionAnexaCotizInfraestArrendDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/documentacionAnexasCotizInfraestArrend/{idDocumentacionAnexaCotizInfraestArrend}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarDocumentacionAnexaCotizInfraestArrend(@PathVariable Long idDocumentacionAnexaCotizInfraestArrend){
        return documentacionAnexaCotizInfraestArrendService.eliminarDocumentacionAnexaCotizInfraestArrend(idDocumentacionAnexaCotizInfraestArrend);
    }
}
