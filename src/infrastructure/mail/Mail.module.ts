import { Module } from "@nestjs/common";
import { MailService } from "./service/Mail.service";

@Module({
    imports: [],
    exports: [MailService],
    providers: [MailService]
})
export class MailModule{}