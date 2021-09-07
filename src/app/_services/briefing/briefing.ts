import { Consultant } from "src/app/modules/consultant/consultant";
import { Contact } from "../contact/contact";

export class Briefing{
    idBriefing: number;
    dateBriefing: Date;
    type: string;
    dure: string;
    remarque: string;
    contact: Contact[];
    consultantId: number;
    consultant ?: Consultant;
    contactName ?: String[];
}

