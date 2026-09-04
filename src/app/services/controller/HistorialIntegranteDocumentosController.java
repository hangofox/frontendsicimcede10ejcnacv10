//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.HistorialIntegranteDocumentosDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.HistorialIntegranteDocumentosService;
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
public class HistorialIntegranteDocumentosController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private HistorialIntegranteDocumentosService historialIntegranteDocumentosService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/historialesIntegrantesDocumentos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idHistorialIntegranteDocumentos,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(historialIntegranteDocumentosService.contarTotalRegistros(idHistorialIntegranteDocumentos, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS HISTORIALES INTEGRANTES DOCUMENTOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/historialesIntegrantesDocumentos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<HistorialIntegranteDocumentosDTO>> listarHistorialesIntegrantesDocumentosLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialIntegranteDocumentos,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(historialIntegranteDocumentosService.listarHistorialesIntegrantesDocumentos(idHistorialIntegranteDocumentos, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR HISTORIALES INTEGRANTES DOCUMENTOS CON QUERY PARAMS:
    @GetMapping("/historialesIntegrantesDocumentos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<HistorialIntegranteDocumentosDTO>> listarHistorialesIntegrantesDocumentosListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idHistorialIntegranteDocumentos,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(historialIntegranteDocumentosService.listarHistorialesIntegrantesDocumentosPag(pageable, idHistorialIntegranteDocumentos, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/historialesIntegrantesDocumentos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/historialesIntegrantesDocumentos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearHistorialIntegranteDocumentos(@RequestBody HistorialIntegranteDocumentosDTO historialIntegranteDocumentosDTO){
        System.out.println(historialIntegranteDocumentosDTO);
        return historialIntegranteDocumentosService.crearHistorialIntegranteDocumentos(historialIntegranteDocumentosDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/historialesIntegrantesDocumentos/{idHistorialIntegranteDocumentos}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarHistorialIntegranteDocumentosbyId(@PathVariable Long idHistorialIntegranteDocumentos){
        return historialIntegranteDocumentosService.consultarHistorialIntegranteDocumentosporId(idHistorialIntegranteDocumentos);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE REGISTRO:
    @GetMapping("/historialesIntegrantesDocumentos/numeroRegistro/{numRegHistorialIntegranteDocumentos}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NUMERO DE REGISTRO.
    public RespuestaDTO consultarHistorialIntegranteDocumentosbyNumReg(@PathVariable String numRegHistorialIntegranteDocumentos){
        return historialIntegranteDocumentosService.consultarHistorialIntegranteDocumentosporNumReg(numRegHistorialIntegranteDocumentos);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/historialesIntegrantesDocumentos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/historialesIntegrantesDocumentos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarHistorialIntegranteDocumentos(@RequestBody HistorialIntegranteDocumentosDTO historialIntegranteDocumentosDTO){
        return historialIntegranteDocumentosService.actualizarHistorialIntegranteDocumentos(historialIntegranteDocumentosDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/historialesIntegrantesDocumentos/{idHistorialIntegranteDocumentos}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarHistorialIntegranteDocumentos(@PathVariable Long idHistorialIntegranteDocumentos){
        return historialIntegranteDocumentosService.eliminarHistorialIntegranteDocumentos(idHistorialIntegranteDocumentos);
    }
}
