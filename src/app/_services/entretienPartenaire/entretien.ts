import { Consultant } from "src/app/modules/consultant/consultant";

export class Entretien {
    idEntretien: number;
   
    dateEntretien : Date;
    typeEntretien : String;
    remarque: String ;
    lieu?: String;
    tjm :number ;
    statut: String;
    consultantId: number;
    consultant ?: Consultant;
    nomDuClient?: String;
}
