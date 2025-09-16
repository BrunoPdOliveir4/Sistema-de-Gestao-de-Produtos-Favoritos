import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoriteService } from '../services/Favorite.service';
import { CreateFavoriteDto } from '../dtos/CreateFavorite.dto';
import { UserId } from 'src/infrastructure/decorators/UserId.decorator';
import { AuthGuard } from 'src/infrastructure/auth/guards/Auth.guard';

@ApiTags('Favorites') 
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os favoritos do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de favoritos retornada com sucesso.' })
  async getAllFavorites(@UserId() id: string) {
    return this.service.getAllFavoritesByClient(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um favorito para o usuário' })
  @ApiResponse({ status: 201, description: 'Favorito criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() data: CreateFavoriteDto, @UserId() id: string) {
    return this.service.createFavorite(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remover um favorito pelo ID' })
  @ApiResponse({ status: 204, description: 'Favorito removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Favorito não encontrado.' })
  @ApiResponse({ status: 403, description: 'Não tem permissão para deletar este favorito' })
  async delete(@Param('id') id: string, @UserId() clientId: string) {
    return this.service.deleteFavorite(id, clientId);
  }
}
