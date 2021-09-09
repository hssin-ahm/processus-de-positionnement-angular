import { Consultant } from "src/app/modules/consultant/consultant";

export class Validation{
    idValidation: number;
    date: Date;
    feedback: string;
    demarrageMission: string;
    MesuresTeletravail: string;
    remarque: string;
    consultant ?: Consultant;
    consultantId: number;
}