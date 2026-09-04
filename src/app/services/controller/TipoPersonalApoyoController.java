//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoPersonalApoyoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoPersonalApoyoService;
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
public class TipoPersonalApoyoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoPersonalApoyoService tipoPersonalApoyoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposPersonalApoyos/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoPersonalApoyo,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(tipoPersonalApoyoService.contarTotalRegistros(idTipoPersonalApoyo, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS PERSONAL APOYO SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/tiposPersonalApoyos/lista")
    public ResponseEntity<List<TipoPersonalApoyoDTO>> listarTiposPersonalApoyosLista(
            @RequestParam(required = false) Long idTipoPersonalApoyo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(tipoPersonalApoyoService.listarTiposPersonalApoyos(idTipoPersonalApoyo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS PERSONAL APOYO CON QUERY PARAMS:
    @GetMapping("/tiposPersonalApoyos/listaPag")
    public ResponseEntity<Slice<TipoPersonalApoyoDTO>> listarTiposPersonalApoyos(
            @RequestParam(required = false) Long idTipoPersonalApoyo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoPersonalApoyoService.listarTiposPersonalApoyosPag(pageable, idTipoPersonalApoyo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposPersonalApoyos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoPersonalApoyo(@RequestBody TipoPersonalApoyoDTO tipoPersonalApoyoDTO){
        System.out.println(tipoPersonalApoyoDTO);
        return tipoPersonalApoyoService.crearTipoPersonalApoyo(tipoPersonalApoyoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposPersonalApoyos/{idTipoPersonalApoyo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoPersonalApoyobyId(@PathVariable Long idTipoPersonalApoyo){
        return tipoPersonalApoyoService.consultarTipoPersonalApoyoporId(idTipoPersonalApoyo);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposPersonalApoyos/nombre/{nombreTipoPersonalApoyo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoPersonalApoyobyNombre(@PathVariable String nombreTipoPersonalApoyo){
        return tipoPersonalApoyoService.consultarTipoPersonalApoyoporNombre(nombreTipoPersonalApoyo);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposPersonalApoyos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoPersonalApoyo(@RequestBody TipoPersonalApoyoDTO tipoPersonalApoyoDTO){
        return tipoPersonalApoyoService.actualizarTipoPersonalApoyo(tipoPersonalApoyoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposPersonalApoyos/{idTipoPersonalApoyo}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoPersonalApoyo(@PathVariable Long idTipoPersonalApoyo){
        return tipoPersonalApoyoService.eliminarTipoPersonalApoyo(idTipoPersonalApoyo);
    }
}
