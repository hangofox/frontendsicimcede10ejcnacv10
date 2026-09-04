//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoReduccionImpuestoTerrenoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoReduccionImpuestoTerrenoService;
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
public class TipoReduccionImpuestoTerrenoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoReduccionImpuestoTerrenoService tipoReduccionImpuestoTerrenoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposReduccionesImpuestosTerrenos/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoReduccionImpuestoTerreno,
            @RequestParam(required = false) String keyword
    ) {
        return new ResponseEntity<>(tipoReduccionImpuestoTerrenoService.contarTotalRegistros(idTipoReduccionImpuestoTerreno, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS TIPOS REDUCCION IMPUESTO TERRENO SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/tiposReduccionesImpuestosTerrenos/lista")
    public ResponseEntity<List<TipoReduccionImpuestoTerrenoDTO>> listarTiposReduccionesImpuestosTerrenoLista(
            @RequestParam(required = false) Long idTipoReduccionImpuestoTerreno,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(tipoReduccionImpuestoTerrenoService.listarTiposReduccionesImpuestosTerrenos(idTipoReduccionImpuestoTerreno, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR/FILTRAR/ORDENAR/PAGINAR TIPOS REDUCCION IMPUESTO TERRENO CON QUERY PARAMS:
    @GetMapping("/tiposReduccionesImpuestosTerrenos/listaPag")
    public ResponseEntity<Slice<TipoReduccionImpuestoTerrenoDTO>> listarTiposReduccionesImpuestosTerrenos(
            @RequestParam(required = false) Long idTipoReduccionImpuestoTerreno,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoReduccionImpuestoTerrenoService.listarTiposReduccionesImpuestosTerrrenosPag(pageable, idTipoReduccionImpuestoTerreno, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposReduccionesImpuestosTerrenos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoReduccionImpuestoTerreno(@RequestBody TipoReduccionImpuestoTerrenoDTO tipoReduccionImpuestoTerrenoDTO){
        System.out.println(tipoReduccionImpuestoTerrenoDTO);
        return tipoReduccionImpuestoTerrenoService.crearTipoReduccionImpuestoTerreno(tipoReduccionImpuestoTerrenoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposReduccionesImpuestosTerrenos/{idTipoReduccionImpuestoTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoReduccionImpuestoTerrenobyId(@PathVariable Long idTipoReduccionImpuestoTerreno){
        return tipoReduccionImpuestoTerrenoService.consultarTipoReduccionImpuestoTerrenoporId(idTipoReduccionImpuestoTerreno);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposReduccionesImpuestosTerrenos/nombre/{nombreTipoReduccionImpuestoTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoReduccionImpuestoTerrenobyNombre(@PathVariable String nombreTipoReduccionImpuestoTerreno){
        return tipoReduccionImpuestoTerrenoService.consultarTipoReduccionImpuestoTerrenoporNombre(nombreTipoReduccionImpuestoTerreno);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposReduccionesImpuestosTerrenos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoReduccionImpuestoTerreno(@RequestBody TipoReduccionImpuestoTerrenoDTO tipoReduccionImpuestoTerrenoDTO){
        return tipoReduccionImpuestoTerrenoService.actualizarTipoReduccionImpuestoTerreno(tipoReduccionImpuestoTerrenoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposReduccionesImpuestosTerrenos/{idTipoReduccionImpuestoTerreno}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoReduccionImpuestoTerreno(@PathVariable Long idTipoReduccionImpuestoTerreno){
        return tipoReduccionImpuestoTerrenoService.eliminarTipoReduccionImpuestoTerreno(idTipoReduccionImpuestoTerreno);
    }
}
