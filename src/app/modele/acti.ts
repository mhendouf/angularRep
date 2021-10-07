import { Benevole } from "./benevole";

export class Acti {
  id: number;
  titre: string;
  title: string;
  description: string;
  participants: string;
  date_creation: Date;
  //code: string;
  date_acti: Date;
  date_acti_fin:Date;
  repetition: string;
  //contact: string;
  id_user: string;
  nom_animateur: string;
  isDone:string;
  benevoles_list: Benevole[];
}
