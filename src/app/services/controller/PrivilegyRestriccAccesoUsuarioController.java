//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.PrivilegyRestriccAccesoUsuarioDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.PrivilegyRestriccAccesoUsuarioService;
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
public class PrivilegyRestriccAccesoUsuarioController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private PrivilegyRestriccAccesoUsuarioService privilegyRestriccAccesoUsuarioService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/privilegyRestriccAccesosUsuarios/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idPrivilegioyRestriccionAccesoUsuario,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idFuncionalidad,
            @RequestParam(required = false) String nombreFuncionalidad,
            @RequestParam(required = false) Long idRol,
            @RequestParam(required = false) String nombreRol,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) Long idUsuario) {
        return new ResponseEntity<>(privilegyRestriccAccesoUsuarioService.contarTotalRegistros(idPrivilegioyRestriccionAccesoUsuario, keyword, idFuncionalidad, nombreFuncionalidad, idRol, nombreRol, siglaoAcronimoUnidadMilitar, idUsuario), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/privilegyRestriccAccesosUsuarios/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<PrivilegyRestriccAccesoUsuarioDTO>> listarPrivilegyRestriccAccesosUsuariosLista(
            @RequestParam(required = false) Long idPrivilegioyRestriccionAccesoUsuario,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idFuncionalidad,
            @RequestParam(required = false) String nombreFuncionalidad,
            @RequestParam(required = false) Long idRol,
            @RequestParam(required = false) String nombreRol,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) Long idUsuario,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(privilegyRestriccAccesoUsuarioService.listarPrivilegyRestriccAccesosUsuarios(idPrivilegioyRestriccionAccesoUsuario, keyword, idFuncionalidad, nombreFuncionalidad, idRol, nombreRol, siglaoAcronimoUnidadMilitar, idUsuario, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/privilegyRestriccAccesosUsuarios/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<PrivilegyRestriccAccesoUsuarioDTO>> listarPrivilegyRestriccAccesosUsuarios(
            @RequestParam(required = false) Long idPrivilegioyRestriccionAccesoUsuario,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idFuncionalidad,
            @RequestParam(required = false) String nombreFuncionalidad,
            @RequestParam(required = false) Long idRol,
            @RequestParam(required = false) String nombreRol,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) Long idUsuario,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(privilegyRestriccAccesoUsuarioService.listarPrivilegyRestriccAccesosUsuariosPag(pageable, idPrivilegioyRestriccionAccesoUsuario, keyword, idFuncionalidad, nombreFuncionalidad, idRol, nombreRol, siglaoAcronimoUnidadMilitar, idUsuario, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/privilegyRestriccAccesosUsuarios")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearPRAccesoUsuarioFuncionalidad(@RequestBody PrivilegyRestriccAccesoUsuarioDTO privilegyRestriccAccesoUsuarioDTO){
        System.out.println(privilegyRestriccAccesoUsuarioDTO);
        return privilegyRestriccAccesoUsuarioService.crearPrivilegyRestriccAccesoUsuario(privilegyRestriccAccesoUsuarioDTO);
    }
    
    //CREAR REGISTROS:
    @PostMapping("/privilegyRestriccAccesosUsuarios/lote")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTROS.
    public ResponseEntity<RespuestaDTO> crearPrivilegyRestriccAccesoUsuario(@RequestBody List<PrivilegyRestriccAccesoUsuarioDTO> privilegyRestriccAccesoUsuarioDTOS) {
        try {
            RespuestaDTO respuestaDTO = privilegyRestriccAccesoUsuarioService.crearPrivilegyRestriccAccesosUsuarios(privilegyRestriccAccesoUsuarioDTOS);
            return new ResponseEntity<>(respuestaDTO, HttpStatus.OK);
        } catch (Exception e) {
            //MANEJO DE EXCEPCIONES.
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/privilegyRestriccAccesosUsuarios/{idPrivilegioyRestriccionAccesoUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultaPRAccesoUsuarioFuncionalidadbyId(@PathVariable Long idPrivilegioyRestriccionAccesoUsuario){
        return privilegyRestriccAccesoUsuarioService.consultarPrivilegyRestriccAccesoUsuarioporId(idPrivilegioyRestriccionAccesoUsuario);
    }
    
    //LEER CONSULTA DE REGISTRO POR LA SIGLA O ACRÓNIMO DE UNIDAD MILITAR, ID DE USUARIO, ID DE FUNCIONALIDAD E ID DE ROL:
    @GetMapping("/privilegyRestriccAccesosUsuarios/siglaoAcronimo/{siglaoAcronimoUnidadMilitar}/usuario/{idUsuario}/funcionalidad/{idFuncionalidad}/rol/{idRol}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultaPRAccesoUsuariobySAUnidadMilitareIdUsuarioeIdFuncionalidadeIdRol(@PathVariable String siglaoAcronimoUnidadMilitar, @PathVariable Long idUsuario, @PathVariable Long idFuncionalidad, @PathVariable Long idRol){
        return privilegyRestriccAccesoUsuarioService.consultarPrivilegyRestriccAccesoUsuarioporSAUnidadMilitareIdUsuarioeIdFuncionalidadeIdRol(siglaoAcronimoUnidadMilitar, idUsuario, idFuncionalidad, idRol);
    }
    
    //LEER CONSULTA DE REGISTRO POR LA SIGLA O ACRÓNIMO DE UNIDAD MILITAR, ID DE USUARIO, NOMBRE DE FUNCIONALIDAD Y NOMBRE DE ROL:
    @GetMapping("/privilegyRestriccAccesosUsuarios/siglaoAcronimo/{siglaoAcronimoUnidadMilitar}/usuario/{idUsuario}/funcionalidad/nombre/{nombreFuncionalidad}/rol/nombre/{nombreRol}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultaPRAccesoUsuariobySAUnidadMilitareIdUsuarioyNombreFuncionalidadyNombreRol(@PathVariable String siglaoAcronimoUnidadMilitar, @PathVariable Long idUsuario, @PathVariable String nombreFuncionalidad, @PathVariable String nombreRol){
        return privilegyRestriccAccesoUsuarioService.consultarPrivilegyRestriccAccesoUsuarioporSAUnidadMilitareIdUsuarioyNombreFuncionalidadyNombreRol(siglaoAcronimoUnidadMilitar, idUsuario, nombreFuncionalidad, nombreRol);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/privilegyRestriccAccesosUsuarios")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarPRAccesoUsuarioFuncionalidad(@RequestBody PrivilegyRestriccAccesoUsuarioDTO privilegyRestriccAccesoUsuarioDTO){
        return privilegyRestriccAccesoUsuarioService.actualizarPrivilegyRestriccAccesoUsuario(privilegyRestriccAccesoUsuarioDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/privilegyRestriccAccesosUsuarios/{idPrivilegioyRestriccionAccesoUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarPRAccesoUsuarioFuncionalidad(@PathVariable Long idPrivilegioyRestriccionAccesoUsuario){
        return privilegyRestriccAccesoUsuarioService.eliminarPrivilegyRestriccAccesoUsuario(idPrivilegioyRestriccionAccesoUsuario);
    }
    
    //VACIAR REGISTROS A NIVEL GENERAL POR ID DE USUARIO:
    @DeleteMapping("/privilegyRestriccAccesosUsuarios/vaciar/general/{idUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD VACIAR REGISTROS.
    public RespuestaDTO vaciarPRAccesosUsuariosNivelGeneralporIdUsuario(@PathVariable Long idUsuario){
        return privilegyRestriccAccesoUsuarioService.vaciarPrivilegyRestriccAccesosUsuariosNivelGeneralporIdUsuario(idUsuario);
    }
    
    //VACIAR REGISTROS EN UNIDAD MILITAR POR ID DE USUARIO Y SIGLA O ACRÓNIMO DE UNIDAD MILITAR:
    @DeleteMapping("/privilegyRestriccAccesosUsuarios/vaciar/unidadMilitar/{idUsuario}/{siglaoAcronimoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD VACIAR REGISTROS.
    public RespuestaDTO vaciarPRAccesosUsuariosUnidadMilitarporIdUsuarioySAUnidadMilitar(@PathVariable Long idUsuario, @PathVariable String siglaoAcronimoUnidadMilitar){
        return privilegyRestriccAccesoUsuarioService.vaciarPrivilegyRestriccAccesosUsuariosUnidadMilitarporIdUsuarioySAUnidadMilitar(idUsuario, siglaoAcronimoUnidadMilitar);
    }
}
