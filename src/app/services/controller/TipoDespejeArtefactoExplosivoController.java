//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoDespejeArtefactoExplosivoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoDespejeArtefactoExplosivoService;
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
public class TipoDespejeArtefactoExplosivoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoDespejeArtefactoExplosivoService tipoDespejeArtefactoExplosivoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDespejesArtefactosExplosivos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTiposDespejesArtefactosExplosivos(
            @RequestParam(required = false) Long idTipoDespejeArtefactoExplosivo,
            @RequestParam(required = false) String keyword){
        return new ResponseEntity<>(tipoDespejeArtefactoExplosivoService.contarTotalRegistros(idTipoDespejeArtefactoExplosivo, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDespejesArtefactosExplosivos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoDespejeArtefactoExplosivoDTO>> listarTiposDespejesArtefactosExplosivos(
            @RequestParam(required = false) Long idTipoDespejeArtefactoExplosivo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode){
        return new ResponseEntity<>(tipoDespejeArtefactoExplosivoService.listarTiposDespejesArtefactosExplosivos(idTipoDespejeArtefactoExplosivo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS PAGINADOS:
    @GetMapping("/tiposDespejesArtefactosExplosivos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoDespejeArtefactoExplosivoDTO>> listarTiposDespejesArtefactosExplosivosPag(
            @RequestParam(required = false) Long idTipoDespejeArtefactoExplosivo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoDespejeArtefactoExplosivoService.listarTiposDespejesArtefactosExplosivosPag(pageable, idTipoDespejeArtefactoExplosivo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposDespejesArtefactosExplosivos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoDespejeArtefactoExplosivo(@RequestBody TipoDespejeArtefactoExplosivoDTO tipoDespejeArtefactoExplosivoDTO){
        System.out.println(tipoDespejeArtefactoExplosivoDTO);
        return tipoDespejeArtefactoExplosivoService.crearTipoDespejeArtefactoExplosivo(tipoDespejeArtefactoExplosivoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposDespejesArtefactosExplosivos/{idTipoDespejeArtefactoExplosivo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDespejeArtefactoExplosivoporId(@PathVariable Long idTipoDespejeArtefactoExplosivo){
        return tipoDespejeArtefactoExplosivoService.consultarTipoDespejeArtefactoExplosivoporId(idTipoDespejeArtefactoExplosivo);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposDespejesArtefactosExplosivos/nombre/{nombreTipoDespejeArtefactoExplosivo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDespejeArtefactoExplosivoporNombre(@PathVariable String nombreTipoDespejeArtefactoExplosivo){
        return tipoDespejeArtefactoExplosivoService.consultarTipoDespejeArtefactoExplosivoporNombre(nombreTipoDespejeArtefactoExplosivo);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposDespejesArtefactosExplosivos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoDespejeArtefactoExplosivo(@RequestBody TipoDespejeArtefactoExplosivoDTO tipoDespejeArtefactoExplosivoDTO){
        return tipoDespejeArtefactoExplosivoService.actualizarTipoDespejeArtefactoExplosivo(tipoDespejeArtefactoExplosivoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposDespejesArtefactosExplosivos/{idTipoDespejeArtefactoExplosivo}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoDespejeArtefactoExplosivo(@PathVariable Long idTipoDespejeArtefactoExplosivo){
        return tipoDespejeArtefactoExplosivoService.eliminarTipoDespejeArtefactoExplosivo(idTipoDespejeArtefactoExplosivo);
    }
}
