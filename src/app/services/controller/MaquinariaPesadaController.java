//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.MaquinariaPesadaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.MaquinariaPesadaService;
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
* @Since 17/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class MaquinariaPesadaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private MaquinariaPesadaService maquinariaPesadaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT LISTAR TODAS LAS MAQUINARIAS PESADAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/maquinariasPesadas/lista")
    public ResponseEntity<List<MaquinariaPesadaDTO>> listarMaquinariasPesadasLista(
            @RequestParam(required = false) Long idMaquinariaPesada,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(maquinariaPesadaService.listarMaquinariasPesadas(idMaquinariaPesada, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/ORDENAR/PAGINAR MAQUINARIAS PESADAS CON QUERY PARAMS:
    @GetMapping("/maquinariasPesadas/listaPag")
    public ResponseEntity<Slice<MaquinariaPesadaDTO>> listarMaquinariasPesadasPag(
            @RequestParam(required = false) Long idMaquinariaPesada,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(maquinariaPesadaService.listarMaquinariasPesadasPag(pageable, idMaquinariaPesada, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/maquinariasPesadas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/maquinariasPesadas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearMaquinariaPesada(@RequestBody MaquinariaPesadaDTO maquinariaPesadaDTO){
        System.out.println(maquinariaPesadaDTO);
        return maquinariaPesadaService.crearMaquinariaPesada(maquinariaPesadaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/maquinariasPesadas/{idMaquinariaPesada}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarMaquinariaPesadabyId(@PathVariable Long idMaquinariaPesada){
        return maquinariaPesadaService.consultarMaquinariaPesadaporId(idMaquinariaPesada);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/maquinariasPesadas/nombre/{nombreMaquinariaPesada}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarMaquinariaPesadabyNombre(@PathVariable String nombreMaquinariaPesada){
        return maquinariaPesadaService.consultarMaquinariaPesadaporNombre(nombreMaquinariaPesada);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/maquinariasPesadas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    @PutMapping("/maquinariasPesadas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarMaquinariaPesada(@RequestBody MaquinariaPesadaDTO maquinariaPesadaDTO){
        return maquinariaPesadaService.actualizarMaquinariaPesada(maquinariaPesadaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/maquinariasPesadas/{idMaquinariaPesada}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarMaquinariaPesada(@PathVariable Long idMaquinariaPesada){
        return maquinariaPesadaService.eliminarMaquinariaPesada(idMaquinariaPesada);
    }
}
