//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.DocumentacionAnexaCotizProySoatLinBlancDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.DocumentacionAnexaCotizProySoatLinBlancService;
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
* @Since 09/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class DocumentacionAnexaCotizProySoatLinBlancController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private DocumentacionAnexaCotizProySoatLinBlancService documentacionAnexaCotizProySoatLinBlancService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasCotizProySoatLinBlanc/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idDocumentacionAnexaCotizProySoatLinBlanc,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionSoatLineaBlanca) {
        return new ResponseEntity<>(documentacionAnexaCotizProySoatLinBlancService.contarTotalRegistros(idDocumentacionAnexaCotizProySoatLinBlanc, keyword, idProyeccionSoatLineaBlanca), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODA LA DOCUMENTACION ANEXAS DE LAS COTIZACIONES DE LAS PROYECCIONES DEL SOAT DE LAS LINEAS BLANCAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/documentacionAnexasCotizProySoatLinBlanc/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<DocumentacionAnexaCotizProySoatLinBlancDTO>> listarDocumentacionAnexasCotizProySoatLinBlancLista(
            @RequestParam(required = false) Long idDocumentacionAnexaCotizProySoatLinBlanc,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionSoatLineaBlanca,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(documentacionAnexaCotizProySoatLinBlancService.listarDocumentacionAnexasCotizProySoatLinBlanc(idDocumentacionAnexaCotizProySoatLinBlanc, keyword, idProyeccionSoatLineaBlanca, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR DOCUMENTACION ANEXAS DE LAS COTIZACIONES DE LAS PROYECCIONES DEL SOAT DE LAS LINEAS BLANCAS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasCotizProySoatLinBlanc/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<DocumentacionAnexaCotizProySoatLinBlancDTO>> listarDocumentacionAnexasCotizProySoatLinBlancListaPag(
            @RequestParam(required = false) Long idDocumentacionAnexaCotizProySoatLinBlanc,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idProyeccionSoatLineaBlanca,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(documentacionAnexaCotizProySoatLinBlancService.listarDocumentacionAnexasCotizProySoatLinBlancPag(pageable, idDocumentacionAnexaCotizProySoatLinBlanc, keyword, idProyeccionSoatLineaBlanca, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/documentacionAnexasCotizProySoatLinBlanc")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearDocumentacionAnexaCotizProySoatLinBlanc(@RequestBody DocumentacionAnexaCotizProySoatLinBlancDTO documentacionAnexaCotizProySoatLinBlancDTO){
        System.out.println(documentacionAnexaCotizProySoatLinBlancDTO);
        return documentacionAnexaCotizProySoatLinBlancService.crearDocumentacionAnexaCotizProySoatLinBlanc(documentacionAnexaCotizProySoatLinBlancDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/documentacionAnexasCotizProySoatLinBlanc/{idDocumentacionAnexaCotizProySoatLinBlanc}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarDocumentacionAnexaCotizProySoatLinBlancbyId(@PathVariable Long idDocumentacionAnexaCotizProySoatLinBlanc){
        return documentacionAnexaCotizProySoatLinBlancService.consultarDocumentacionAnexaCotizProySoatLinBlancporId(idDocumentacionAnexaCotizProySoatLinBlanc);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/documentacionAnexasCotizProySoatLinBlanc")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarDocumentacionAnexaCotizProySoatLinBlanc(@RequestBody DocumentacionAnexaCotizProySoatLinBlancDTO documentacionAnexaCotizProySoatLinBlancDTO){
        return documentacionAnexaCotizProySoatLinBlancService.actualizarDocumentacionAnexaCotizProySoatLinBlanc(documentacionAnexaCotizProySoatLinBlancDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/documentacionAnexasCotizProySoatLinBlanc/{idDocumentacionAnexaCotizProySoatLinBlanc}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarDocumentacionAnexaCotizProySoatLinBlanc(@PathVariable Long idDocumentacionAnexaCotizProySoatLinBlanc){
        return documentacionAnexaCotizProySoatLinBlancService.eliminarDocumentacionAnexaCotizProySoatLinBlanc(idDocumentacionAnexaCotizProySoatLinBlanc);
    }
}
