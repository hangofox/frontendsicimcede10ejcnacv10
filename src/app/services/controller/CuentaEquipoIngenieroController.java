//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.CuentaEquipoIngenieroDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.CuentaEquipoIngenieroService;
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
* @Since 22/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class CuentaEquipoIngenieroController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private CuentaEquipoIngenieroService cuentaEquipoIngenieroService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT CONTAR TOTAL DE CUENTAS EQUIPOS INGENIEROS:
    @GetMapping("/cuentasEquiposIngenieros/count")
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idCuentaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCuentaEquipoIngeniero
    ) {
        return new ResponseEntity<>(cuentaEquipoIngenieroService.contarTotalRegistros(idCuentaEquipoIngeniero, keyword, nombreCuentaEquipoIngeniero), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS CUENTAS EQUIPOS INGENIEROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/cuentasEquiposIngenieros/lista")
    public ResponseEntity<List<CuentaEquipoIngenieroDTO>> listarCuentasEquiposIngenierosLista(
            @RequestParam(required = false) Long idCuentaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCuentaEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(cuentaEquipoIngenieroService.listarCuentasEquiposIngenieros(idCuentaEquipoIngeniero, keyword, nombreCuentaEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR CUENTAS EQUIPOS INGENIEROS CON QUERY PARAMS:
    @GetMapping("/cuentasEquiposIngenieros/listaPag")
    public ResponseEntity<Slice<CuentaEquipoIngenieroDTO>> listarCuentasEquiposIngenieros(
            @RequestParam(required = false) Long idCuentaEquipoIngeniero,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCuentaEquipoIngeniero,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(cuentaEquipoIngenieroService.listarCuentasEquiposIngenierosOrdenadosporIdPag(pageable, idCuentaEquipoIngeniero, keyword, nombreCuentaEquipoIngeniero, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/cuentasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/cuentasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTRecurso(@RequestBody CuentaEquipoIngenieroDTO cuentaEquipoIngenieroDTO){
        System.out.println(cuentaEquipoIngenieroDTO);
        return cuentaEquipoIngenieroService.crearCuentaEquipoIngeniero(cuentaEquipoIngenieroDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/cuentasEquiposIngenieros/{idCuentaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTRecursobyId(@PathVariable Long idCuentaEquipoIngeniero){
        return cuentaEquipoIngenieroService.consultarCuentaEquipoIngenieroporId(idCuentaEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/cuentasEquiposIngenieros/nombre/{nombreCuentaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTRecursobyNombreCuentaEquipoIngeniero(@PathVariable String nombreCuentaEquipoIngeniero){
        return cuentaEquipoIngenieroService.consultarCuentaEquipoIngenieroporNombreCuentaEquipoIngeniero(nombreCuentaEquipoIngeniero);
    }
    
    //LEER CONSULTA DE REGISTRO POR NÚMERO:
    @GetMapping("/cuentasEquiposIngenieros/numero/{numeroCuentaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR NÚMERO.
    public RespuestaDTO consultarTRecursobyNumeroCuentaEquipoIngeniero(@PathVariable String numeroCuentaEquipoIngeniero){
        return cuentaEquipoIngenieroService.consultarCuentaEquipoIngenieroporNumeroCuentaEquipoIngeniero(numeroCuentaEquipoIngeniero);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/cuentasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/cuentasEquiposIngenieros")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTRecurso(@RequestBody CuentaEquipoIngenieroDTO cuentaEquipoIngenieroDTO){
        return cuentaEquipoIngenieroService.actualizarCuentaEquipoIngeniero(cuentaEquipoIngenieroDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/cuentasEquiposIngenieros/{idCuentaEquipoIngeniero}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTRecurso(@PathVariable Long idCuentaEquipoIngeniero){
        return cuentaEquipoIngenieroService.eliminarCuentaEquipoIngeniero(idCuentaEquipoIngeniero);
    }
}
