package cl.musicmania.config;

import cl.musicmania.model.Blog;
import cl.musicmania.model.Categoria;
import cl.musicmania.model.ItemOrden;
import cl.musicmania.model.Orden;
import cl.musicmania.repository.BlogRepository;
import cl.musicmania.repository.CategoriaRepository;
import cl.musicmania.repository.OrdenRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

/** Blogs y órdenes de ejemplo (equivalentes a los datos base que antes vivían en el front). */
@Component
public class ExtraDataSeeder implements CommandLineRunner {

    private final BlogRepository blogs;
    private final OrdenRepository ordenes;
    private final CategoriaRepository categorias;

    public ExtraDataSeeder(BlogRepository blogs, OrdenRepository ordenes, CategoriaRepository categorias) {
        this.blogs = blogs;
        this.ordenes = ordenes;
        this.categorias = categorias;
    }

    @Override
    public void run(String... args) {
        if (categorias.count() == 0) {
            categorias.saveAll(List.of(
                    new Categoria("cat-1", "Vinilos y Álbumes", "Ediciones oficiales en formato vinilo y CD.", 12),
                    new Categoria("cat-2", "Equipos de Audio", "Amplificadores, tornamesas, parlantes y consolas.", 6),
                    new Categoria("cat-3", "Accesorios", "Limpiadores de vinilos, agujas y cables profesionales.", 4)
            ));
        }

        if (blogs.count() == 0) {
            blogs.saveAll(List.of(
                    blog("caso1", 4L, "La canción más corta de la historia",
                            "Un récord Guinness inmortalizado en solo 1,316 segundos", "05 de Octubre, 2026",
                            "Se llama \"You Suffer\" de la banda Napalm Death. Dura exactamente 1,316 segundos y consta de un solo acorde ultra rápido.",
                            "/img/cancion_corta.jpg",
                            "En 1986, la legendaria banda británica de grindcore Napalm Death cambió las reglas de la industria musical con una composición tan fugaz como demoledora. Su tema \"You Suffer\" tiene una duración oficial de apenas 1,316 segundos.",
                            "La pieza fue compuesta por Justin Broadrick y Nik Bullen durante los ensayos de su álbum debut \"Scum\". Nació casi como un chiste interno sobre la velocidad del género, pero pronto se convirtió en un ícono de la música extrema.",
                            "A pesar de durar poco más de un segundo, la canción fue grabada con producción profesional en estudio y posee el récord Guinness oficial a la grabación musical más corta jamás realizada en la historia de la humanidad."),
                    blog("caso2", 3L, "La obra musical más larga jamás interpretada",
                            "Una composición concebida para sonar ininterrumpidamente durante 639 años", "04 de Octubre, 2026",
                            "\"ORGAN²/ASLSP\" de John Cage se está interpretando en una iglesia en Alemania. Comenzó en 2001 y terminará en el año 2640.",
                            "/img/cancion_larga.jpg",
                            "En la iglesia de San Burchardi en Halberstadt, Alemania, se lleva a cabo uno de los experimentos conceptuales y sonoros más ambiciosos de la historia moderna: la ejecución de \"ORGAN²/ASLSP\" (As SLow as Possible) del compositor vanguardista John Cage.",
                            "La interpretación comenzó el 5 de septiembre de 2001 y está programada para finalizar en el año 2640. Debido al tempo extremadamente lento indicado por Cage, el órgano produce sonidos continuos donde el cambio de una sola nota puede tardar varios años en ocurrir.",
                            "Un fuelle eléctrico constante mantiene el flujo de aire en los tubos del órgano, convirtiendo a la pequeña iglesia en un punto de peregrinación para melómanos de todo el planeta."),
                    blog("caso3", 2L, "El rango vocal agudo más extremo registrado",
                            "Frecuencias vocales que sobrepasan los límites biológicos del oído humano", "02 de Octubre, 2026",
                            "Alcanzado por Georgia Brown. Logró cantar una nota G10 (25,086 Hz), una frecuencia imperceptible para el oído humano común.",
                            "/img/nota_aguda.jpg",
                            "La cantante brasileña Georgia Brown dejó atónitos a científicos y especialistas de la voz al registrar la nota más alta jamás producida por un ser humano: un sorprendentemente agudo G10 (25,086 Hz).",
                            "El oído humano promedio solo puede percibir sonidos hasta aproximadamente los 20,000 Hz. Esto significa que la nota alcanzada por Brown ingresa directamente en el rango del ultrasonido, siendo audible únicamente con equipos de medición acústica especializada.",
                            "Con un registro abrumador de 8 octavas comprobadas, ostenta el récord Guinness del tono vocal más alto y el rango más amplio registrado en un individuo."),
                    blog("caso4", 1L, "La frecuencia vocal más grave del planeta",
                            "Notas tan profundas que solo pueden ser escuchadas por paquidermos", "28 de Septiembre, 2026",
                            "Tim Storms ostenta el récord Guinness produciendo una nota de 0.189 Hz (G-7), audible prácticamente solo para paquidermos.",
                            "/img/nota_grave.jpg",
                            "El cantante estadounidense Tim Storms es capaz de descender en la escala musical hasta la nota G-7 (0.189 Hz), una frecuencia infrasónica tan baja que resulta físicamente imposible de escuchar para el oído humano.",
                            "Para ponerlo en perspectiva, la nota emitida por Storms es 8 octavas por debajo del G más bajo de un piano de cola. De hecho, animales de gran tamaño como los elefantes utilizan este rango de infrasonidos para comunicarse a kilómetros de distancia.",
                            "Dado que ni el propio cantante puede escuchar el sonido que emite, afirma que solo puede sentir la nota a través de las intensas vibraciones mecánicas en su caja torácica.")
            ));
        }

        if (ordenes.count() == 0) {
            ordenes.saveAll(List.of(
                    orden("BOL-2026-101", LocalDateTime.of(2026, 10, 8, 14, 30), "Cliente Ejemplo", "cliente@gmail.com",
                            "444444444", "Av. Alemania 1234, Depto 402, Valparaíso", "WebPay (Tarjeta Crédito)", "Entregado",
                            new ItemOrden("alb-2", "Rap con R de Revolucion - Portavoz", 14990, 1),
                            new ItemOrden("alb-1", "Naturaleza Muerta - Ley 20 mil", 17990, 1)),
                    orden("BOL-2026-102", LocalDateTime.of(2026, 10, 9, 9, 15), "Cliente Ejemplo 2", "cliente2@gmail.com",
                            "33333333", "Calle Los Carrera 560, Viña del Mar", "Transferencia Bancaria", "Enviado",
                            new ItemOrden("alb-3", "El Circulo - Kase.O", 19990, 1))
            ));
        }
    }

    private Blog blog(String id, long creado, String title, String subtitle, String fecha, String summary,
                      String image, String... parrafos) {
        Blog b = new Blog();
        b.setId(id);
        b.setCreado(creado);
        b.setTitle(title);
        b.setSubtitle(subtitle);
        b.setFecha(fecha);
        b.setAutor("Redacción MusicMania");
        b.setSummary(summary);
        b.setImage(image);
        b.setContenidoExtendido(String.join("\n\n", parrafos));
        return b;
    }

    private Orden orden(String codigo, LocalDateTime fecha, String cliente, String correo, String rut,
                        String direccion, String metodoPago, String estado, ItemOrden... items) {
        Orden o = new Orden();
        o.setCodigo(codigo);
        o.setFecha(fecha);
        o.setCliente(cliente);
        o.setCorreo(correo);
        o.setRut(rut);
        o.setDireccion(direccion);
        o.setMetodoPago(metodoPago);
        o.setEstado(estado);
        o.setProductos(List.of(items).stream().collect(java.util.stream.Collectors.toCollection(java.util.ArrayList::new)));
        o.setTotal(List.of(items).stream().mapToInt(i -> i.getPrecio() * i.getCantidad()).sum());
        return o;
    }
}
