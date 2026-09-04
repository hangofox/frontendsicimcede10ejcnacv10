//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoEstructuraInfraestructuraArrendadaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoEstructuraInfraestructuraArrendadaService;
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
public class TipoEstructuraInfraestructuraArrendadaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoEstructuraInfraestructuraArrendadaService tipoEstructuraInfraestructuraArrendadaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposEstructurasInfraestructurasArrendadas/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoEstructuraInfraestructuraArrendada,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(tipoEstructuraInfraestructuraArrendadaService.contarTotalRegistros(idTipoEstructuraInfraestructuraArrendada, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS ESTRUCTURA INFRAESTRUCTURA ARRENDADA SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/tiposEstructurasInfraestructurasArrendadas/lista")
    public ResponseEntity<List<TipoEstructuraInfraestructuraArrendadaDTO>> listarTiposEstructurasInfraestructurasArrendadasLista(
            @RequestParam(required = false) Long idTipoEstructuraInfraestructuraArrendada,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(tipoEstructuraInfraestructuraArrendadaService.listarTiposEstructurasInfraestructurasArrendadas(idTipoEstructuraInfraestructuraArrendada, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS ESTRUCTURA INFRAESTRUCTURA ARRENDADA CON QUERY PARAMS:
    @GetMapping("/tiposEstructurasInfraestructurasArrendadas/listaPag")
    public ResponseEntity<Slice<TipoEstructuraInfraestructuraArrendadaDTO>> listarTiposEstructurasInfraestructurasArrendadas(
            @RequestParam(required = false) Long idTipoEstructuraInfraestructuraArrendada,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoEstructuraInfraestructuraArrendadaService.listarTiposEstructurasInfraestructurasArrendadasPag(pageable, idTipoEstructuraInfraestructuraArrendada, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposEstructurasInfraestructurasArrendadas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoEstructuraInfraestructuraArrendada(@RequestBody TipoEstructuraInfraestructuraArrendadaDTO tipoEstructuraInfraestructuraArrendadaDTO){
        System.out.println(tipoEstructuraInfraestructuraArrendadaDTO);
        return tipoEstructuraInfraestructuraArrendadaService.crearTipoEstructuraInfraestructuraArrendada(tipoEstructuraInfraestructuraArrendadaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposEstructurasInfraestructurasArrendadas/{idTipoEstructuraInfraestructuraArrendada}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoEstructuraInfraestructuraArrendadabyId(@PathVariable Long idTipoEstructuraInfraestructuraArrendada){
        return tipoEstructuraInfraestructuraArrendadaService.consultarTipoEstructuraInfraestructuraArrendadaporId(idTipoEstructuraInfraestructuraArrendada);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposEstructurasInfraestructurasArrendadas/nombre/{nombreTipoEstructuraInfraestructuraArrendada}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoEstructuraInfraestructuraArrendadabyNombre(@PathVariable String nombreTipoEstructuraInfraestructuraArrendada){
        return tipoEstructuraInfraestructuraArrendadaService.consultarTipoEstructuraInfraestructuraArrendadaporNombre(nombreTipoEstructuraInfraestructuraArrendada);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposEstructurasInfraestructurasArrendadas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoEstructuraInfraestructuraArrendada(@RequestBody TipoEstructuraInfraestructuraArrendadaDTO tipoEstructuraInfraestructuraArrendadaDTO){
        return tipoEstructuraInfraestructuraArrendadaService.actualizarTipoEstructuraInfraestructuraArrendada(tipoEstructuraInfraestructuraArrendadaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposEstructurasInfraestructurasArrendadas/{idTipoEstructuraInfraestructuraArrendada}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoEstructuraInfraestructuraArrendada(@PathVariable Long idTipoEstructuraInfraestructuraArrendada){
        return tipoEstructuraInfraestructuraArrendadaService.eliminarTipoEstructuraInfraestructuraArrendada(idTipoEstructuraInfraestructuraArrendada);
    }
}
