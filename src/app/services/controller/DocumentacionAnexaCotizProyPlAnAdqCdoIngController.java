//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.DocumentacionAnexaCotizProyPlAnAdqCdoIngDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.DocumentacionAnexaCotizProyPlAnAdqCdoIngService;
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
public class DocumentacionAnexaCotizProyPlAnAdqCdoIngController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private DocumentacionAnexaCotizProyPlAnAdqCdoIngService documentacionAnexaCotizProyPlAnAdqCdoIngService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasCotizProyPlAnAdqCdoIng/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idDocumentacionAnexaCotizProyPlAnAdqCdoIng,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqCdoIng) {
        return new ResponseEntity<>(documentacionAnexaCotizProyPlAnAdqCdoIngService.contarTotalRegistros(idDocumentacionAnexaCotizProyPlAnAdqCdoIng, keyword, idProyeccionPlanAnualAdqCdoIng), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODA LA DOCUMENTACION ANEXAS DE LAS COTIZACIONES DE LAS PROYECCIONES DE LA PLANEACION ANUAL DE ADQUISICION DEL COMANDO DE INGENIEROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/documentacionAnexasCotizProyPlAnAdqCdoIng/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<DocumentacionAnexaCotizProyPlAnAdqCdoIngDTO>> listarDocumentacionAnexasCotizProyPlAnAdqCdoIngLista(
            @RequestParam(required = false) Long idDocumentacionAnexaCotizProyPlAnAdqCdoIng,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(documentacionAnexaCotizProyPlAnAdqCdoIngService.listarDocumentacionAnexasCotizProyPlAnAdqCdoIng(idDocumentacionAnexaCotizProyPlAnAdqCdoIng, keyword, idProyeccionPlanAnualAdqCdoIng, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR DOCUMENTACION ANEXAS DE LAS COTIZACIONES DE LAS PROYECCIONES DE LA PLANEACION ANUAL DE ADQUISICION DEL COMANDO DE INGENIEROS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasCotizProyPlAnAdqCdoIng/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<DocumentacionAnexaCotizProyPlAnAdqCdoIngDTO>> listarDocumentacionAnexasCotizProyPlAnAdqCdoIngListaPag(
            @RequestParam(required = false) Long idDocumentacionAnexaCotizProyPlAnAdqCdoIng,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionPlanAnualAdqCdoIng,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(documentacionAnexaCotizProyPlAnAdqCdoIngService.listarDocumentacionAnexasCotizProyPlAnAdqCdoIngPag(pageable, idDocumentacionAnexaCotizProyPlAnAdqCdoIng, keyword, idProyeccionPlanAnualAdqCdoIng, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/documentacionAnexasCotizProyPlAnAdqCdoIng")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearDocumentacionAnexaCotizProyPlAnAdqCdoIng(@RequestBody DocumentacionAnexaCotizProyPlAnAdqCdoIngDTO documentacionAnexaCotizProyPlAnAdqCdoIngDTO){
        System.out.println(documentacionAnexaCotizProyPlAnAdqCdoIngDTO);
        return documentacionAnexaCotizProyPlAnAdqCdoIngService.crearDocumentacionAnexaCotizProyPlAnAdqCdoIng(documentacionAnexaCotizProyPlAnAdqCdoIngDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/documentacionAnexasCotizProyPlAnAdqCdoIng/{idDocumentacionAnexaCotizProyPlAnAdqCdoIng}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarDocumentacionAnexaCotizProyPlAnAdqCdoIngbyId(@PathVariable Long idDocumentacionAnexaCotizProyPlAnAdqCdoIng){
        return documentacionAnexaCotizProyPlAnAdqCdoIngService.consultarDocumentacionAnexaCotizProyPlAnAdqCdoIngporId(idDocumentacionAnexaCotizProyPlAnAdqCdoIng);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/documentacionAnexasCotizProyPlAnAdqCdoIng")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarDocumentacionAnexaCotizProyPlAnAdqCdoIng(@RequestBody DocumentacionAnexaCotizProyPlAnAdqCdoIngDTO documentacionAnexaCotizProyPlAnAdqCdoIngDTO){
        return documentacionAnexaCotizProyPlAnAdqCdoIngService.actualizarDocumentacionAnexaCotizProyPlAnAdqCdoIng(documentacionAnexaCotizProyPlAnAdqCdoIngDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/documentacionAnexasCotizProyPlAnAdqCdoIng/{idDocumentacionAnexaCotizProyPlAnAdqCdoIng}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarDocumentacionAnexaCotizProyPlAnAdqCdoIng(@PathVariable Long idDocumentacionAnexaCotizProyPlAnAdqCdoIng){
        return documentacionAnexaCotizProyPlAnAdqCdoIngService.eliminarDocumentacionAnexaCotizProyPlAnAdqCdoIng(idDocumentacionAnexaCotizProyPlAnAdqCdoIng);
    }
}
