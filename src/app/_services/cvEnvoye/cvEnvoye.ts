import { Consultant } from "src/app/modules/consultant/consultant";
import { Contact } from "../contact/contact";

export class CvEnvoye {
    id: number;
    idcv: number;
    dateEnvoi: Date;
    partenairClient: string;
    nomSociete: string;
    tjm: number;
    remarques: string;
    statut: string;
    contact: Contact[];
    consultantId: number;
    consultant ?: Consultant;
    contactName ?: String[];
    etapeActuel ?: string;

  }
	
