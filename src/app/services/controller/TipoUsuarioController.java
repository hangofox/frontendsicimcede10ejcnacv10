//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoUsuarioDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoUsuarioService;
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
public class TipoUsuarioController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoUsuarioService tipoUsuarioService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposUsuarios/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoUsuario,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(tipoUsuarioService.contarTotalRegistros(idTipoUsuario, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/tiposUsuarios/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoUsuarioDTO>> listarTiposUsuariosLista(
            @RequestParam(required = false) Long idTipoUsuario,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(tipoUsuarioService.listarTiposUsuarios(idTipoUsuario, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS PAGINADOS:
    @GetMapping("/tiposUsuarios/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoUsuarioDTO>> listarTiposUsuariosPag(
            @RequestParam(required = false) Long idTipoUsuario,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoUsuarioService.listarTiposUsuariosPag(pageable, idTipoUsuario, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposUsuarios")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoUsuario(@RequestBody TipoUsuarioDTO tipoUsuarioDTO){
        System.out.println(tipoUsuarioDTO);
        return tipoUsuarioService.crearTipoUsuario(tipoUsuarioDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposUsuarios/{idTipoUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoUsuarioporId(@PathVariable Long idTipoUsuario){
        return tipoUsuarioService.consultarTipoUsuarioporId(idTipoUsuario);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposUsuarios/nombre/{nombreTipoUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoUsuarioporNombre(@PathVariable String nombreTipoUsuario){
        return tipoUsuarioService.consultarTipoUsuarioporNombre(nombreTipoUsuario);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposUsuarios")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoUsuario(@RequestBody TipoUsuarioDTO tipoUsuarioDTO){
        return tipoUsuarioService.actualizarTipoUsuario(tipoUsuarioDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposUsuarios/{idTipoUsuario}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoUsuario(@PathVariable Long idTipoUsuario){
        return tipoUsuarioService.eliminarTipoUsuario(idTipoUsuario);
    }
}
