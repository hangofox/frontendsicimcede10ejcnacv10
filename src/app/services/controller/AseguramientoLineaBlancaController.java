//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.AseguramientoLineaBlancaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.AseguramientoLineaBlancaService;
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
* @Since 15/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class AseguramientoLineaBlancaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private AseguramientoLineaBlancaService aseguramientoLineaBlancaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/aseguramientosLineasBlancas/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idAseguramientoLineaBlanca,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero) {
        return new ResponseEntity<>(aseguramientoLineaBlancaService.contarTotalRegistros(idAseguramientoLineaBlanca, keyword, idEquipoIngeniero), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS ASEGURAMIENTOS LINEAS BLANCAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/aseguramientosLineasBlancas/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<AseguramientoLineaBlancaDTO>> listarAseguramientosLineasBlancasLista(
            @RequestParam(required = false) Long idAseguramientoLineaBlanca,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(aseguramientoLineaBlancaService.listarAseguramientosLineasBlancas(idAseguramientoLineaBlanca, keyword, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR ASEGURAMIENTOS LINEAS BLANCAS CON QUERY PARAMS:
    @GetMapping("/aseguramientosLineasBlancas/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<AseguramientoLineaBlancaDTO>> listarAseguramientosLineasBlancasListaPag(
            @RequestParam(required = false) Long idAseguramientoLineaBlanca,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(aseguramientoLineaBlancaService.listarAseguramientosLineasBlancasPag(pageable, idAseguramientoLineaBlanca, keyword, idEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/aseguramientosLineasBlancas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/aseguramientosLineasBlancas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearAseguramientoLineaBlanca(@RequestBody AseguramientoLineaBlancaDTO aseguramientoLineaBlancaDTO){
        System.out.println(aseguramientoLineaBlancaDTO);
        return aseguramientoLineaBlancaService.crearAseguramientoLineaBlanca(aseguramientoLineaBlancaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/aseguramientosLineasBlancas/{idAseguramientoLineaBlanca}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarAseguramientoLineaBlancabyId(@PathVariable Long idAseguramientoLineaBlanca){
        return aseguramientoLineaBlancaService.consultarAseguramientoLineaBlancaporId(idAseguramientoLineaBlanca);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/aseguramientosLineasBlancas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/aseguramientosLineasBlancas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarAseguramientoLineaBlanca(@RequestBody AseguramientoLineaBlancaDTO aseguramientoLineaBlancaDTO){
        return aseguramientoLineaBlancaService.actualizarAseguramientoLineaBlanca(aseguramientoLineaBlancaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/aseguramientosLineasBlancas/{idAseguramientoLineaBlanca}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarAseguramientoLineaBlanca(@PathVariable Long idAseguramientoLineaBlanca){
        return aseguramientoLineaBlancaService.eliminarAseguramientoLineaBlanca(idAseguramientoLineaBlanca);
    }
}
