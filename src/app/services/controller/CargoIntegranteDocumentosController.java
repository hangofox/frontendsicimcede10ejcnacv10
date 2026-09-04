//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.CargoIntegranteDocumentosDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.CargoIntegranteDocumentosService;
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
* @Since 17/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class CargoIntegranteDocumentosController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private CargoIntegranteDocumentosService cargoIntegranteDocumentosService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/cargosIntegrantesDocumentos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idCargoIntegranteDocumentos,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(cargoIntegranteDocumentosService.contarTotalRegistros(idCargoIntegranteDocumentos, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS CARGOS INTEGRANTES DOCUMENTOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/cargosIntegrantesDocumentos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<CargoIntegranteDocumentosDTO>> listarCargosIntegrantesDocumentosLista(
            @RequestParam(required = false) Long idCargoIntegranteDocumentos,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(cargoIntegranteDocumentosService.listarCargosIntegrantesDocumentos(idCargoIntegranteDocumentos, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR CARGOS INTEGRANTES DOCUMENTOS CON QUERY PARAMS:
    @GetMapping("/cargosIntegrantesDocumentos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<CargoIntegranteDocumentosDTO>> listarCargosIntegrantesDocumentos(
            @RequestParam(required = false) Long idCargoIntegranteDocumentos,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(cargoIntegranteDocumentosService.listarCargosIntegrantesDocumentosPag(pageable, idCargoIntegranteDocumentos, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/cargosIntegrantesDocumentos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/cargosIntegrantesDocumentos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearCargoIntegranteDocumentos(@RequestBody CargoIntegranteDocumentosDTO cargoIntegranteDocumentosDTO){
        System.out.println(cargoIntegranteDocumentosDTO);
        return cargoIntegranteDocumentosService.crearCargoIntegranteDocumentos(cargoIntegranteDocumentosDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/cargosIntegrantesDocumentos/{idCargoIntegranteDocumentos}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCargoIntegranteDocumentosbyId(@PathVariable Long idCargoIntegranteDocumentos){
        return cargoIntegranteDocumentosService.consultarCargoIntegranteDocumentosporId(idCargoIntegranteDocumentos);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/cargosIntegrantesDocumentos/nombre/{nombreCargoIntegranteDocumentos}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCargoIntegranteDocumentosbyNombre(@PathVariable String nombreCargoIntegranteDocumentos){
        return cargoIntegranteDocumentosService.consultarCargoIntegranteDocumentosporNombre(nombreCargoIntegranteDocumentos);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/cargosIntegrantesDocumentos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/cargosIntegrantesDocumentos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarCargoIntegranteDocumentos(@RequestBody CargoIntegranteDocumentosDTO cargoIntegranteDocumentosDTO){
        return cargoIntegranteDocumentosService.actualizarCargoIntegranteDocumentos(cargoIntegranteDocumentosDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/cargosIntegrantesDocumentos/{idCargoIntegranteDocumentos}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarCargoIntegranteDocumentos(@PathVariable Long idCargoIntegranteDocumentos){
        return cargoIntegranteDocumentosService.eliminarCargoIntegranteDocumentos(idCargoIntegranteDocumentos);
    }
}
