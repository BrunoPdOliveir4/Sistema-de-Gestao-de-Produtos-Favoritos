import { Controller } from '@nestjs/common';
import { ClientService } from '../services/Client.service';

@Controller()
export class ClientController {
  constructor(private readonly service: ClientService) {}
}
