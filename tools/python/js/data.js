const TRENDS_DATA = [
  {
    id: 1,
    tag: "IA",
    tagClass: "tag-ai",
    title: "OpenAI lanza GPT-5 Omni con Agentic API",
    description:
      "Modelo multimodal que entiende texto, imagen, audio y video. Agentes autónomos que navegan la web y ejecutan código.",
    color: "#0369a1",
    icon: "🤖",
    script: {
      scenes: [
        { time: "0:00", visual: "Corte rápido: escribir, generar imagen, ejecutar código", voice: '"OpenAI acaba de soltar un bombazo."' },
        { time: "0:05", visual: "Logo GPT-5 Omni animado", voice: '"GPT-5 Omni. Un solo modelo que entiende texto, imágenes, audio y video."' },
        { time: "0:15", visual: "Demo: agente navegando web y ejecutando código", voice: '"Su Agentic API permite crear agentes autónomos que navegan la web, ejecutan código y controlan apps."' },
        { time: "0:30", visual: "Gráfico benchmarks GPQA / SWE-bench", voice: '"Ya rompió todos los récords en GPQA y SWE-bench."' },
        { time: "0:45", visual: "Cierre con CTA", voice: '"¿Ya probaste la API? Cuenta qué agente crearías."' },
      ],
      hashtags: "#GPT5 #OpenAI #IA #AIagents",
    },
  },
  {
    id: 2,
    tag: "Tech",
    tagClass: "tag-tech",
    title: "Apple Vision Pro 2: $1,999 con diseño ultraligero",
    description:
      "Precio y peso reducidos a la mitad. Chip espacial dedicado y asistente \"Pearl\" siempre activo.",
    color: "#7c3aed",
    icon: "🥽",
    script: {
      scenes: [
        { time: "0:00", visual: "Caja de Vision Pro 2 abriéndose", voice: '"Apple volvió a hacerlo. Vision Pro 2 ya está aquí."' },
        { time: "0:08", visual: "Dispositivo más delgado en mano", voice: '"Mitad de precio: $1,999. Y la mitad de peso. Llevable todo el día."' },
        { time: "0:20", visual: 'Interfaz "Pearl" flotando', voice: '"Chip espacial dedicado + Pearl — asistente IA always-on que aprende tus rutinas."' },
        { time: "0:35", visual: "Uso en calle, café, casa", voice: '"Información contextual proactiva sin hacer nada."' },
        { time: "0:50", visual: "Comparativa vs Vision Pro 1", voice: '"¿Valen los $1,999 o esperan la generación 3?"' },
      ],
      hashtags: "#AppleVisionPro #VisionPro2 #Apple #SpatialComputing",
    },
  },
  {
    id: 3,
    tag: "Espacio",
    tagClass: "tag-space",
    title: "SpaceX Starship completa 50ª recarga orbital",
    description:
      "Hito critical para Artemis 4. Flota de tanques espaciales lista para llevar humanos a la Luna en 2027.",
    color: "#b45309",
    icon: "🚀",
    script: {
      scenes: [
        { time: "0:00", visual: "Despegue Starship cámara lenta", voice: '"SpaceX acaba de hacer historia. De nuevo."' },
        { time: "0:08", visual: "Animación: dos naves acoplándose en órbita", voice: '"50ª transferencia de propelente orbital entre dos Starships."' },
        { time: "0:20", visual: "Línea de tiempo 1→50", voice: '"50 veces. Cincuenta. Sin fallos."' },
        { time: "0:35", visual: "Render Artemis 4 con Starship lunar", voice: '"Esto desbloquea Artemis 4. Flota de tanques espaciales lista para la Luna en 2027."' },
        { time: "0:55", visual: "Tierra desde órbita", voice: '"Marte está más cerca. ¿Qué opinas del ritmo de SpaceX?"' },
      ],
      hashtags: "#SpaceX #Starship #Artemis #Espacio",
    },
  },
  {
    id: 4,
    tag: "Reddit",
    tagClass: "tag-reddit",
    title: "Reddit convierte validación de IA en anuncios",
    description:
      "Nuevas herramientas de ads basadas en conversaciones reales. 50% de usuarios verifican recomendaciones de IA en Reddit.",
    color: "#be123c",
    icon: "🔴",
    script: {
      scenes: [
        { time: "0:00", visual: 'Alguien preguntando "¿qué X comprar?" en Reddit', voice: '"¿Le preguntaste a ChatGPT y aún así viniste a Reddit?"' },
        { time: "0:08", visual: "Estadística: 50% verifican IA en Reddit", voice: '"50% de compradores en USA verifican lo que dice la IA en Reddit."' },
        { time: "0:20", visual: "Anuncio Reddit en Cannes Lions 2026", voice: '"Reddit lo sabe. Y anunció en Cannes ads basados en eso."' },
        { time: "0:30", visual: "Interfaz: reviews Reddit dentro de un ad", voice: '"Marcas pueden poner conversaciones reales de Reddit en sus anuncios."' },
        { time: "0:40", visual: "Cierre", voice: '"Reddit: de foro a capa de validación de la IA."' },
      ],
      hashtags: "#Reddit #CannesLions #PublicidadIA #SocialMedia",
    },
  },
  {
    id: 5,
    tag: "Seguridad",
    tagClass: "tag-security",
    title: "Medusa Ransomware paraliza hospitales globales",
    description:
      "Ataque coordinado con malware polimórfico generado por IA contra hospitales en Europa y Norteamérica.",
    color: "#15803d",
    icon: "🛡️",
    script: {
      scenes: [
        { time: "0:00", visual: "Mapa Europa y Norteamérica con puntos rojos", voice: '"Esto está pasando ahora. Hoy."' },
        { time: "0:08", visual: "Logo Medusa con código malicioso animado", voice: '"Medusa Ransomware. Ataque coordinado contra decenas de hospitales."' },
        { time: "0:20", visual: "Malware polimórfico mutando", voice: '"Malware polimórfico generado por IA. Mutante. Esquiva antivirus."' },
        { time: "0:35", visual: "Logos Mandiant y Microsoft", voice: '"Zero-day en dispositivos IoT médicos. Mandiant y Microsoft respondiendo."' },
        { time: "0:50", visual: "Tips de seguridad", voice: '"Actualicen sistemas, segmenten redes IoT. Esto no será lo último."' },
      ],
      hashtags: "#Ciberseguridad #Ransomware #Medusa #Healthcare",
    },
  },
];

const APP_INFO = {
  features: [
    { icon: "+", title: "Incremento en tiempo real", desc: "Haz clic y el contador sube al instante. Cada suma queda registrada en la base de datos." },
    { icon: "–", title: "Decremento preciso", desc: "Resta valores con un solo clic. Ideal para controlar puntuaciones o votaciones rápidas." },
    { icon: "☁️", title: "Persistencia en Redis", desc: "Los datos se almacenan de forma segura con Redis. Nunca pierdes el progreso." },
    { icon: "🔗", title: "Integrado con Reddit", desc: "Se ejecuta como un Custom Post dentro de Reddit. Sin instalaciones ni plugins externos." },
  ],
  steps: [
    { num: 1, title: "Un moderador crea un post", desc: 'Usa la opción "Create a new post" del menú de moderación para generar un post personalizado.' },
    { num: 2, title: "Pantalla de inicio", desc: "Los usuarios ven una splash screen con información de la app y un botón para empezar." },
    { num: 3, title: "Interacción en vivo", desc: "Dentro del post, los usuarios pueden incrementar o decrementar el contador. Todos ven el mismo número actualizado." },
  ],
};
