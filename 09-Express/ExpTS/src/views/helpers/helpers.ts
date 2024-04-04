import { Technology } from "./helpersTypes";

export function listTechnologies(techs: Technology[]){
    const filteredTechs = techs.filter((t) => t.poweredByNodejs);
    const lista = filteredTechs.map((t) => `<li>${t.name} - ${t.type}</li>`);
    return `<ul>${lista.join("")}</ul>`;
}
