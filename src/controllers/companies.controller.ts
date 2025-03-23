import {  Request, Response } from 'express';
import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';



export class CompaniesController {
  static async getAll(req: Request, res: Response) {
    res.send(await new CompanyService().getAll());
  }

  static async getById(req: Request, res: Response) {
    const companyId = (req.params.id);
    res.send(await new CompanyService().getById(companyId));
  }

  static async create(req: Request, res: Response) {
    let company = req.body;
    await new CompanyService().create(company);
    res.status(201).send({ message: "Empresa criada com sucesso!" });

  }

  static async update(req: Request, res: Response) {
    const companyId = req.params.id;
    const company = req.body as Company;
    await new CompanyService().update(companyId, company)
    res.send({ message: "Empresa atualizada com sucesso!" });
  }


}