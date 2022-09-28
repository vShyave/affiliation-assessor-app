import { Injectable } from '@nestjs/common';
import { DOMParser } from 'xmldom';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  parser = new DOMParser();

  getHello(): string {
    return 'Hello World!';
  }

  getForm(form: string): string {
    const formFilePath = join(__dirname, `forms/${form}.xml`);
    return fs.readFileSync(formFilePath, 'utf8');
  }

  prefillForm(form: string, onFormSuccessData: any, prefillSpec: any): string {
    // get current directory
    const formFilePath = join(__dirname, `forms/${form}.xml`);
    const formString = fs.readFileSync(formFilePath, 'utf8');
    const doc = this.parser.parseFromString(formString, 'text/xml');
    const instance = doc.getElementsByTagName('instance')[0];
    /*{
      "pf_name": "${onFormSuccessData.name}",
      "pf_iti": "${onFormSuccessData.itiByIti.name']}",
      "pf_trade": "${onFormSuccessData.tradeName}",
      "pf_batch": "${onFormSuccessData.batch}",
      "pf_industry": "${onFormSuccessData.industryByIndustry.name}",
      "ojt_month": "${onFormSuccessData.industryByIndustry.schedules[0].is_industry === true ? 1 : 0}"
    }*/
    console.log({ prefillSpec });
    for (const key in prefillSpec) {
      console.log('Finding element: ', key, prefillSpec[key]);
      if (prefillSpec.hasOwnProperty(key)) {
        const element = instance.getElementsByTagName(key)[0];
        if (element) {
          console.log('Found element: ', key, prefillSpec[key]);
          console.log(eval(prefillSpec[key]));
          element.textContent = eval(prefillSpec[key]);
        }
      }
      console.log('Done');
    }
    console.log('Test');
    console.log('Doc', doc.toString());
    return doc.toString();
  }
}
