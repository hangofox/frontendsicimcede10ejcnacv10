//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ResponsableDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ResponsableService;
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
* @Since 01/08/2023.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class ResponsableController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ResponsableService responsableService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //1. CONTADORES DE REGISTROS FILTRADOS.
    //CONTAR TOTAL DE REGISTROS (CON FILTROS OPCIONALES POR SIGLA/ESTADO/KEYWORD/ID DE RESPONSABLE):
    @GetMapping("/responsables/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idResponsable,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(responsableService.contarTotalRegistros(idResponsable, siglaoAcronimoUnidadMilitar, estado, keyword), HttpStatus.OK);
    }
    
    //1. LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
    //LISTAR REGISTROS (CON FILTROS OPCIONALES POR SIGLA/ESTADO/KEYWORD/ID DE RESPONSABLE):
    @GetMapping("/responsables/lista")
    public ResponseEntity<List<ResponsableDTO>> listarResponsablesLista(
            @RequestParam(required = false) Long idResponsable,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(responsableService.listarResponsables(idResponsable, siglaoAcronimoUnidadMilitar, estado, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //1. LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
    //LISTAR REGISTROS CON PAGINACIÓN (CON FILTROS OPCIONALES POR SIGLA/ESTADO/KEYWORD/ID DE RESPONSABLE):
    @GetMapping("/responsables/listaPag")
    public ResponseEntity<Slice<ResponsableDTO>> listarResponsablesListaPag(
            @RequestParam(required = false) Long idResponsable,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(responsableService.listarResponsablesPag(pageable, idResponsable, siglaoAcronimoUnidadMilitar, estado, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/responsables")
    public RespuestaDTO crearResponsable(@RequestBody ResponsableDTO responsableDTO){
        System.out.println(responsableDTO);
        return responsableService.crearResponsable(responsableDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/responsables/{idResponsable}")
    public RespuestaDTO consultarResponsablebyId(@PathVariable Long idResponsable){
        return responsableService.consultarResponsableporId(idResponsable);
    }
    
    //LEER CONSULTA DE REGISTRO POR NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN:
    @GetMapping("/responsables/numeroDocumento/{numeroDocumentoIdentificacionResponsable}")
    public RespuestaDTO consultarResponsablebyNumeroDocumentoIdentificacion(@PathVariable String numeroDocumentoIdentificacionResponsable){
        return responsableService.consultarResponsableporNumeroDocumentoIdentificacion(numeroDocumentoIdentificacionResponsable);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/responsables")
    public RespuestaDTO actualizarResponsable(@RequestBody ResponsableDTO responsableDTO){
        return responsableService.actualizarResponsable(responsableDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/responsables/{idResponsable}")
    public RespuestaDTO eliminarResponsable(@PathVariable Long idResponsable){
        return responsableService.eliminarResponsable(idResponsable);
    }
}
