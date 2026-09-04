//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoSolicitudInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoSolicitudInfraestructuraService;
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
public class TipoSolicitudInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoSolicitudInfraestructuraService tipoSolicitudInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposSolicitudesInfraestructuras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoSolicitudInfraestructura,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(tipoSolicitudInfraestructuraService.contarTotalRegistros(idTipoSolicitudInfraestructura, keyword), HttpStatus.OK);
    }

    //LISTAR REGISTROS:
    @GetMapping("/tiposSolicitudesInfraestructuras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoSolicitudInfraestructuraDTO>> listarTiposSolicitudesInfraestructurasLista(
            @RequestParam(required = false) Long idTipoSolicitudInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(tipoSolicitudInfraestructuraService.listarTiposSolicitudesInfraestructuras(idTipoSolicitudInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }

    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/tiposSolicitudesInfraestructuras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoSolicitudInfraestructuraDTO>> listarTiposSolicitudesInfraestructuras(
            @RequestParam(required = false) Long idTipoSolicitudInfraestructura,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoSolicitudInfraestructuraService.listarTiposSolicitudesInfraestructurasPag(pageable, idTipoSolicitudInfraestructura, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposSolicitudesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoSolicitudInfraestructura(@RequestBody TipoSolicitudInfraestructuraDTO tipoSolicitudInfraestructuraDTO){
        System.out.println(tipoSolicitudInfraestructuraDTO);
        return tipoSolicitudInfraestructuraService.crearTipoSolicitudInfraestructura(tipoSolicitudInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposSolicitudesInfraestructuras/{idTipoSolicitudInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoSolicitudInfraestructuraporId(@PathVariable Long idTipoSolicitudInfraestructura){
        return tipoSolicitudInfraestructuraService.consultarTipoSolicitudInfraestructuraporId(idTipoSolicitudInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposSolicitudesInfraestructuras/nombre/{nombreTipoSolicitudInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoSolicitudInfraestructuraporNombre(@PathVariable String nombreTipoSolicitudInfraestructura){
        return tipoSolicitudInfraestructuraService.consultarTipoSolicitudInfraestructuraporNombre(nombreTipoSolicitudInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposSolicitudesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoSolicitudInfraestructura(@RequestBody TipoSolicitudInfraestructuraDTO tipoSolicitudInfraestructuraDTO){
        return tipoSolicitudInfraestructuraService.actualizarTipoSolicitudInfraestructura(tipoSolicitudInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposSolicitudesInfraestructuras/{idTipoSolicitudInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoSolicitudInfraestructura(@PathVariable Long idTipoSolicitudInfraestructura){
        return tipoSolicitudInfraestructuraService.eliminarTipoSolicitudInfraestructura(idTipoSolicitudInfraestructura);
    }
}
