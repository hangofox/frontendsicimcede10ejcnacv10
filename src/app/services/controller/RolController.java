//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RolDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.RolService;
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
public class RolController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private RolService rolService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/roles/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idRol,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idFuncionalidad) {
        return new ResponseEntity<>(rolService.contarTotalRegistros(idRol, keyword, idFuncionalidad), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODOS LOS ROLES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/roles/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<RolDTO>> listarRolesLista(
            @RequestParam(required = false) Long idRol,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idFuncionalidad,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(rolService.listarRoles(idRol, keyword, idFuncionalidad, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR ROLES CON QUERY PARAMS:
    @GetMapping("/roles/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<RolDTO>> listarRolesListaPag(
            @RequestParam(required = false) Long idRol,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idFuncionalidad,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(rolService.listarRolesPag(pageable, idRol, keyword, idFuncionalidad, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/roles")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/roles")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearRolFuncionalidad(@RequestBody RolDTO rolesDTO){
        System.out.println(rolesDTO);
        return rolService.crearRol(rolesDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/roles/{idRol}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarRolFuncionalidadbyId(@PathVariable Long idRol){
        return rolService.consultarRolporId(idRol);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID DENTRO DE LA FUNCIONALIDAD:
    @GetMapping("/roles/{idRol}/funcionalidad/{idFuncionalidad}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarRolFuncionalidadbyIdeIdFuncionalidad(@PathVariable long idFuncionalidad, @PathVariable long idRol){
        return rolService.consultarRolporIdeIdFuncionalidad(idFuncionalidad, idRol);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE DENTRO DE LA FUNCIONALIDAD:
    @GetMapping("/roles/nombre/{nombreRol}/funcionalidad/{nombreFuncionalidad}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarRolFuncionalidadbyNombreyNombreFuncionalidad(@PathVariable String nombreFuncionalidad, @PathVariable String nombreRol){
        return rolService.consultarRolporNombreyNombreFuncionalidad(nombreFuncionalidad, nombreRol);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/roles")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/roles")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarRolFuncionalidad(@RequestBody RolDTO rolesDTO){
        return rolService.actualizarRol(rolesDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/roles/{idRol}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarRolFuncionalidad(@PathVariable Long idRol){
        return rolService.eliminarRol(idRol);
    }
}
