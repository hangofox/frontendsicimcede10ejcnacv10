//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoSeguroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoSeguroService;
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
public class TipoSeguroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoSeguroService tipoSeguroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposSeguros/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoSeguro,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(tipoSeguroService.contarTotalRegistros(idTipoSeguro, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/tiposSeguros/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoSeguroDTO>> listarTiposSegurosLista(
            @RequestParam(required = false) Long idTipoSeguro,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(tipoSeguroService.listarTiposSeguros(idTipoSeguro, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/tiposSeguros/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoSeguroDTO>> listarTiposSeguros(
            @RequestParam(required = false) Long idTipoSeguro,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoSeguroService.listarTiposSegurosPag(pageable, idTipoSeguro, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposSeguros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoSeguro(@RequestBody TipoSeguroDTO tipoSeguroDTO){
        System.out.println(tipoSeguroDTO);
        return tipoSeguroService.crearTipoSeguro(tipoSeguroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposSeguros/{idTipoSeguro}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoSeguroporId(@PathVariable Long idTipoSeguro){
        return tipoSeguroService.consultarTipoSeguroporId(idTipoSeguro);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposSeguros/nombre/{nombreTipoSeguro}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoSeguroporNombre(@PathVariable String nombreTipoSeguro){
        return tipoSeguroService.consultarTipoSeguroporNombre(nombreTipoSeguro);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposSeguros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoSeguro(@RequestBody TipoSeguroDTO tipoSeguroDTO){
        return tipoSeguroService.actualizarTipoSeguro(tipoSeguroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposSeguros/{idTipoSeguro}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoSeguro(@PathVariable Long idTipoSeguro){
        return tipoSeguroService.eliminarTipoSeguro(idTipoSeguro);
    }
}
