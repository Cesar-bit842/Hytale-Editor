
class Prefab {
  // Propiedad privada
  #id;

  constructor(nombre, datos = {}) {
    this.#id = crypto.randomUUID(); // genera un ID único
    this.nombre = nombre;
    this.datos = datos;
  }

  // Getter y Setter
  get id() {
    return this.#id;
  }

  set nombre(nuevoNombre) {
    if (!nuevoNombre || nuevoNombre.length < 3) {
      throw new Error("El nombre debe tener al menos 3 caracteres");
    }
    this._nombre = nuevoNombre;
  }

  get nombre() {
    return this._nombre;
  }

  // Método de instancia
  actualizarDato(clave, valor) {
    this.datos[clave] = valor;
    this.#emitirEvento("datoActualizado", { clave, valor });
  }

  // Método privado para emitir eventos
  #emitirEvento(tipo, detalle) {
    document.dispatchEvent(new CustomEvent(tipo, { detail: detalle }));
  }

  // Persistencia en localStorage
  guardar() {
    localStorage.setItem(this.#id, JSON.stringify({
      nombre: this.nombre,
      datos: this.datos
    }));
  }

  static cargar(id) {
    const raw = localStorage.getItem(id);
    if (!raw) return null;
    const { nombre, datos } = JSON.parse(raw);
    return new Prefab(nombre, datos);
  }
}

// Ejemplo de herencia
class PrefabAvanzado extends Prefab {
  constructor(nombre, datos, categoria) {
    super(nombre, datos);
    this.categoria = categoria;
  }

  describir() {
    return `Prefab ${this.nombre} [${this.categoria}] con datos: ${JSON.stringify(this.datos)}`;
  }
}

// Uso práctico
const miPrefab = new PrefabAvanzado("BloqueTest", { resistencia: 10 }, "Bloques");
miPrefab.actualizarDato("color", "rojo");
miPrefab.guardar();

document.addEventListener("datoActualizado", e => {
  console.log("Dato actualizado:", e.detail);
});
