import { Request, Response } from "express";
import { LoremIpsum } from "lorem-ipsum";

const loremIpsum = new LoremIpsum();

const index = (req: Request, res: Response) => {
  res.send("Hello World!");
};

const hb1 = (req: Request, res: Response) => {
  res.render("hb1", {
    mensagem: "Olá, você está aprendendo Express + HBS!",
    layout: "main"
  });
};

const hb2 = (req: Request, res: Response) => {
  res.render("hb2", {
    poweredByNodejs: true,
    name: "Express",
    type: "Framework",
    layout: "main"
  });
};

const hb3 = (req: Request, res: Response) => {
  const profes = [
    { nome: "David Fernandes", sala: 1238 },
    { nome: "Horácio Fernandes", sala: 1233 },
    { nome: "Edleno Moura", sala: 1236 },
    { nome: "Elaine Harada", sala: 1231 }
  ];
  res.render("hb3", { profes, layout: "main" });
};

const hb4 = (req: Request, res: Response) => {
  const technologies = [
    { name: "Express", type: "Framework", poweredByNodejs: true },
    { name: "Laravel", type: "Framework", poweredByNodejs: false },
    { name: "React", type: "Library", poweredByNodejs: true },
    { name: "Handlebars", type: "Engine View", poweredByNodejs: true },
    { name: "Django", type: "Framework", poweredByNodejs: false },
    { name: "Docker", type: "Virtualization", poweredByNodejs: false },
    { name: "Sequelize", type: "ORM tool", poweredByNodejs: true }
  ];

  res.render("hb4", { technologies, layout: "main" });
};

const lorem = (req: Request, res: Response) => {
  const paragrafos = parseInt(req.params.paragrafos);
  const texto = loremIpsum.generateParagraphs(paragrafos);
  res.send(texto);
};

export default { index, hb1, hb2, hb3, hb4, lorem };
