import { Consultant } from "src/app/modules/consultant/consultant";

export class Positionnement {
    idPositionnement: number;
    date: Date;
    nomDuClient: string;
    secteurActivite: string;
    duredeLaMission: string;
    intituleDuPoste: string;
    lieuDeLaMission: String;
    descriptifDeLaMission: string;
    tjm: number;
    remarque: string;
    consultantId: number;
    consultant: Consultant;

  }
	