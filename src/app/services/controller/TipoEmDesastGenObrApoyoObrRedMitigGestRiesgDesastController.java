//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService;
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
* @Since 16/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService.contarTotalRegistros(idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS EM DESAST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/lista")
    public ResponseEntity<List<TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO>> listarTiposEmDesastGenObrRedMitigGestRiesgDesastLista(
            @RequestParam(required = false) Long idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService.listarTiposEmDesastGenObrRedMitigGestRiesgDesast(idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS EM DESAST CON QUERY PARAMS:
    @GetMapping("/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/listaPag")
    public ResponseEntity<Slice<TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO>> listarTiposEmDesastGenObrRedMitigGestRiesgDesast(
            @RequestParam(required = false) Long idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService.listarTiposEmDesastGenObrRedMitigGestRiesgDesastPag(pageable, idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast(@RequestBody TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO){
        System.out.println(tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO);
        return tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService.crearTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast(tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/{idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastbyId(@PathVariable Long idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast){
        return tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService.consultarTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastporId(idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/nombre/{nombreTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastbyNombre(@PathVariable String nombreTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast){
        return tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService.consultarTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastporNombre(nombreTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast(@RequestBody TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO){
        return tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService.actualizarTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast(tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/{idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast(@PathVariable Long idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast){
        return tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService.eliminarTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast(idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast);
    }
}
