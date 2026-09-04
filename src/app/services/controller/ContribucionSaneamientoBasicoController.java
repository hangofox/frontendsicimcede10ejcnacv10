//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.ContribucionSaneamientoBasicoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.ContribucionSaneamientoBasicoService;
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
public class ContribucionSaneamientoBasicoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private ContribucionSaneamientoBasicoService contribucionSaneamientoBasicoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/contribucionesSaneamientosBasicos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idContribucionSaneamientoBasico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idInfraestructura) {
        return new ResponseEntity<>(contribucionSaneamientoBasicoService.contarTotalRegistros(idContribucionSaneamientoBasico, keyword, idInfraestructura), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS CONTRIBUCIONES SANEAMIENTOS BASICOS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/contribucionesSaneamientosBasicos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<ContribucionSaneamientoBasicoDTO>> listarContribucionesSaneamientosBasicosLista(
            @RequestParam(required = false) Long idContribucionSaneamientoBasico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(contribucionSaneamientoBasicoService.listarContribucionesSaneamientosBasicos(idContribucionSaneamientoBasico, keyword, idInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR CONTRIBUCIONES SANEAMIENTOS BASICOS CON QUERY PARAMS:
    @GetMapping("/contribucionesSaneamientosBasicos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<ContribucionSaneamientoBasicoDTO>> listarContribucionesSaneamientosBasicosListaPag(
            @RequestParam(required = false) Long idContribucionSaneamientoBasico,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(contribucionSaneamientoBasicoService.listarContribucionesSaneamientosBasicosPag(pageable, idContribucionSaneamientoBasico, keyword, idInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/contribucionesSaneamientosBasicos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/contribucionesSaneamientosBasicos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearContribucionSaneamientoBasico(@RequestBody ContribucionSaneamientoBasicoDTO contribucionSaneamientoBasicoDTO){
        System.out.println(contribucionSaneamientoBasicoDTO);
        return contribucionSaneamientoBasicoService.crearContribucionSaneamientoBasico(contribucionSaneamientoBasicoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/contribucionesSaneamientosBasicos/{idContribucionSaneamientoBasico}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarContribucionSaneamientoBasicobyId(@PathVariable Long idContribucionSaneamientoBasico){
        return contribucionSaneamientoBasicoService.consultarContribucionSaneamientoBasicoporId(idContribucionSaneamientoBasico);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/contribucionesSaneamientosBasicos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/contribucionesSaneamientosBasicos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarContribucionSaneamientoBasico(@RequestBody ContribucionSaneamientoBasicoDTO contribucionSaneamientoBasicoDTO){
        return contribucionSaneamientoBasicoService.actualizarContribucionSaneamientoBasico(contribucionSaneamientoBasicoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/contribucionesSaneamientosBasicos/{idContribucionSaneamientoBasico}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarContribucionSaneamientoBasico(@PathVariable Long idContribucionSaneamientoBasico){
        return contribucionSaneamientoBasicoService.eliminarContribucionSaneamientoBasico(idContribucionSaneamientoBasico);
    }
}
