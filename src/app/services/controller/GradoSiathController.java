//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.GradoSiathDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.GradoSiathService;
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
public class GradoSiathController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private GradoSiathService gradoSiathService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //ENDPOINT LISTAR TODOS LOS GRADOS SIATH SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/gradosSiath/lista")
    public ResponseEntity<List<GradoSiathDTO>> listarGradosSiathLista(
            @RequestParam(required = false) Long idGradoSiath,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(gradoSiathService.listarGradosSiath(idGradoSiath, orderBy, orderMode), HttpStatus.OK);
    }

    //ENDPOINT ÚNICO PARA LISTAR/ORDENAR/PAGINAR GRADOS SIATH CON QUERY PARAMS:
    @GetMapping("/gradosSiath/listaPag")
    public ResponseEntity<Slice<GradoSiathDTO>> listarGradosSiathPag(
            @RequestParam(required = false) Long idGradoSiath,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(gradoSiathService.listarGradosSiathPag(pageable, idGradoSiath, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/gradosSiath")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/gradosSiath")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearGradoSiath(@RequestBody GradoSiathDTO gradoSiathDTO){
        System.out.println(gradoSiathDTO);
        return gradoSiathService.crearGradoSiath(gradoSiathDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/gradosSiath/{idGradoSiath}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarGradoSiathbyId(@PathVariable Long idGradoSiath){
        return gradoSiathService.consultarGradoSiathporId(idGradoSiath);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE Y FUERZA SIATH:
    @GetMapping("/gradosSiath/nombre/{nombreGradoSiath}/fuerzaSiath/{fuerzaSiath}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarGradoSiathbyNombreAndFuerzaSiath(@PathVariable String nombreGradoSiath, @PathVariable Long fuerzaSiath){
        return gradoSiathService.consultarGradoSiathporNombreyFuerzaSiath(nombreGradoSiath, fuerzaSiath);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/gradosSiath")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/gradosSiath")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarGradoSiath(@RequestBody GradoSiathDTO gradoSiathDTO){
        return gradoSiathService.actualizarGradoSiath(gradoSiathDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/gradosSiath/{idGradoSiath}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarGradoSiath(@PathVariable Long idGradoSiath){
        return gradoSiathService.eliminarGradoSiath(idGradoSiath);
    }
}
