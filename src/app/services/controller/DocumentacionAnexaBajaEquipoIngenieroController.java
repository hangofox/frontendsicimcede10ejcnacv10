//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.DocumentacionAnexaBajaEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.DocumentacionAnexaBajaEquipoIngenieroService;
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
public class DocumentacionAnexaBajaEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private DocumentacionAnexaBajaEquipoIngenieroService documentacionAnexaBajaEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasBajasEquiposIngenieros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idDocumentacionAnexaBajaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero) {
        return new ResponseEntity<>(documentacionAnexaBajaEquipoIngenieroService.contarTotalRegistros(idDocumentacionAnexaBajaEquipoIngeniero, keyword, idEquipoIngeniero), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODA LA DOCUMENTACION ANEXAS DE LAS BAJAS DE LOS EQUIPOS DE INGENIEROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/documentacionAnexasBajasEquiposIngenieros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<DocumentacionAnexaBajaEquipoIngenieroDTO>> listarDocumentacionAnexasBajasEquiposIngenieros(
            @RequestParam(required = false) Long idDocumentacionAnexaBajaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(documentacionAnexaBajaEquipoIngenieroService.listarDocumentacionAnexasBajasEquiposIngenieros(idDocumentacionAnexaBajaEquipoIngeniero, keyword, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR DOCUMENTACION ANEXAS DE LAS BAJAS DE LOS EQUIPOS DE INGENIEROS CON QUERY PARAMS:
    @GetMapping("/documentacionAnexasBajasEquiposIngenieros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<DocumentacionAnexaBajaEquipoIngenieroDTO>> listarDocumentacionAnexasBajasEquiposIngenierosPag(
            @RequestParam(required = false) Long idDocumentacionAnexaBajaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(documentacionAnexaBajaEquipoIngenieroService.listarDocumentacionAnexasBajasEquiposIngenierosPag(pageable, idDocumentacionAnexaBajaEquipoIngeniero, keyword, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/documentacionAnexasBajasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/documentacionAnexasBajasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearDocumentacionAnexaBajaEquipoIngeniero(@RequestBody DocumentacionAnexaBajaEquipoIngenieroDTO documentacionAnexaBajaEquipoIngenieroDTO){
        System.out.println(documentacionAnexaBajaEquipoIngenieroDTO);
        return documentacionAnexaBajaEquipoIngenieroService.crearDocumentacionAnexaBajaEquipoIngeniero(documentacionAnexaBajaEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/documentacionAnexasBajasEquiposIngenieros/{idDocumentacionAnexaBajaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarDocumentacionAnexaBajaEquipoIngenierobyId(@PathVariable Long idDocumentacionAnexaBajaEquipoIngeniero){
        return documentacionAnexaBajaEquipoIngenieroService.consultarDocumentacionAnexaBajaEquipoIngenieroporId(idDocumentacionAnexaBajaEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/documentacionAnexasBajasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/documentacionAnexasBajasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarDocumentacionAnexaBajaEquipoIngeniero(@RequestBody DocumentacionAnexaBajaEquipoIngenieroDTO documentacionAnexaBajaEquipoIngenieroDTO){
        return documentacionAnexaBajaEquipoIngenieroService.actualizarDocumentacionAnexaBajaEquipoIngeniero(documentacionAnexaBajaEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/documentacionAnexasBajasEquiposIngenieros/{idDocumentacionAnexaBajaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarDocumentacionAnexaBajaEquipoIngeniero(@PathVariable Long idDocumentacionAnexaBajaEquipoIngeniero){
        return documentacionAnexaBajaEquipoIngenieroService.eliminarDocumentacionAnexaBajaEquipoIngeniero(idDocumentacionAnexaBajaEquipoIngeniero);
    }
}
