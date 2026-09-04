//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.Constantes.MensajesConstantes;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.Resource;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 01/08/2023.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("/files")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS ARCHIVOS.
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class FileController {
    
    //CONTROLADORES DE ARCHIVOS (CREACIÓN DE CARPETA, RENOMBRAR CARPETA, ELIMINAR CARPETA, SUBIR ARCHIVO, MOVER ARCHIVO, RENOMBRAR ARCHIVO, ELIMINAR ARCHIVO).
    
    //CREAR CARPETA:
    @PostMapping("/carpetas")
    public ResponseEntity<Map<String, String>> createFolder(@RequestBody Map<String, String> body) {
        String folderPath = body.get("folderPath");
        Map<String, String> response = new HashMap<>();
        
        if (folderPath == null || folderPath.trim().isEmpty()) {
           response.put("mensaje", MensajesConstantes.MSG_ERROR_PARAMETRO_FALTANTE + " folderPath");
           return ResponseEntity.badRequest().body(response);
        }
        
        try {
            Files.createDirectories(Paths.get(folderPath));
            response.put("mensaje", MensajesConstantes.MSG_CARPETA_CREADA_EXITO);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            response.put("mensaje", MensajesConstantes.MSG_ERROR_CARPETA_NO_CREADA + " " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    //RENOMBRAR CARPETA:
    @PutMapping("/carpetas")
    public ResponseEntity<Map<String, String>> renameFolder(@RequestBody Map<String, String> body) {
        String oldPath = body.get("oldPath");
        String newPath = body.get("newPath");
        Map<String, String> response = new HashMap<>();
        
        if (oldPath == null || newPath == null || oldPath.trim().isEmpty() || newPath.trim().isEmpty()) {
           response.put("mensaje", MensajesConstantes.MSG_ERROR_PARAMETROS_FALTANTES);
           return ResponseEntity.badRequest().body(response);
        }
        
        try {
            Files.move(Paths.get(oldPath), Paths.get(newPath), StandardCopyOption.REPLACE_EXISTING);
            response.put("mensaje", MensajesConstantes.MSG_CARPETA_RENOMBRADA_EXITO);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            response.put("mensaje", MensajesConstantes.MSG_ERROR_RENOMBRADA_CARPETA + " " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    //ELIMINAR CARPETA (RECURSIVAMENTE):
    @DeleteMapping("/carpetas")
    public ResponseEntity<Map<String, String>> deleteFolder(@RequestBody Map<String, String> body) {
        String folderPath = body.get("folderPath");
        Map<String, String> response = new HashMap<>();
        
        if (folderPath == null || folderPath.trim().isEmpty()) {
           response.put("mensaje", MensajesConstantes.MSG_ERROR_PARAMETRO_FALTANTE + " folderPath");
           return ResponseEntity.badRequest().body(response);
        }
        
        try {
            Path path = Paths.get(folderPath);
            if (Files.exists(path)) {
               Files.walk(path).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
               response.put("mensaje", MensajesConstantes.MSG_CARPETA_ELIMINADA_EXITO);
               return ResponseEntity.ok(response);
            } else {
                response.put("mensaje", MensajesConstantes.MSG_CARPETA_ELIMINACION_NO_ENCONTRADA);
                return ResponseEntity.badRequest().body(response);
            }
        } catch (IOException e) {
            response.put("mensaje", MensajesConstantes.MSG_ERROR_ELIMINACION_CARPETA + " " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    //OBTENCIÓN DE ARCHIVO:
    private final Map<String, String> rutasTemporales = new HashMap<>();
    
    //1. Generar ruta estática:
    @GetMapping("/archivos/rutaEstatica")
    public ResponseEntity<Map<String, String>> generarRutaEstatica(@RequestParam("path") String rutaCodificada, HttpServletRequest request) {
        try {
            Path filePath = Paths.get(rutaCodificada).normalize();
            
            if (!Files.exists(filePath) || !Files.isReadable(filePath)) {
               Map<String, String> notFoundMap = new HashMap<>();
               notFoundMap.put("mensaje", MensajesConstantes.MSG_ARCHIVO_CONSULTA_NO_ENCONTRADO);
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body(notFoundMap);
            }
            
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
               Map<String, String> notFoundMap = new HashMap<>();
               notFoundMap.put("mensaje", MensajesConstantes.MSG_ARCHIVO_CONSULTA_NO_ENCONTRADO);
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body(notFoundMap);
            }
            
            //Obtiene el nombre del archivo:
            String nombreArchivo = filePath.getFileName().toString();
            
            //Obteniene hasta las últimas 3 carpetas (si existen):
            int nameCount = filePath.getNameCount();
            int maxFolders = 3; // puedes cambiar este valor si quieres más o menos carpetas
            StringBuilder claveBuilder = new StringBuilder();
            
            //Incluye hasta las 3 últimas carpetas + nombre del archivo:
            for (int i = Math.max(0, nameCount - maxFolders - 1); i < nameCount - 1; i++) {
                claveBuilder.append(filePath.getName(i).toString()).append("/");
            }
            
            claveBuilder.append(nombreArchivo);
            
            String claveRuta = claveBuilder.toString();
            
            //Guarda la ruta completa asociada a esa clave:
            rutasTemporales.put(claveRuta, filePath.toString());
            
            //Construye la URL base:
            //String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
            
            Map<String, String> response = new HashMap<>();
            //response.put("rutaEstatica", baseUrl + "/files/get-file/" + claveRuta);
            response.put("rutaEstatica", "/files/archivos/" + claveRuta);
            response.put("mensaje", MensajesConstantes.MSG_ARCHIVO_CONSULTADO_EXITO);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("mensaje", "Error interno");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMap);
        }
    }
    
    //2. Ver archivo desde la ruta estática:
    @GetMapping("/archivos/**")
    public ResponseEntity<Resource> verArchivo(HttpServletRequest request) {
        try {
            //Obtiene el path completo después de /files/archivos/
            String requestUri = request.getRequestURI();//Ejemplo: /files/archivos/responsables/BASPC06/T1RNeU16.jpg
            String prefix = "/files/archivos/";
            int prefixIndex = requestUri.indexOf(prefix);
            
            if (prefixIndex == -1) {
                return ResponseEntity.badRequest().build();
            }
            
            String claveRuta = requestUri.substring(prefixIndex + prefix.length());
            
            //Busca la ruta completa en el mapa:
            String ruta = rutasTemporales.get(claveRuta);
            if (ruta == null) {
               return ResponseEntity.notFound().build();
            }
            
            Path filePath = Paths.get(ruta).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            
            if (!resource.exists()) {
               return ResponseEntity.notFound().build();
            }
            
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
               contentType = "application/octet-stream";
            }
            
            return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"").body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    //SUBIR ARCHIVO:
    @PostMapping("/archivos")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("path") String destinationPath) {
        Map<String, String> response = new HashMap<>();
        
        if (file.isEmpty()) {
           response.put("mensaje", MensajesConstantes.MSG_ERROR_ARCHIVO_VACIO);
           return ResponseEntity.badRequest().body(response);
        }
        
        try (InputStream input = file.getInputStream()) {
            Path path = Paths.get(destinationPath);
            Files.createDirectories(path.getParent());//Crea carpetas si no existen.
            Files.copy(input, path, StandardCopyOption.REPLACE_EXISTING);
            response.put("mensaje", MensajesConstantes.MSG_ARCHIVO_SUBIDO_EXITO);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            response.put("mensaje", MensajesConstantes.MSG_ERROR_SUBIDA_ARCHIVO + " " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    //MOVER ARCHIVO:
    @PutMapping("/archivos/mover")
    public ResponseEntity<Map<String, String>> moveFile(@RequestBody Map<String, String> body) {
        String sourcePath = body.get("sourcePath");
        String destinationPath = body.get("destinationPath");
        Map<String, String> response = new HashMap<>();
        
        if (sourcePath == null || destinationPath == null) {
           response.put("mensaje", MensajesConstantes.MSG_ERROR_PARAMETROS_FALTANTES);
           return ResponseEntity.badRequest().body(response);
        }
        
        try {
            Files.createDirectories(Paths.get(destinationPath).getParent());
            Files.move(Paths.get(sourcePath), Paths.get(destinationPath), StandardCopyOption.REPLACE_EXISTING);
            
            response.put("mensaje", MensajesConstantes.MSG_ARCHIVO_MOVIDO_EXITO);
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            response.put("mensaje", MensajesConstantes.MSG_ERROR_MOVIDA_ARCHIVO + " " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    //RENOMBRAR ARCHIVO:
    @PutMapping("/archivos")
    public ResponseEntity<Map<String, String>> renameFile(@RequestBody Map<String, String> body) {
        String oldPath = body.get("oldPath");
        String newPath = body.get("newPath");
        Map<String, String> response = new HashMap<>();
        
        if (oldPath == null || newPath == null) {
           response.put("mensaje", MensajesConstantes.MSG_ERROR_PARAMETROS_FALTANTES);
           return ResponseEntity.badRequest().body(response);
        }
        
        try {
            Files.move(Paths.get(oldPath), Paths.get(newPath), StandardCopyOption.REPLACE_EXISTING);
            
            response.put("mensaje", MensajesConstantes.MSG_ARCHIVO_RENOMBRADO_EXITO);
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            response.put("mensaje", MensajesConstantes.MSG_ERROR_RENOMBRADA_ARCHIVO + " " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    //ELIMINAR ARCHIVO:
    @DeleteMapping("/archivos")
    public ResponseEntity<Map<String, String>> deleteFile(@RequestBody Map<String, String> body) {
        String filePath = body.get("filePath");
        Map<String, String> response = new HashMap<>();
        
        if (filePath == null || filePath.trim().isEmpty()) {
           response.put("mensaje", MensajesConstantes.MSG_ERROR_PARAMETRO_FALTANTE + " filePath");
           return ResponseEntity.badRequest().body(response);
        }
        
        try {
            Path path = Paths.get(filePath);
            if (Files.exists(path)) {
               Files.delete(path);
               response.put("mensaje", MensajesConstantes.MSG_ARCHIVO_ELIMINADO_EXITO);
               response.put("archivoEliminado", filePath);
               return ResponseEntity.ok(response);
            } else {
                response.put("mensaje", MensajesConstantes.MSG_ARCHIVO_ELIMINACION_NO_ENCONTRADO);
                return ResponseEntity.badRequest().body(response);
            }
        } catch (IOException e) {
            response.put("mensaje", MensajesConstantes.MSG_ERROR_ELIMINACION_ARCHIVO + " " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
