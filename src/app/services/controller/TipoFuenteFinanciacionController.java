//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoFuenteFinanciacionDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoFuenteFinanciacionService;
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
public class TipoFuenteFinanciacionController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoFuenteFinanciacionService tipoFuenteFinanciacionService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposFuentesFinanciaciones/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoFuenteFinanciacion,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(tipoFuenteFinanciacionService.contarTotalRegistros(idTipoFuenteFinanciacion, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS FUENTE FINANCIACION SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/tiposFuentesFinanciaciones/lista")
    public ResponseEntity<List<TipoFuenteFinanciacionDTO>> listarTiposFuentesFinanciacionesLista(
            @RequestParam(required = false) Long idTipoFuenteFinanciacion,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(tipoFuenteFinanciacionService.listarTiposFuentesFinanciaciones(idTipoFuenteFinanciacion, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS FUENTE FINANCIACION CON QUERY PARAMS:
    @GetMapping("/tiposFuentesFinanciaciones/listaPag")
    public ResponseEntity<Slice<TipoFuenteFinanciacionDTO>> listarTiposFuentesFinanciaciones(
            @RequestParam(required = false) Long idTipoFuenteFinanciacion,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoFuenteFinanciacionService.listarTiposFuentesFinanciacionesPag(pageable, idTipoFuenteFinanciacion, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposFuentesFinanciaciones")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoFuenteFinanciacion(@RequestBody TipoFuenteFinanciacionDTO tipoFuenteFinanciacionDTO){
        System.out.println(tipoFuenteFinanciacionDTO);
        return tipoFuenteFinanciacionService.crearTipoFuenteFinanciacion(tipoFuenteFinanciacionDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposFuentesFinanciaciones/{idTipoFuenteFinanciacion}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoFuenteFinanciacionbyId(@PathVariable Long idTipoFuenteFinanciacion){
        return tipoFuenteFinanciacionService.consultarTipoFuenteFinanciacionporId(idTipoFuenteFinanciacion);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposFuentesFinanciaciones/nombre/{nombreTipoFuenteFinanciacion}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoFuenteFinanciacionbyNombre(@PathVariable String nombreTipoFuenteFinanciacion){
        return tipoFuenteFinanciacionService.consultarTipoFuenteFinanciacionporNombre(nombreTipoFuenteFinanciacion);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposFuentesFinanciaciones")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoFuenteFinanciacion(@RequestBody TipoFuenteFinanciacionDTO tipoFuenteFinanciacionDTO){
        return tipoFuenteFinanciacionService.actualizarTipoFuenteFinanciacion(tipoFuenteFinanciacionDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposFuentesFinanciaciones/{idTipoFuenteFinanciacion}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoFuenteFinanciacion(@PathVariable Long idTipoFuenteFinanciacion){
        return tipoFuenteFinanciacionService.eliminarTipoFuenteFinanciacion(idTipoFuenteFinanciacion);
    }
}
