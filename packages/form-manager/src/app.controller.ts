import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const parser = require('xml2json');

type PrefillDto = {
  form: string;
  onFormSuccessData: any;
  prefillSpec: any;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('prefill')
  getPrefill(@Body() prefillDto: PrefillDto): string {
    return this.appService.prefillForm(
      prefillDto.form,
      prefillDto.onFormSuccessData,
      prefillDto.prefillSpec,
    );
  }

  @Get('prefill')
  prefill(
    @Query('form') form,
    @Query('onFormSuccessData') onFormSuccessData,
    @Query('prefillSpec') prefillSpec,
  ): string {
    try {
      console.log('onFormSuccessData', onFormSuccessData);
      console.log('prefillSpec', prefillSpec);
      if (onFormSuccessData !== 'undefined') {
        console;
        return this.appService.prefillForm(
          form,
          JSON.parse(onFormSuccessData),
          JSON.parse(prefillSpec),
        );
      } else {
        return this.appService.getForm(form);
      }
    } catch (e) {
      return this.appService.getForm(form);
    }
  }

  @Get('form/:id')
  getForm(@Param('id') id): string {
    return this.appService.getForm(id);
  }

  @Post('parse')  
  parseXML(@Body() xml: any): any {
    console.log({xml})
    return parser.toJson(xml);
  }
}
