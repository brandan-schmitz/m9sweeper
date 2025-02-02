import { InvalidClusterIdInterceptor, ResponseTransformerInterceptor } from '../../../interceptors';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowedAuthorityLevels } from '../../../decorators/allowed-authority-levels.decorator';
import { Authority } from '../../user/enum/Authority';
import { AuthGuard } from '../../../guards/auth.guard';
import { AuthorityGuard } from '../../../guards/authority.guard';
import { GatekeeperConstraintTemplateService } from '../services/gatekeeper-constraint-template.service';
import { GatekeeperConstraintTemplateDto } from '../dto/gatekeeper-constraint-template.dto';
import { GatekeeperConstraintDto } from '../dto/gatekeeper-constraint.dto';
import {
  GATEKEEPER_CONSTRAINT_TEMPLATE_ARRAY_SCHEMA,
  GATEKEEPER_CONSTRAINT_TEMPLATE_BY_NAME_SCHEMA,
  GATEKEEPER_CONSTRAINT_TEMPLATE_DEPLOY_FAILED_SCHEMA,
  GATEKEEPER_CONSTRAINT_TEMPLATE_DEPLOY_SCHEMA,
} from '../open-api-schema/gatekeeper-constraint-template.schema';

@ApiTags('Gatekeeper')
@ApiBearerAuth('jwt-auth')
@Controller('constraint-templates')
@UseInterceptors(InvalidClusterIdInterceptor, ResponseTransformerInterceptor)
export class GatekeeperConstraintTemplateController {
  constructor(
    private readonly gatekeeperConstraintTemplateService: GatekeeperConstraintTemplateService,
  ) {}

  @Get()
  @AllowedAuthorityLevels(Authority.SUPER_ADMIN, Authority.ADMIN, Authority.READ_ONLY)
  @UseGuards(AuthGuard, AuthorityGuard)
  @ApiResponse({
    status: 200,
    schema: GATEKEEPER_CONSTRAINT_TEMPLATE_ARRAY_SCHEMA,
  })
  async getConstraintTemplates(@Param('clusterId') clusterId: number): Promise<GatekeeperConstraintTemplateDto[]> {
    return this.gatekeeperConstraintTemplateService.getConstraintTemplates(clusterId);
  }

  @Post()
  @AllowedAuthorityLevels(Authority.SUPER_ADMIN, Authority.ADMIN)
  @UseGuards(AuthGuard, AuthorityGuard)
  @ApiResponse({
    status: 200,
    schema: GATEKEEPER_CONSTRAINT_TEMPLATE_DEPLOY_SCHEMA,
  })
  @ApiResponse({
    status: 400,
    schema: GATEKEEPER_CONSTRAINT_TEMPLATE_DEPLOY_FAILED_SCHEMA,
  })
  async deployConstraintTemplates(
    @Param('clusterId') clusterId: number,
    @Body() templates: { name: string, template: string }[],
  ): Promise<{ successfullyDeployed: string[], unsuccessfullyDeployed: string[] }> {
    return this.gatekeeperConstraintTemplateService.createConstraintTemplates(clusterId, templates);
  }

  @Get(':templateName')
  @AllowedAuthorityLevels(Authority.SUPER_ADMIN, Authority.ADMIN)
  @UseGuards(AuthGuard, AuthorityGuard)
  @ApiResponse({
    status: 200,
    schema: GATEKEEPER_CONSTRAINT_TEMPLATE_BY_NAME_SCHEMA,
  })
  async getConstraintTemplateByName(
    @Param('clusterId') clusterId: number,
    @Param('templateName') templateName: string,
    @Query('excludeConstraints') rawExcludeConstraints: string = "false",
  ): Promise<{
    associatedConstraints?: GatekeeperConstraintDto[],
    template: GatekeeperConstraintTemplateDto,
    rawConstraintTemplate: string,
  }> {
    const excludeConstraints = rawExcludeConstraints && rawExcludeConstraints === "true";
    return this.gatekeeperConstraintTemplateService.getConstraintTemplate(clusterId, templateName, excludeConstraints);
  }

  @Put(':templateName')
  @AllowedAuthorityLevels(Authority.SUPER_ADMIN, Authority.ADMIN)
  @UseGuards(AuthGuard, AuthorityGuard)
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    schema: {
      "description": "The resource was successfully updated"
    },
  })
  async updateConstraintTemplateByName(
    @Param('clusterId') clusterId: number,
    @Param('templateName') templateName: string,
    @Body() templateContents: { template: string },
  ): Promise<void> {
    return this.gatekeeperConstraintTemplateService.updateConstraintTemplate(clusterId, templateName, templateContents.template);
  }

  @Delete(':templateName')
  @AllowedAuthorityLevels(Authority.SUPER_ADMIN, Authority.ADMIN)
  @UseGuards(AuthGuard, AuthorityGuard)
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    schema: {
      "description": "The resource was successfully deleted"
    },
  })
  async deleteConstraintTemplateByName(
    @Param('clusterId') clusterId: number,
    @Param('templateName') templateName: string,
  ) {
    return this.gatekeeperConstraintTemplateService.deleteConstraintTemplate(clusterId, templateName);
  }


}
