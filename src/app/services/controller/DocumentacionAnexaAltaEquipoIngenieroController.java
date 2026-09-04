//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.DocumentacionAnexaAltaEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.DocumentacionAnexaAltaEquipoIngenieroService;
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
public class DocumentacionAnexaAltaEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private DocumentacionAnexaAltaEquipoIngenieroService documentacionAnexaAltaEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasAltasEquiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idDocumentacionAnexaAltaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero) {
        return new ResponseEntity<>(documentacionAnexaAltaEquipoIngenieroService.contarTotalRegistros(idDocumentacionAnexaAltaEquipoIngeniero, keyword, idEquipoIngeniero), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODA LA DOCUMENTACION ANEXAS DE LAS ALTAS DE LOS EQUIPOS DE INGENIEROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/documentacionAnexasAltasEquiposIngenieros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<DocumentacionAnexaAltaEquipoIngenieroDTO>> listarDocumentacionAnexasAltasEquiposIngenieros(
            @RequestParam(required = false) Long idDocumentacionAnexaAltaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(documentacionAnexaAltaEquipoIngenieroService.listarDocumentacionAnexasAltasEquiposIngenieros(idDocumentacionAnexaAltaEquipoIngeniero, keyword, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR DOCUMENTACION ANEXAS DE LAS ALTAS DE LOS EQUIPOS DE INGENIEROS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasAltasEquiposIngenieros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<DocumentacionAnexaAltaEquipoIngenieroDTO>> listarDocumentacionAnexasAltasEquiposIngenierosPag(
            @RequestParam(required = false) Long idDocumentacionAnexaAltaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(documentacionAnexaAltaEquipoIngenieroService.listarDocumentacionAnexasAltasEquiposIngenierosPag(pageable, idDocumentacionAnexaAltaEquipoIngeniero, keyword, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/documentacionAnexasAltasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/documentacionAnexasAltasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearDocumentacionAnexaAltaEquipoIngeniero(@RequestBody DocumentacionAnexaAltaEquipoIngenieroDTO documentacionAnexaAltaEquipoIngenieroDTO){
        System.out.println(documentacionAnexaAltaEquipoIngenieroDTO);
        return documentacionAnexaAltaEquipoIngenieroService.crearDocumentacionAnexaAltaEquipoIngeniero(documentacionAnexaAltaEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/documentacionAnexasAltasEquiposIngenieros/{idDocumentacionAnexaAltaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarDocumentacionAnexaAltaEquipoIngenierobyId(@PathVariable Long idDocumentacionAnexaAltaEquipoIngeniero){
        return documentacionAnexaAltaEquipoIngenieroService.consultarDocumentacionAnexaAltaEquipoIngenieroporId(idDocumentacionAnexaAltaEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/documentacionAnexasAltasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/documentacionAnexasAltasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarDocumentacionAnexaAltaEquipoIngeniero(@RequestBody DocumentacionAnexaAltaEquipoIngenieroDTO documentacionAnexaAltaEquipoIngenieroDTO){
        return documentacionAnexaAltaEquipoIngenieroService.actualizarDocumentacionAnexaAltaEquipoIngeniero(documentacionAnexaAltaEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/documentacionAnexasAltasEquiposIngenieros/{idDocumentacionAnexaAltaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarDocumentacionAnexaAltaEquipoIngeniero(@PathVariable Long idDocumentacionAnexaAltaEquipoIngeniero){
        return documentacionAnexaAltaEquipoIngenieroService.eliminarDocumentacionAnexaAltaEquipoIngeniero(idDocumentacionAnexaAltaEquipoIngeniero);
    }
}
