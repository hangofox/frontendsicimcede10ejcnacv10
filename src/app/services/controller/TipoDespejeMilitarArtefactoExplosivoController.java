//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoDespejeMilitarArtefactoExplosivoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoDespejeMilitarArtefactoExplosivoService;
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
public class TipoDespejeMilitarArtefactoExplosivoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoDespejeMilitarArtefactoExplosivoService tipoDespejeMilitarArtefactoExplosivoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDespejesMilitaresArtefactosExplosivos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTiposDespejesArtefactosExplosivos(
            @RequestParam(required = false) Long idTipoDespejeMilitarArtefactoExplosivo,
            @RequestParam(required = false) String keyword){
        return new ResponseEntity<>(tipoDespejeMilitarArtefactoExplosivoService.contarTotalRegistros(idTipoDespejeMilitarArtefactoExplosivo, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS:
    @GetMapping("/tiposDespejesMilitaresArtefactosExplosivos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoDespejeMilitarArtefactoExplosivoDTO>> listarTiposDespejesMilitaresArtefactosExplosivos(
            @RequestParam(required = false) Long idTipoDespejeMilitarArtefactoExplosivo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode){
        return new ResponseEntity<>(tipoDespejeMilitarArtefactoExplosivoService.listarTiposDespejesMilitaresArtefactosExplosivos(idTipoDespejeMilitarArtefactoExplosivo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS FILTRADOS PAGINADOS:
    @GetMapping("/tiposDespejesMilitaresArtefactosExplosivos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoDespejeMilitarArtefactoExplosivoDTO>> listarTiposDespejesMilitaresArtefactosExplosivosPag(
            @RequestParam(required = false) Long idTipoDespejeMilitarArtefactoExplosivo,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false) String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoDespejeMilitarArtefactoExplosivoService.listarTiposDespejesMilitaresArtefactosExplosivosPag(pageable, idTipoDespejeMilitarArtefactoExplosivo, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposDespejesMilitaresArtefactosExplosivos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoDespejeMilitarArtefactoExplosivo(@RequestBody TipoDespejeMilitarArtefactoExplosivoDTO tipoDespejeMilitarArtefactoExplosivoDTO){
        System.out.println(tipoDespejeMilitarArtefactoExplosivoDTO);
        return tipoDespejeMilitarArtefactoExplosivoService.crearTipoDespejeMilitarArtefactoExplosivo(tipoDespejeMilitarArtefactoExplosivoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposDespejesMilitaresArtefactosExplosivos/{idTipoDespejeMilitarArtefactoExplosivo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDespejeMilitarArtefactoExplosivoporId(@PathVariable Long idTipoDespejeMilitarArtefactoExplosivo){
        return tipoDespejeMilitarArtefactoExplosivoService.consultarTipoDespejeMilitarArtefactoExplosivoporId(idTipoDespejeMilitarArtefactoExplosivo);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposDespejesMilitaresArtefactosExplosivos/nombre/{nombreTipoDespejeMilitarArtefactoExplosivo}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoDespejeMilitarArtefactoExplosivoporNombre(@PathVariable String nombreTipoDespejeMilitarArtefactoExplosivo){
        return tipoDespejeMilitarArtefactoExplosivoService.consultarTipoDespejeMilitarArtefactoExplosivoporNombre(nombreTipoDespejeMilitarArtefactoExplosivo);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposDespejesMilitaresArtefactosExplosivos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoDespejeMilitarArtefactoExplosivo(@RequestBody TipoDespejeMilitarArtefactoExplosivoDTO tipoDespejeMilitarArtefactoExplosivoDTO){
        return tipoDespejeMilitarArtefactoExplosivoService.actualizarTipoDespejeMilitarArtefactoExplosivo(tipoDespejeMilitarArtefactoExplosivoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposDespejesMilitaresArtefactosExplosivos/{idTipoDespejeMilitarArtefactoExplosivo}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoDespejeMilitarArtefactoExplosivo(@PathVariable Long idTipoDespejeMilitarArtefactoExplosivo){
        return tipoDespejeMilitarArtefactoExplosivoService.eliminarTipoDespejeMilitarArtefactoExplosivo(idTipoDespejeMilitarArtefactoExplosivo);
    }
}
