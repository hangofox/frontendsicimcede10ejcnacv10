//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoMantenimientoInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoMantenimientoInfraestructuraService;
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
public class TipoMantenimientoInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoMantenimientoInfraestructuraService tipoMantenimientoInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposMantenimientosInfraestructuras/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoMantenimientoInfraestructura,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(tipoMantenimientoInfraestructuraService.contarTotalRegistros(idTipoMantenimientoInfraestructura, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS MANTENIMIENTO INFRAESTRUCTURA SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/tiposMantenimientosInfraestructuras/lista")
    public ResponseEntity<List<TipoMantenimientoInfraestructuraDTO>> listarTiposMantenimientosInfraestructurasLista(
            @RequestParam(required = false) Long idTipoMantenimientoInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(tipoMantenimientoInfraestructuraService.listarTiposMantenimientosInfraestructuras(idTipoMantenimientoInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS MANTENIMIENTO INFRAESTRUCTURA CON QUERY PARAMS:
    @GetMapping("/tiposMantenimientosInfraestructuras/listaPag")
    public ResponseEntity<Slice<TipoMantenimientoInfraestructuraDTO>> listarTiposMantenimientosInfraestructuras(
            @RequestParam(required = false) Long idTipoMantenimientoInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoMantenimientoInfraestructuraService.listarTiposMantenimientosInfraestructurasPag(pageable, idTipoMantenimientoInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposMantenimientosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoMantenimientoInfraestructura(@RequestBody TipoMantenimientoInfraestructuraDTO tipoMantenimientoInfraestructuraDTO){
        System.out.println(tipoMantenimientoInfraestructuraDTO);
        return tipoMantenimientoInfraestructuraService.crearTipoMantenimientoInfraestructura(tipoMantenimientoInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposMantenimientosInfraestructuras/{idTipoMantenimientoInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoMantenimientoInfraestructurabyId(@PathVariable Long idTipoMantenimientoInfraestructura){
        return tipoMantenimientoInfraestructuraService.consultarTipoMantenimientoInfraestructuraporId(idTipoMantenimientoInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposMantenimientosInfraestructuras/nombre/{nombreTipoMantenimientoInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoMantenimientoInfraestructurabyNombre(@PathVariable String nombreTipoMantenimientoInfraestructura){
        return tipoMantenimientoInfraestructuraService.consultarTipoMantenimientoInfraestructuraporNombre(nombreTipoMantenimientoInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposMantenimientosInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoMantenimientoInfraestructura(@RequestBody TipoMantenimientoInfraestructuraDTO tipoMantenimientoInfraestructuraDTO){
        return tipoMantenimientoInfraestructuraService.actualizarTipoMantenimientoInfraestructura(tipoMantenimientoInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposMantenimientosInfraestructuras/{idTipoMantenimientoInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoMantenimientoInfraestructura(@PathVariable Long idTipoMantenimientoInfraestructura){
        return tipoMantenimientoInfraestructuraService.eliminarTipoMantenimientoInfraestructura(idTipoMantenimientoInfraestructura);
    }
}
