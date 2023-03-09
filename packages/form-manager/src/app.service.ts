import { Injectable } from '@nestjs/common';
import { DOMParser } from 'xmldom';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  parser = new DOMParser();

  getForm(form: string): string {
    const formFilePath = join(__dirname, `forms/${form}.xml`);
    return fs.readFileSync(formFilePath, 'utf8');
  }

  getOsceForms(
    type?: string,
    year?: string,
    speciality?: string,
    noOfForms?: number,
  ) {
    try {
      if (!type || !year) return 'Please provide valid inputs';

      const matchingText = speciality
        ? `${type}_${year}_${speciality}`
        : `${type}_${year}`;
      let matchingFiles = [];
      // const fileNames = fs.readdirSync(`/Users/amitsharma/Projects/workflow/packages/form-manager/src/forms`);
      const fileNames = fs.readdirSync(__dirname + '/forms');

      fileNames.forEach((file) => {
        if (file.startsWith(matchingText)) matchingFiles.push(file);
      });

      if (matchingFiles.length) {
        if (noOfForms) {
          const names = [];
          for (let i = 0; i < noOfForms; i++) {
            const form =
              matchingFiles[Math.floor(Math.random() * matchingFiles.length)];
            names.push(form);
            matchingFiles = matchingFiles.filter((el) => el != form);
          }
          return names;
        }
        return matchingFiles[Math.floor(Math.random() * matchingFiles.length)];
      }
      return null;
    } catch (err) {
      console.debug(err);
      return err;
    }
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
    for (const key in prefillSpec) {
      if (prefillSpec.hasOwnProperty(key)) {
        const key_arr = key.split('_*_');
        let element = null;
        // if (this.isImage(prefillSpec[key])) {
        //   continue
        // } else element = this.findElementRecursively(0, key_arr, instance);
        element = this.findElementRecursively(0, key_arr, instance);
        if (element) {
          element.textContent = eval(prefillSpec[key]);
        }
      }
    }
    for (const key in prefillSpec) {
      if (prefillSpec.hasOwnProperty(key)) {
        const key_arr = key.split('_*_');
        let element = null;
        if (this.isImage(prefillSpec[key])) {
          const parentEl = this.findElementRecursively(
            0,
            key_arr.slice(0, key_arr.length - 1),
            instance,
          );
          for (let i = 0; i < parentEl.childNodes.length; i++) {
            if (element) break;
            if (parentEl.childNodes[i].tagName == key_arr[key_arr.length - 1]) {
              while (++i) {
                if (parentEl?.childNodes[i]?.tagName) {
                  element = parentEl.childNodes[i];
                  break;
                }
              }
            }
          }
        }
        if (element) {
          element.textContent = eval(prefillSpec[key]);
        }
      }
    }
    return doc.toString();
  }

  isImage(filename: string): boolean {
    if (
      filename.includes('.png') ||
      filename.includes('.tif') ||
      filename.includes('.tiff') ||
      filename.includes('.jpg') ||
      filename.includes('.jpeg') ||
      filename.includes('.bmp') ||
      filename.includes('.gif') ||
      filename.includes('.eps')
    )
      return true;
    return false;
  }

  findElementRecursively(start: number, key_arr: any, instance: any) {
    if (!instance) return null;
    if (!key_arr[start + 1])
      return instance.getElementsByTagName(key_arr[start])?.[0];
    return this.findElementRecursively(
      start + 1,
      key_arr,
      instance.getElementsByTagName(key_arr[start])?.[0],
    );
  }

  prefillFormXML(
    form: string,
    onFormSuccessData: any,
    prefillSpec: any,
  ): string {
    const formFilePath = join(__dirname, `forms/${form}.xml`);
    const formString = fs.readFileSync(formFilePath, 'utf8');
    const doc = this.parser.parseFromString(formString, 'text/xml');
    console.debug({ prefillSpec });
    const instance = doc.getElementsByTagName('instance')[0];
    if (instance) {
      instance.textContent = prefillSpec;
    }
    return doc.toString();
  }
}
