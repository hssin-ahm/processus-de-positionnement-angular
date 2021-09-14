import { Consultant } from "src/app/modules/consultant/consultant";
import { CvEnvoye } from "../cvEnvoye/cvEnvoye";

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
    cvEnvoyee: CvEnvoye;
}
