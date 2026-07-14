/* src/microservicios/microservicios.service.ts: */
import { Injectable } from '@nestjs/common';

@Injectable()
export class MicroserviciosService {


  findAll() {
    return `This action returns all microservicios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} microservicio`;
  }



  remove(id: number) {
    return `This action removes a #${id} microservicio`;
  }
}
