//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.AseguradoraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.AseguradoraService;
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
* @Since 24/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class AseguradoraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private AseguradoraService aseguradoraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/aseguradoras/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idAseguradora,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreTipoDocumentoIdentificacion,
            @RequestParam(required = false) String nombreAseguradora
    ) {
        return new ResponseEntity<>(aseguradoraService.contarTotalRegistros(idAseguradora, keyword, nombreTipoDocumentoIdentificacion, nombreAseguradora), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS ASEGURADORAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/aseguradoras/lista")
    public ResponseEntity<List<AseguradoraDTO>> listarAseguradorasLista(
            @RequestParam(required = false) Long idAseguradora,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreTipoDocumentoIdentificacion,
            @RequestParam(required = false) String nombreAseguradora,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(aseguradoraService.listarAseguradoras(idAseguradora, keyword, nombreTipoDocumentoIdentificacion, nombreAseguradora, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR ASEGURADORAS CON QUERY PARAMS:
    @GetMapping("/aseguradoras/listaPag")
    public ResponseEntity<Slice<AseguradoraDTO>> listarAseguradorasListaPag(
            @RequestParam(required = false) Long idAseguradora,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreTipoDocumentoIdentificacion,
            @RequestParam(required = false) String nombreAseguradora,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(aseguradoraService.listarAseguradorasPag(pageable, idAseguradora, keyword, nombreTipoDocumentoIdentificacion, nombreAseguradora, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/aseguradoras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/aseguradoras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearAseguradora(@RequestBody AseguradoraDTO aseguradoraDTO){
        System.out.println(aseguradoraDTO);
        return aseguradoraService.crearAseguradora(aseguradoraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/aseguradoras/{idAseguradora}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarAseguradorabyId(@PathVariable Long idAseguradora){
        return aseguradoraService.consultarAseguradoraporId(idAseguradora);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO DE DOCUMENTO DE IDENTIFICACION:
    @GetMapping("/aseguradoras/numeroDocumentoIdentificacion/{numeroDocumentoIdentificacionAseguradora}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarAseguradorabyNumeroDocumentoIdentificacion(@PathVariable String numeroDocumentoIdentificacionAseguradora){
        return aseguradoraService.consultarAseguradoraporNumeroDocumentoIdentificacion(numeroDocumentoIdentificacionAseguradora);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/aseguradoras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/aseguradoras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarAseguradora(@RequestBody AseguradoraDTO aseguradoraDTO){
        return aseguradoraService.actualizarAseguradora(aseguradoraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/aseguradoras/{idAseguradora}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarAseguradora(@PathVariable Long idAseguradora){
        return aseguradoraService.eliminarAseguradora(idAseguradora);
    }
}
