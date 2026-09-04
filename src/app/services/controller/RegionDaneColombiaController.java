//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RegionDaneColombiaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.RegionDaneColombiaService;
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
* @Since 01/08/2023.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class RegionDaneColombiaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private RegionDaneColombiaService regionDaneColombiaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/regionesDaneColombia/count/total")
    public ResponseEntity<Long> contarTotalRDaneColombia() {
        return new ResponseEntity<>(regionDaneColombiaService.contarTotalRegistros(), HttpStatus.OK);
    }
    
    //CONTAR TOTAL DE REGISTROS POR PALABRA CLAVE:
    @GetMapping("/regionesDaneColombia/count/keyword/{keyword}")
    public ResponseEntity<Long> contarTotalRDaneColombiabyKeyword(@PathVariable String keyword) {
        return new ResponseEntity<>(regionDaneColombiaService.contarTotalRegistrosporPalabraClave(keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS REGIONES SIN PAGINACIÓN (CON FILTRO OPCIONAL POR PALABRA CLAVE):
    @GetMapping("/regionesDaneColombia/lista")
    public ResponseEntity<List<RegionDaneColombiaDTO>> listarRDaneColombiaLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(regionDaneColombiaService.listarRegionesDaneColombia(keyword, orderBy, orderMode), HttpStatus.OK);
    }

    //ENDPOINT ÚNICO PARA LISTAR/ORDENAR/PAGINAR REGIONES CON QUERY PARAMS (CON FILTRO OPCIONAL POR PALABRA CLAVE):
    @GetMapping("/regionesDaneColombia/listaPag")
    public ResponseEntity<Slice<RegionDaneColombiaDTO>> listarRDaneColombiaListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(regionDaneColombiaService.listarRegionesDaneColombiaPag(pageable, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/regionesDaneColombia")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/regionesDaneColombia")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearRDaneColombia(@RequestBody RegionDaneColombiaDTO regionDaneColombiaDTO){
        System.out.println(regionDaneColombiaDTO);
        return regionDaneColombiaService.crearRegionDaneColombia(regionDaneColombiaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/regionesDaneColombia/{idRegionDaneColombia}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarRDaneColombiabyId(@PathVariable Long idRegionDaneColombia){
        return regionDaneColombiaService.consultarRegionDaneColombiaporId(idRegionDaneColombia);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/regionesDaneColombia/nombre/{nombreCiudadMunicipioDaneColombia}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarRDaneColombiabyNombreCiudadMunicipioDaneColombia(@PathVariable String nombreCiudadMunicipioDaneColombia){
        return regionDaneColombiaService.consultarRegionDaneColombiaporNombreCiudadMunicipioDane(nombreCiudadMunicipioDaneColombia);
    }
    
    //LEER CONSULTA DE REGISTRO POR CÓDIGO:
    @GetMapping("/regionesDaneColombia/codigo/{codigoDaneColombia}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarRDaneColombiabyCodigoDaneColombia(@PathVariable String codigoDaneColombia){
        return regionDaneColombiaService.consultarRegionDaneColombiaporCodigoDane(codigoDaneColombia);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/regionesDaneColombia")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/regionesDaneColombia")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarRDaneColombia(@RequestBody RegionDaneColombiaDTO regionDaneColombiaDTO){
        return regionDaneColombiaService.actualizarRegionDaneColombia(regionDaneColombiaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/regionesDaneColombia/{idRegionDaneColombia}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarRDaneColombia(@PathVariable Long idRegionDaneColombia){
        return regionDaneColombiaService.eliminarRegionDaneColombia(idRegionDaneColombia);
    }
}
