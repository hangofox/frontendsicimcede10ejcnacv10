//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoEstructuraInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoEstructuraInfraestructuraService;
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
* @Since 01/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class TipoEstructuraInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoEstructuraInfraestructuraService tipoEstructuraInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposEstructurasInfraestructuras/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoEstructuraInfraestructura,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(tipoEstructuraInfraestructuraService.contarTotalRegistros(idTipoEstructuraInfraestructura, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS ESTRUCTURA INFRAESTRUCTURA SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/tiposEstructurasInfraestructuras/lista")
    public ResponseEntity<List<TipoEstructuraInfraestructuraDTO>> listarTiposEstructurasInfraestructurasLista(
            @RequestParam(required = false) Long idTipoEstructuraInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(tipoEstructuraInfraestructuraService.listarTiposEstructurasInfraestructuras(idTipoEstructuraInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS ESTRUCTURA INFRAESTRUCTURA CON QUERY PARAMS:
    @GetMapping("/tiposEstructurasInfraestructuras/listaPag")
    public ResponseEntity<Slice<TipoEstructuraInfraestructuraDTO>> listarTiposEstructurasInfraestructuras(
            @RequestParam(required = false) Long idTipoEstructuraInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoEstructuraInfraestructuraService.listarTiposEstructurasInfraestructurasPag(pageable, idTipoEstructuraInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposEstructurasInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoEstructuraInfraestructura(@RequestBody TipoEstructuraInfraestructuraDTO tipoEstructuraInfraestructuraDTO){
        System.out.println(tipoEstructuraInfraestructuraDTO);
        return tipoEstructuraInfraestructuraService.crearTipoEstructuraInfraestructura(tipoEstructuraInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposEstructurasInfraestructuras/{idTipoEstructuraInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoEstructuraInfraestructurabyId(@PathVariable Long idTipoEstructuraInfraestructura){
        return tipoEstructuraInfraestructuraService.consultarTipoEstructuraInfraestructuraporId(idTipoEstructuraInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposEstructurasInfraestructuras/nombre/{nombreTipoEstructuraInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoEstructuraInfraestructurabyNombre(@PathVariable String nombreTipoEstructuraInfraestructura){
        return tipoEstructuraInfraestructuraService.consultarTipoEstructuraInfraestructuraporNombre(nombreTipoEstructuraInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposEstructurasInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoEstructuraInfraestructura(@RequestBody TipoEstructuraInfraestructuraDTO tipoEstructuraInfraestructuraDTO){
        return tipoEstructuraInfraestructuraService.actualizarTipoEstructuraInfraestructura(tipoEstructuraInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposEstructurasInfraestructuras/{idTipoEstructuraInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoEstructuraInfraestructura(@PathVariable Long idTipoEstructuraInfraestructura){
        return tipoEstructuraInfraestructuraService.eliminarTipoEstructuraInfraestructura(idTipoEstructuraInfraestructura);
    }
}
