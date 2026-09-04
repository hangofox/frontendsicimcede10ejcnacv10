//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RecuperacionContrasenaAccesoUsuarioDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.RecuperacionContrasenaAccesoUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 01/08/2023.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class RecuperacionContrasenaAccesoUsuarioController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private RecuperacionContrasenaAccesoUsuarioService recuperacionContrasenaAccesoUsuarioService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT LISTAR TODAS LAS RECUPERACIONES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/recuperacionesContrasenasAccesosUsuarios/lista")
    public ResponseEntity<List<RecuperacionContrasenaAccesoUsuarioDTO>> listarRContrasenasAccesosUsuariosLista(
            @RequestParam(required = false, defaultValue = "idRecuperacionContrasenaAccesoUsuario") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(recuperacionContrasenaAccesoUsuarioService.listarRecuperacionesContrasenasAccesosUsuariosOrdenadasporId(orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/ORDENAR/PAGINAR RECUPERACIONES CON QUERY PARAMS:
    @GetMapping("/recuperacionesContrasenasAccesosUsuarios/listaPag")
    public ResponseEntity<Slice<RecuperacionContrasenaAccesoUsuarioDTO>> listarRContrasenasAccesosUsuariosListaPag(
            @RequestParam(required = false, defaultValue = "idRecuperacionContrasenaAccesoUsuario") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(recuperacionContrasenaAccesoUsuarioService.listarRecuperacionesContrasenasAccesosUsuariosOrdenadasporIdPag(pageable, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR RECUPERACIONES FILTRADAS POR ID DE USUARIO SIN PAGINACIÓN:
    @GetMapping("/recuperacionesContrasenasAccesosUsuarios/lista/idUsuario/{idUsuario}")
    public ResponseEntity<List<RecuperacionContrasenaAccesoUsuarioDTO>> listarRContrasenasAccesosUsuariosporIdUsuarioLista(
            @PathVariable Long idUsuario,
            @RequestParam(required = false, defaultValue = "idRecuperacionContrasenaAccesoUsuario") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(recuperacionContrasenaAccesoUsuarioService.listarRecuperacionesContrasenasAccesosUsuariosporIdUsuarioyOrdenadasporId(idUsuario, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR RECUPERACIONES FILTRADAS POR ID DE USUARIO CON PAGINACIÓN:
    @GetMapping("/recuperacionesContrasenasAccesosUsuarios/listaPag/idUsuario/{idUsuario}")
    public ResponseEntity<Slice<RecuperacionContrasenaAccesoUsuarioDTO>> listarRContrasenasAccesosUsuariosporIdUsuarioListaPag(
            @PathVariable Long idUsuario,
            @RequestParam(required = false, defaultValue = "idRecuperacionContrasenaAccesoUsuario") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(recuperacionContrasenaAccesoUsuarioService.listarRecuperacionesContrasenasAccesosUsuariosporIdUsuarioyOrdenadasporIdPag(pageable, idUsuario, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/recuperacionesContrasenasAccesosUsuarios")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/recuperacionesContrasenasAccesosUsuarios")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearRContrasenaAccesoUsuario(@RequestBody RecuperacionContrasenaAccesoUsuarioDTO recuperacionContrasenaAccesoUsuarioDTO){
        System.out.println(recuperacionContrasenaAccesoUsuarioDTO);
        return recuperacionContrasenaAccesoUsuarioService.crearRecuperacionContrasenaAccesoUsuario(recuperacionContrasenaAccesoUsuarioDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/recuperacionesContrasenasAccesosUsuarios/{idRecuperacionContrasenaAccesoUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarRContrasenaAccesoUsuariobyId(@PathVariable Long idRecuperacionContrasenaAccesoUsuario){
        return recuperacionContrasenaAccesoUsuarioService.consultarRecuperacionContrasenaAccesoUsuarioporId(idRecuperacionContrasenaAccesoUsuario);
    }
    
    //LEER CONSULTA DE REGISTRO POR CÓDIGO DE ACTIVACIÓN:
    @GetMapping("/recuperacionesContrasenasAccesosUsuarios/codigoActivacion/{codigoActivacionContrasenaAccesoUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarRContrasenaAccesoUsuariobyCodigoActivacion(@PathVariable String codigoActivacionContrasenaAccesoUsuario){
        return recuperacionContrasenaAccesoUsuarioService.consultarRecuperacionContrasenaAccesoUsuarioporCodigoActivacion(codigoActivacionContrasenaAccesoUsuario);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/recuperacionesContrasenasAccesosUsuarios")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/recuperacionesContrasenasAccesosUsuarios")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarRContrasenaAccesoUsuario(@RequestBody RecuperacionContrasenaAccesoUsuarioDTO recuperacionContrasenaAccesoUsuarioDTO){
        return recuperacionContrasenaAccesoUsuarioService.actualizarRecuperacionContrasenaAccesoUsuario(recuperacionContrasenaAccesoUsuarioDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/recuperacionesContrasenasAccesosUsuarios/{idRecuperacionContrasenaAccesoUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarRContrasenaAccesoUsuario(@PathVariable Long idRecuperacionContrasenaAccesoUsuario){
        return recuperacionContrasenaAccesoUsuarioService.eliminarRecuperacionContrasenaAccesoUsuario(idRecuperacionContrasenaAccesoUsuario);
    }
    
    //ACTUALIZAR ESTADOS DE USOS DE CÓDIGOS DE ACTIVACIONES DE CONTRASEÑAS DE ACCESOS DE USUARIOS:
    //@PostMapping("/recuperacionesContrasenasAccesosUsuarios/estadosUsos/{fechaHMSExpCodActivContrasenaAccesoUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD ACTUALIZAR ESTADOS DE USOS DE CÓDIGOS DE ACTIVACIONES.
    @PutMapping("/recuperacionesContrasenasAccesosUsuarios/estadosUsos/{fechaHMSExpCodActivContrasenaAccesoUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD ACTUALIZAR ESTADOS DE USOS DE CÓDIGOS DE ACTIVACIONES.
    public RespuestaDTO actualizarEstadosUsosCodigosActivacionesContrasenasAccesosUsuarios(@PathVariable("fechaHMSExpCodActivContrasenaAccesoUsuario") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date fechaHMSExpCodActivContrasenaAccesoUsuario){
        return recuperacionContrasenaAccesoUsuarioService.actualizarEstadosUsosCodigosActivacionesContrasenasAccesosUsuarios(fechaHMSExpCodActivContrasenaAccesoUsuario);
    }
    
    //VACIAR REGISTROS POR ID DE USUARIO:
    @DeleteMapping("/recuperacionesContrasenasAccesosUsuarios/vaciar/{idUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD VACIAR REGISTROS.
    public RespuestaDTO vaciarRContrasenaAccesoUsuarioporIdUsuario(@PathVariable Long idUsuario){
        return recuperacionContrasenaAccesoUsuarioService.vaciarRecuperacionesContrasenasAccesosUsuariosporIdUsuario(idUsuario);
    }
}
