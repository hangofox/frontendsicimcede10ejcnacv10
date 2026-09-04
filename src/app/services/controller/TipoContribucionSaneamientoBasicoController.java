//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoContribucionSaneamientoBasicoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoContribucionSaneamientoBasicoService;
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
public class TipoContribucionSaneamientoBasicoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoContribucionSaneamientoBasicoService tipoContribucionSaneamientoBasicoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposContribucionesSaneamientosBasicos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTiposContribucionesSaneamientosBasicos(
            @RequestParam(required = false) Long idTipoContribucionSaneamientoBasico,
            @RequestParam(required = false) String keyword){
        return new ResponseEntity<>(tipoContribucionSaneamientoBasicoService.contarTotalRegistros(idTipoContribucionSaneamientoBasico, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposContribucionesSaneamientosBasicos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoContribucionSaneamientoBasicoDTO>> listarTiposContribucionesSaneamientosBasicos(
            @RequestParam(required = false) Long idTipoContribucionSaneamientoBasico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode){
        return new ResponseEntity<>(tipoContribucionSaneamientoBasicoService.listarTiposContribucionesSaneamientosBasicos(idTipoContribucionSaneamientoBasico, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS PAGINADOS:
    @GetMapping("/tiposContribucionesSaneamientosBasicos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoContribucionSaneamientoBasicoDTO>> listarTiposContribucionesSaneamientosBasicosPag(
            @RequestParam(required = false) Long idTipoContribucionSaneamientoBasico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoContribucionSaneamientoBasicoService.listarTiposContribucionesSaneamientosBasicosPag(pageable, idTipoContribucionSaneamientoBasico, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposContribucionesSaneamientosBasicos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoContribucionSaneamientoBasico(@RequestBody TipoContribucionSaneamientoBasicoDTO tipoContribucionSaneamientoBasicoDTO){
        System.out.println(tipoContribucionSaneamientoBasicoDTO);
        return tipoContribucionSaneamientoBasicoService.crearTipoContribucionSaneamientoBasico(tipoContribucionSaneamientoBasicoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposContribucionesSaneamientosBasicos/{idTipoContribucionSaneamientoBasico}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoContribucionSaneamientoBasicoporId(@PathVariable Long idTipoContribucionSaneamientoBasico){
        return tipoContribucionSaneamientoBasicoService.consultarTipoContribucionSaneamientoBasicoporId(idTipoContribucionSaneamientoBasico);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposContribucionesSaneamientosBasicos/nombre/{nombreTipoContribucionSaneamientoBasico}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoContribucionSaneamientoBasicoporNombre(@PathVariable String nombreTipoContribucionSaneamientoBasico){
        return tipoContribucionSaneamientoBasicoService.consultarTipoContribucionSaneamientoBasicoporNombre(nombreTipoContribucionSaneamientoBasico);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposContribucionesSaneamientosBasicos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoContribucionSaneamientoBasico(@RequestBody TipoContribucionSaneamientoBasicoDTO tipoContribucionSaneamientoBasicoDTO){
        return tipoContribucionSaneamientoBasicoService.actualizarTipoContribucionSaneamientoBasico(tipoContribucionSaneamientoBasicoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposContribucionesSaneamientosBasicos/{idTipoContribucionSaneamientoBasico}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoContribucionSaneamientoBasico(@PathVariable Long idTipoContribucionSaneamientoBasico){
        return tipoContribucionSaneamientoBasicoService.eliminarTipoContribucionSaneamientoBasico(idTipoContribucionSaneamientoBasico);
    }
}
