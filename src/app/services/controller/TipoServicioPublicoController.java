//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoServicioPublicoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoServicioPublicoService;
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
public class TipoServicioPublicoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoServicioPublicoService tipoServicioPublicoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposServiciosPublicos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoServicioPublico,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(tipoServicioPublicoService.contarTotalRegistros(idTipoServicioPublico, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/tiposServiciosPublicos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoServicioPublicoDTO>> listarTiposServiciosPublicosLista(
            @RequestParam(required = false) Long idTipoServicioPublico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(tipoServicioPublicoService.listarTiposServiciosPublicos(idTipoServicioPublico, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/tiposServiciosPublicos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoServicioPublicoDTO>> listarTiposServiciosPublicos(
            @RequestParam(required = false) Long idTipoServicioPublico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoServicioPublicoService.listarTiposServiciosPublicosPag(pageable, idTipoServicioPublico, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposServiciosPublicos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoServicioPublico(@RequestBody TipoServicioPublicoDTO tipoServicioPublicoDTO){
        System.out.println(tipoServicioPublicoDTO);
        return tipoServicioPublicoService.crearTipoServicioPublico(tipoServicioPublicoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposServiciosPublicos/{idTipoServicioPublico}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoServicioPublicoporId(@PathVariable Long idTipoServicioPublico){
        return tipoServicioPublicoService.consultarTipoServicioPublicoporId(idTipoServicioPublico);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposServiciosPublicos/nombre/{nombreTipoServicioPublico}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoServicioPublicoporNombre(@PathVariable String nombreTipoServicioPublico){
        return tipoServicioPublicoService.consultarTipoServicioPublicoporNombre(nombreTipoServicioPublico);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposServiciosPublicos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoServicioPublico(@RequestBody TipoServicioPublicoDTO tipoServicioPublicoDTO){
        return tipoServicioPublicoService.actualizarTipoServicioPublico(tipoServicioPublicoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposServiciosPublicos/{idTipoServicioPublico}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoServicioPublico(@PathVariable Long idTipoServicioPublico){
        return tipoServicioPublicoService.eliminarTipoServicioPublico(idTipoServicioPublico);
    }
}
