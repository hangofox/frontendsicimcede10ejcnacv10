//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.FuncionalidadInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.FuncionalidadInfraestructuraService;
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
public class FuncionalidadInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private FuncionalidadInfraestructuraService funcionalidadInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT LISTAR TODAS LAS FUNCIONALIDADES INFRAESTRUCTURA SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/funcionalidadesInfraestructuras/lista")
    public ResponseEntity<List<FuncionalidadInfraestructuraDTO>> listarFuncionalidadesInfraestructuraLista(
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode
    ) {
        return new ResponseEntity<>(funcionalidadInfraestructuraService.listarFuncionalidadesInfraestructuraOrdenadasporId(orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR FUNCIONALIDADES INFRAESTRUCTURA CON QUERY PARAMS:
    @GetMapping("/funcionalidadesInfraestructuras/listaPag")
    public ResponseEntity<Slice<FuncionalidadInfraestructuraDTO>> listarFuncionalidadesInfraestructura(
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(funcionalidadInfraestructuraService.listarFuncionalidadesInfraestructuraOrdenadasporIdPag(pageable, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/funcionalidadesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/funcionalidadesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearFuncionalidadInfraestructura(@RequestBody FuncionalidadInfraestructuraDTO funcionalidadInfraestructuraDTO){
        System.out.println(funcionalidadInfraestructuraDTO);
        return funcionalidadInfraestructuraService.crearFuncionalidadInfraestructura(funcionalidadInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/funcionalidadesInfraestructuras/{idFuncionalidadInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarFuncionalidadInfraestructurabyId(@PathVariable Long idFuncionalidadInfraestructura){
        return funcionalidadInfraestructuraService.consultarFuncionalidadInfraestructuraporId(idFuncionalidadInfraestructura);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/funcionalidadesInfraestructuras/nombre/{nombreFuncionalidadInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarFuncionalidadInfraestructurabyNombre(@PathVariable String nombreFuncionalidadInfraestructura){
        return funcionalidadInfraestructuraService.consultarFuncionalidadInfraestructuraporNombre(nombreFuncionalidadInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/funcionalidadesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/funcionalidadesInfraestructura")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarFuncionalidadInfraestructura(@RequestBody FuncionalidadInfraestructuraDTO funcionalidadInfraestructuraDTO){
        return funcionalidadInfraestructuraService.actualizarFuncionalidadInfraestructura(funcionalidadInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/funcionalidadesInfraestructuras/{idFuncionalidadInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarFuncionalidadInfraestructura(@PathVariable Long idFuncionalidadInfraestructura){
        return funcionalidadInfraestructuraService.eliminarFuncionalidadInfraestructura(idFuncionalidadInfraestructura);
    }
}
