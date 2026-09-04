//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.DocumentacionAnexaContratInfraestArrendDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.DocumentacionAnexaContratInfraestArrendService;
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
public class DocumentacionAnexaContratInfraestArrendController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private DocumentacionAnexaContratInfraestArrendService documentacionAnexaContratInfraestArrendService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasContratInfraestArrend/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idDocumentacionAnexaContratInfraestArrend,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionPlanAnualArrendamiento) {
        return new ResponseEntity<>(documentacionAnexaContratInfraestArrendService.contarTotalRegistros(idDocumentacionAnexaContratInfraestArrend, keyword, idProyeccionPlanAnualArrendamiento), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODA LA DOCUMENTACION ANEXAS DE LOS CONTRATOS DE INFRAESTRAESTRUCTURAS ARRENDADAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/documentacionAnexasContratInfraestArrend/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<DocumentacionAnexaContratInfraestArrendDTO>> listarDocumentacionAnexasContratInfraestArrendLista(
            @RequestParam(required = false) Long idDocumentacionAnexaContratInfraestArrend,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionPlanAnualArrendamiento,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(documentacionAnexaContratInfraestArrendService.listarDocumentacionAnexasContratInfraestArrend(idDocumentacionAnexaContratInfraestArrend, keyword, idProyeccionPlanAnualArrendamiento, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR DOCUMENTACION ANEXAS DE LOS CONTRATRATOS DE INFRAESTRAESTRUCTURAS ARRENDADAS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasContratInfraestArrend/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<DocumentacionAnexaContratInfraestArrendDTO>> listarDocumentacionAnexasContratInfraestArrendListaPag(
            @RequestParam(required = false) Long idDocumentacionAnexaContratInfraestArrend,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionPlanAnualArrendamiento,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(documentacionAnexaContratInfraestArrendService.listarDocumentacionAnexasContratInfraestArrendPag(pageable, idDocumentacionAnexaContratInfraestArrend, keyword, idProyeccionPlanAnualArrendamiento, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/documentacionAnexasContratInfraestArrend")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearDocumentacionAnexaContratInfraestArrend(@RequestBody DocumentacionAnexaContratInfraestArrendDTO documentacionAnexaContratInfraestArrendDTO){
        System.out.println(documentacionAnexaContratInfraestArrendDTO);
        return documentacionAnexaContratInfraestArrendService.crearDocumentacionAnexaContratInfraestArrend(documentacionAnexaContratInfraestArrendDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/documentacionAnexasContratInfraestArrend/{idDocumentacionAnexaContratInfraestArrend}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarDocumentacionAnexaContratInfraestArrendbyId(@PathVariable Long idDocumentacionAnexaContratInfraestArrend){
        return documentacionAnexaContratInfraestArrendService.consultarDocumentacionAnexaContratInfraestArrendporId(idDocumentacionAnexaContratInfraestArrend);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/documentacionAnexasContratInfraestArrend")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarDocumentacionAnexaContratInfraestArrend(@RequestBody DocumentacionAnexaContratInfraestArrendDTO documentacionAnexaContratInfraestArrendDTO){
        return documentacionAnexaContratInfraestArrendService.actualizarDocumentacionAnexaContratInfraestArrend(documentacionAnexaContratInfraestArrendDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/documentacionAnexasContratInfraestArrend/{idDocumentacionAnexaContratInfraestArrend}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarDocumentacionAnexaContratInfraestArrend(@PathVariable Long idDocumentacionAnexaContratInfraestArrend){
        return documentacionAnexaContratInfraestArrendService.eliminarDocumentacionAnexaContratInfraestArrend(idDocumentacionAnexaContratInfraestArrend);
    }
}
