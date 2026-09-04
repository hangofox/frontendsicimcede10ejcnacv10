//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.FuncionalidadDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.FuncionalidadService;
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
public class FuncionalidadController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private FuncionalidadService funcionalidadService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS.
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/funcionalidades/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idFuncionalidad,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(funcionalidadService.contarTotalRegistros(idFuncionalidad, keyword), HttpStatus.OK);
    }
    
    //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
    //ENDPOINT PARA LISTAR TODAS LAS FUNCIONALIDADES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/funcionalidades/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<FuncionalidadDTO>> listarFuncionalidadesLista(
            @RequestParam(required = false) Long idFuncionalidad,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(funcionalidadService.listarFuncionalidades(idFuncionalidad, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR FUNCIONALIDADES CON QUERY PARAMS:
    @GetMapping("/funcionalidades/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<FuncionalidadDTO>> listarFuncionalidadesListaPag(
            @RequestParam(required = false) Long idFuncionalidad,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(funcionalidadService.listarFuncionalidadesPag(pageable, idFuncionalidad, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/funcionalidades")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearFuncionalidad(@RequestBody FuncionalidadDTO funcionalidadDTO){
        System.out.println(funcionalidadDTO);
        return funcionalidadService.crearFuncionalidad(funcionalidadDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/funcionalidades/{idFuncionalidad}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarFuncionalidadbyId(@PathVariable Long idFuncionalidad){
        return funcionalidadService.consultarFuncionalidadporId(idFuncionalidad);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/funcionalidades/nombre/{nombreFuncionalidad}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarFuncionalidadbyNombre(@PathVariable String nombreFuncionalidad){
        return funcionalidadService.consultarFuncionalidadporNombre(nombreFuncionalidad);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/funcionalidades")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarFuncionalidad(@RequestBody FuncionalidadDTO funcionalidadDTO){
        return funcionalidadService.actualizarFuncionalidad(funcionalidadDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/funcionalidades/{idFuncionalidad}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarFuncionalidad(@PathVariable Long idFuncionalidad){
        return funcionalidadService.eliminarFuncionalidad(idFuncionalidad);
    }
}
