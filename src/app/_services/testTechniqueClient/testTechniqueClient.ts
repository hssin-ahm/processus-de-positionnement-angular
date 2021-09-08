import { Consultant } from "src/app/modules/consultant/consultant";

export class TestTechniqueClient {
    idTestTechniqueClient: number;
    typeEntretien: string;
    dure: string;
    dateEntretien : Date;
    observations : string;
    consultant ?: Consultant;
    consultantId: number;
}
