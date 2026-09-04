//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoEventoApoyoRealizadoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoEventoApoyoRealizadoService;
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
public class TipoEventoApoyoRealizadoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoEventoApoyoRealizadoService tipoEventoApoyoRealizadoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposEventosApoyosRealizados/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoEventoApoyoRealizado,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(tipoEventoApoyoRealizadoService.contarTotalRegistros(idTipoEventoApoyoRealizado, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS EVENTO APOYO REALIZADO SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/tiposEventosApoyosRealizados/lista")
    public ResponseEntity<List<TipoEventoApoyoRealizadoDTO>> listarTiposEventosApoyosRealizadosLista(
            @RequestParam(required = false) Long idTipoEventoApoyoRealizado,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(tipoEventoApoyoRealizadoService.listarTiposEventosApoyosRealizados(idTipoEventoApoyoRealizado, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS EVENTO APOYO REALIZADO CON QUERY PARAMS:
    @GetMapping("/tiposEventosApoyosRealizados/listaPag")
    public ResponseEntity<Slice<TipoEventoApoyoRealizadoDTO>> listarTiposEventosApoyosRealizados(
            @RequestParam(required = false) Long idTipoEventoApoyoRealizado,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoEventoApoyoRealizadoService.listarTiposEventosApoyosRealizadosPag(pageable, idTipoEventoApoyoRealizado, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposEventosApoyosRealizados")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoEventoApoyoRealizado(@RequestBody TipoEventoApoyoRealizadoDTO tipoEventoApoyoRealizadoDTO){
        System.out.println(tipoEventoApoyoRealizadoDTO);
        return tipoEventoApoyoRealizadoService.crearTipoEventoApoyoRealizado(tipoEventoApoyoRealizadoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposEventosApoyosRealizados/{idTipoEventoApoyoRealizado}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoEventoApoyoRealizadobyId(@PathVariable Long idTipoEventoApoyoRealizado){
        return tipoEventoApoyoRealizadoService.consultarTipoEventoApoyoRealizadoporId(idTipoEventoApoyoRealizado);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposEventosApoyosRealizados/nombre/{nombreTipoEventoApoyoRealizado}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoEventoApoyoRealizadobyNombre(@PathVariable String nombreTipoEventoApoyoRealizado){
        return tipoEventoApoyoRealizadoService.consultarTipoEventoApoyoRealizadoporNombre(nombreTipoEventoApoyoRealizado);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposEventosApoyosRealizados")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoEventoApoyoRealizado(@RequestBody TipoEventoApoyoRealizadoDTO tipoEventoApoyoRealizadoDTO){
        return tipoEventoApoyoRealizadoService.actualizarTipoEventoApoyoRealizado(tipoEventoApoyoRealizadoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposEventosApoyosRealizados/{idTipoEventoApoyoRealizado}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoEventoApoyoRealizado(@PathVariable Long idTipoEventoApoyoRealizado){
        return tipoEventoApoyoRealizadoService.eliminarTipoEventoApoyoRealizado(idTipoEventoApoyoRealizado);
    }
}
