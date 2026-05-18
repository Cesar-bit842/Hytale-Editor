const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

class ServiceManager {
  #services = {};

  static validateJson(json) {
    // Validación mínima de estructura
    return json["service.name"] &&
           json["service.version"] &&
           json["service.main"];
  } 
  static loadServices(baseDir) {
    const manager = new ServiceManager();

    // Recorre todas las carpetas dentro de baseDir
    fs.readdirSync(baseDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .forEach(dirent => {
        const servicePath = path.join(baseDir, dirent.name, "ServiceRegister.json");
        if (fs.existsSync(servicePath)) {
          const raw = fs.readFileSync(servicePath, "utf8");
          const json = JSON.parse(raw);

          if (ServiceManager.validateJson(json)) {
            manager.startService(dirent.name, path.join(baseDir, dirent.name), json);
          } else {
            console.error(`ServiceRegister.json inválido en ${dirent.name}`);
          }
        }
      });

    return manager;
  }

  startService(name, dir, json) {
    const mainFile = path.join(dir, json["service.main"]);
    if (!fs.existsSync(mainFile)) {
      console.error(`No se encontró main.js en ${dir}`);
      return;
    }

    const proc = spawn("node", [mainFile], { cwd: dir });

    proc.stdout.on("data", data => console.log(`[${name}] ${data}`));
    proc.stderr.on("data", data => console.error(`[${name} ERROR] ${data}`));

    this.#services[name] = { process: proc, config: json, dir };
    console.log(`Servicio ${name} iniciado`);
  } 
  stopService(name) {
    if (this.#services[name]) {
      this.#services[name].process.kill();
      console.log(`Servicio ${name} detenido`);
      delete this.#services[name];
    }
  } 
  listServices() {
    return Object.keys(this.#services);
  }
}
 
const manager = ServiceManager.loadServices("./"); 
