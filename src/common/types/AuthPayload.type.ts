import { Role } from "src/modules/clients/enums/Role.enum";

export type Payload = {
  id: string;
  email: string;
  role: Role;
}

export type DecodedPayload = {
  sub: string;
  email: string;
  role: Role;
};
